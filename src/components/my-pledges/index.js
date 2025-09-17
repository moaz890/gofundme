import { getCampaignsJoined } from "../campaigns";
import Navbar, { isAnonymousUser } from "../navbar";

export default {
    html : `
        ${Navbar.html}
        
        <div class='user-pledges'>

        </div>
    `,
    init: () => {
        Navbar?.init();
        if(!isAnonymousUser()) getMyPledges()
    }
}


export let pledges;
export const getMyPledges = async () => {
    const userId = JSON.parse(localStorage.getItem("user"))?.id;
    
    let campaigns = await getCampaignsJoined();
    
    campaigns = campaigns.filter(x => x?.pledges?.some(y => y.userId == userId ));
    pledges = campaigns.map(x => x.pledges);
    
    const userCampaignsContainer = document.querySelector(".user-pledges");
    if(userCampaignsContainer) {
        userCampaignsContainer.innerHTML = pledges.map((x) => getPledgeStructure(x))    
    }
}

const getPledgeStructure = (response) => {
    
    return response.map(p => (
     `
            <div class="campaign-card">
            
                <div class="campaign-card__info">
                    <p>${p.campaignId}    </p>
                    <p>${p.amount}</p>
                </div>
            
            </div>
        `))
}

const getReplacementText = () => {
    return `
        <h4 class='empty-info'>You Have not any campaigns yet</h4>
    `
}

