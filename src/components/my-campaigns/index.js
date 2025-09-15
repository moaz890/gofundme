import { handleNavbarEvents } from "../../pages/home";
import { getTopFivePledges } from "../campaign";
import CampaignFormComponent from "../campaign-form";
import { getCampaignsJoined } from "../campaigns";
import { isAnonymousUser, Navbar } from "../navbar";

export default function MyCampaignsComponent () {
    const html = `
                ${Navbar()}
                
                <div class='user-campaigns'>

                </div>
                ${CampaignFormComponent()}
                <div class='alert alert--error'>
                    <span class='alert__mark'>❌</span>
                    <span class='alert__text'>Some Error Here try again later</span>
                </div>
                <div class='alert alert--success'>
                    <span class='alert__mark'>✔</span>
                    <span class='alert__text'>Successfully Process done</span>
                </div>
            `;
        handleNavbarEvents();
        return html;
}


let campaigns;
export const getMyCampaigns = async () => {
    const userId = JSON.parse(localStorage.getItem("user"))?.id;
    
    campaigns = await getCampaignsJoined();
    
    campaigns = campaigns.filter(x => `${x?.userId}` == `${userId}`);
    const userCampaignsContainer = document.querySelector(".user-campaigns");
    if(userCampaignsContainer) {
                
        userCampaignsContainer.innerHTML =  `
        ${campaigns?.length > 0 ? campaigns?.map((x) => {
            return getCampaignStructure(x)
        }).join("") : 
            getReplacementText()
    }
    `
    userCampaignsContainer.insertAdjacentHTML("afterbegin", `
            <div class='campaigns__add-btn' style='margin-top: 16px;'>
                <button class="btn btn--primary">
                    Add Campaign
                </button>
            </div>
        `)
    }
}

const getCampaignStructure = (response) => {
    
    const totalAmount = response.pledges.reduce((a, b) => a + +b.amount, 0);
    

    return `
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
                    <span class="paid">Paid: ${totalAmount}</span>
                    <span class="deadline">Deadline: ${response.deadline}</span>
                    </div>
                    <button class="campaign-card__button campaign-card__button--edit" data->
                        Edit Campaign
                        <input type="hidden" name="campaign-id" value="${response.id}">
                    </button>
            </div>
            </div>
            <div class="pledges">
                <h3 class='pledges__header'>Top Five Pledges</h3>
                ${getTopFivePledges(response?.pledges || [])}
            </div>
        `
}

const getReplacementText = () => {
    return `
        <h4 class='empty-info'>You Have not any campaigns yet</h4>
    `
}

if(!isAnonymousUser()){
    getMyCampaigns()
}


document.addEventListener("click", (e) => {
    
    const addBtn = e.target.closest(".campaigns__add-btn");
    const editCampaignBtn = e.target.closest(".campaign-card__button--edit")
    const overlayCloseBtn = e.target.closest(".overlay__close-btn");
    const overlay = document.querySelector(".overlay");
    
    if(addBtn) {
        overlay.classList.add("show");
        const form = overlay.querySelector("form");
        
        if(form.classList.contains("edit-campaign")){
            overlay.querySelector("h2").textContent = "Create New Campaign";
            form.classList.remove("edit-campaign");
            form.querySelector("input#campaign-id").remove()
            form.querySelector("button").textContent  = "Create Campaign"
        }
    }
    
    if(overlayCloseBtn) {
        document.querySelector(".overlay").classList.remove("show")
    } 

    if(editCampaignBtn){
        overlay.classList.add("show");
        overlay.querySelector("h2").textContent = "Edit Campaign";

        const campaignId = editCampaignBtn.querySelector("input").value;
        const campaign = campaigns.find(x => x.id == campaignId);

        const form = overlay.querySelector("form");
        form.classList.add("edit-campaign");

        const existingHidden = form.querySelector("#campaign-id");
        if (existingHidden) existingHidden.remove();

        form.insertAdjacentHTML("afterbegin", `
            <input type="hidden" id="campaign-id" name="campaign-id" value="${campaignId}"/>
        `);

        form.querySelector("button").textContent = "Edit";

        form.querySelector("#title").value = campaign.title || "";
        form.querySelector("#description").value = campaign.description || "";
        form.querySelector("#goal").value = campaign.goal || "";
        form.querySelector("#deadline").value = campaign.deadline || "";
        form.querySelector("#category").value = campaign.category || "";

        if (form.classList.contains("edit-campaign")) {
            document.getElementById("imageFile").removeAttribute("required");
        } else {
            document.getElementById("imageFile").setAttribute("required", "required");
        }
        
        let existingImageInput = form.querySelector("#existingImage");
        if (!existingImageInput) {
            form.insertAdjacentHTML("beforeend", `
                <input type="hidden" id="existingImage" name="existingImage" value="${campaign.image}" />
            `);
        } else {
            existingImageInput.value = campaign.image;
        }
    
    }
}); 


export function formatDateToYMD(dateStr) {
  if (!dateStr) return "";
  const [month, day, year] = dateStr.split("-");
  return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
}