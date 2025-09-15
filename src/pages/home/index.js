import CampaignComponent, { getCampaign } from '../../components/campaign/index.js';
import Campaigns, { getCampaignsJoined } from '../../components/campaigns/index.js';
import HeroComponent from '../../components/hero/index.js';
import { changeMode, isAnonymousUser, logout, Navbar, setMode } from '../../components/navbar/index.js'
import SearchForm from '../../components/search-form/index.js';

export default function Home () {
    const html = `
        ${Navbar()}
        ${HeroComponent()}
        ${SearchForm()}
        ${
            Campaigns()        
        }
    `;
    handleNavbarEvents();
    return html;
}

export function handleNavbarEvents () {
    setTimeout(() => {
        const modeBtn = document.querySelector(".navbar__control-mode");
        const logoutBtn = document.querySelector(".navbar__control-accessbility #logout-btn");
        if (modeBtn) {
            modeBtn.addEventListener("click", (e) => {
                const currentMode = localStorage.getItem("mode");
                changeMode(currentMode);
            });
        }

        if(logoutBtn) {
            logoutBtn.addEventListener("click", logout);
        }
    }, 0);
}

document.addEventListener("DOMContentLoaded", (e) => {
    if (location.pathname === "/") {
        getCampaignsJoined().then(data => {
            
            const campaignsContainer = document.querySelector(".campaigns__container");
        
            
            const response = data.filter(x => x?.userId != JSON.parse(localStorage.getItem("user"))?.id)
            
            const html = response?.length > 0 ? response?.map(row => {
                return row?.approved ? `
                    <a class="card flex flex-col" href="${'/client-campaigns?id='+row?.id}">
                        <div class="card__image">
                            <img src="${row?.image}" alt="${row?.title}">
                        </div>
                        <div class="card__info">
                            <div class="card__info__campaign">
                                <h4 class="card__info__campaign__title">${row?.title}</h4>
                                <div class="flex justify-between">
                                    <span class="card__info__campaign__goal">
                                        ${row?.goal} $
                                    </span>
                                    <span class="card__info__campaign__paid">
                                        ${row?.totalAmount} $
                                    </span>
                                </div>
                            </div>
                        </div>
                    </a>
                `: ""
            }).join(""): getReplacementText()
                            
            if (campaignsContainer)campaignsContainer.innerHTML = html;
        })
    }

})


function getReplacementText () {
    return `
        <div>
            <h3>There is No Campaigned Yet</h3>
        </div>
    `
}