import Campaigns, { getCampaignsJoined } from '../../components/campaigns/index.js';
import HeroComponent from '../../components/hero/index.js';
import Navbar from '../../components/navbar/index.js';
import SearchForm from '../../components/search-form/index.js';

export default {
    html : `
        ${Navbar.html}
        ${HeroComponent.html}
        ${SearchForm()}
        ${
            Campaigns.html       
        }
    `,
    init: () => {
            Navbar?.init();
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
        
    }
}





function getReplacementText () {
    return `
        <div>
            <h3>There is No Campaigned Yet</h3>
        </div>
    `
}