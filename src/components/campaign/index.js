import { getCampaignsJoined } from "../campaigns";
import DonateFormComponent, { donate } from "../donate-form";
import Navbar, { isAnonymousUser } from "../navbar";

export default  {
    html : `
            ${Navbar.html}
            <div class='card-container'>

            </div>
            <div class="pledges">
                <h3 class='pledges__header'>Top Five Pledges</h3>
            </div>
            ${DonateFormComponent.html}
            <div class='alert alert--error'>
                <span class='alert__mark'>❌</span>
                <span class='alert__text'>Some Error Here try again later</span>
            </div>
            <div class='alert alert--success'>
                <span class='alert__mark'>✔</span>
                <span class='alert__text'>Successfully Process done</span>
            </div>
        `,
    init: async() => {
        Navbar?.init();
        DonateFormComponent?.init()
        const response = await getCampaign();
        
        
        const overlayCloseBtn = document.querySelector(".overlay__close-btn");
        const campaignCard = document.querySelector(".card-container");        
        const overlay = document.querySelector(".overlay");
        campaignCard?.addEventListener("click", (e) => {
            const donateBtn = e.target.closest(".campaign-card__button--donate");
            if(donateBtn) {

                if (isAnonymousUser()) {
                    e.preventDefault()
                    return;
                }
                overlay.classList.add("show");
                const amountInput = overlay.querySelector("input#amount");
                amountInput.setAttribute("max", +campaign?.goal - +response);
            }
            
            
        });
        if(overlayCloseBtn) {
            overlayCloseBtn.addEventListener("click", (e) => {
                overlay.classList.remove("show")
            })
        }
    }
}

export const getCampaign = async () => {
    const response = await getCampaignById()
    const getCampaignsJoinedWithPledges = await getCampaignsJoined()
    const pledges = await getCampaignsJoinedWithPledges?.find((campaign) => campaign?.id === response.id)?.pledges;
    const pledgesAmounts = pledges?.reduce((a, b) => +a + +b.amount, 0)
    const cardContainer = document.querySelector(".card-container");
    const pledgesContainer = document.querySelector(".pledges");
    if(cardContainer){

        cardContainer.innerHTML = `
            <div class="campaign-card">
            <div class="campaign-card__image">
                <img src="${response.image}" alt="Give Food to poor people">
            </div>
            <div class="campaign-card__info">
                <h2 class="campaign-card__title">${response.title}</h2>
                <p class="campaign-card__description">
                ${response.description}
                </p>
                <div class="campaign-card__details">
                    <span class="goal">Goal: ${response.goal}</span>
                    <span class="paid">Paid: ${pledgesAmounts}</span>
                    <span class="deadline">Deadline: ${response.deadline}</span>
                </div>
                <button class="campaign-card__button campaign-card__button--donate ${new Date(response.deadline) < Date.now() || isAnonymousUser() ? "expired" : ""}">Donate Now</button>
            </div>
            </div>
        `
    }
    if (pledgesContainer) {
        pledgesContainer.innerHTML = getTopFivePledges(pledges)
    }

    return pledgesAmounts;
    
}
export let campaign = {}
export const getCampaignPledges = async (id) => {
    const req = await fetch("http://localhost:3000/pledges");
    const response = await req.json();
    const pledges = response.filter(pledge => pledge.campaignId == id);
    campaign['amount'] = pledges.reduce((a, b) => a + +b.amount , 0);
    return pledges;
}


export const getCampaignById = async () => {
    const searchParam = location.search;
    const campaignId = searchParam.slice(searchParam.indexOf("=")+1, searchParam.length);
    const req = await fetch("http://localhost:3000/campaigns/"+campaignId);
    if(!req.ok) {
        throw new Error("Campaign Not Found")
    }
    const response = await req.json();
    campaign['goal'] = response.goal;
    campaign['id'] = response.id;
    return response;
}


export function getTopFivePledges(pledges = []) {
    if (!Array.isArray(pledges) || pledges.length === 0) {
        return ''; 
    }

    return pledges
        .sort((a, b) => +b.amount - +a.amount)
        .slice(0, Math.min(5, pledges.length))
        .map((pledge) => {
            return `
                <div class='pledge-card'>
                    <div class='flex justify-between'>
                        <span>${pledge.username ?? ''}</span>
                        <span>${pledge.amount ?? ''}</span>
                    </div>
                </div>
            `;
        })
        .join('');
}
