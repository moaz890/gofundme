import { generatePledgesStructure } from "../../pages/admin/pledges";
import { handleNavbarEvents } from "../../pages/home";
import { getTopFivePledges } from "../campaign";
import { getCampaignsJoined } from "../campaigns";
import { isAnonymousUser, Navbar } from "../navbar";

export default function MyPledgesComponent () {
    const html = `
                ${Navbar()}
                
                <div class='user-pledges'>

                </div>
            `;
        handleNavbarEvents();
        return html;
}


let pledges;
export const getMyPledges = async () => {
    const userId = JSON.parse(localStorage.getItem("user"))?.id;
    
    let campaigns = await getCampaignsJoined();
    
    campaigns = campaigns.filter(x => x?.pledges?.some(y => y.userId == userId ));
    pledges = campaigns.map(x => [...x.pledges]);
    
    
    
    const userCampaignsContainer = document.querySelector(".user-pledges");
    if(userCampaignsContainer) {
        userCampaignsContainer.innerHTML = pledges.map((x) => getPledgeStructure([...x]))    
    }
}

if(!isAnonymousUser()) {
    getMyPledges()
}
const getPledgeStructure = (response) => {
    
    
    return `
            <div class="campaign-card">
            
                <div class="campaign-card__info">
                    <p>${response.campaignId}    </p>
                    <p>${response.amount}</p>
                </div>
            
            </div>
        `
}

const getReplacementText = () => {
    return `
        <h4 class='empty-info'>You Have not any campaigns yet</h4>
    `
}

