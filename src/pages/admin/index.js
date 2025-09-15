import { Navbar } from "../../components/navbar";
import { removeTokenIfExpired } from "../../main";
import { handleNavbarEvents } from "../home";
import Capmpaigns, { controlCampaignStatus, deleteCampaign, getCampaigns } from "./campaigns";
import AdminHomePage from "./home";
import Pledges, { getPledges } from "./pledges";
import Users, { controlUserActiveStatus, getUsers } from "./users";

export default function Admin () {
    
    const html = `
        <div class="admin">
        <div class="admin__container">
            <aside class="admin__container__sidebar">
                <h3><a href="/admin">Admin Dashboard</a></h3>
                <ul class="admin__container__sidebar__links">
                    <li >
                        <a href="/admin/users">Users</a>
                    </li>
                    <li >
                        <a href="/admin/campaigns">Campaigns</a>
                    </li>
                    <li >
                        <a href="/admin/pledges">Pledges</a>
                    </li>
                </ul>
            </aside>
            <main>
                ${Navbar()}
                <ul >
                    <li >
                        <a href="/admin/users">Users</a>
                    </li>
                    <li >
                        <a href="/admin/campaigns">Campaigns</a>
                    </li>
                    <li >
                        <a href="/admin/pledges">Pledges</a>
                    </li>
                </ul>
                <section>
                    ${
                        location.pathname === "/admin" ? AdminHomePage() :
                        location.pathname === "/admin/users" ? Users():
                        location.pathname === "/admin/campaigns" ? Capmpaigns():
                        location.pathname === "/admin/pledges" ? Pledges():
                        '<h3>Page Not Found</h3>'
                        
                    }
                </section>
            </main>
        </div>
    </div>`

    handleNavbarEvents();
    return html;
}

// let users = []


document.addEventListener("DOMContentLoaded", () => {
    removeTokenIfExpired();
    if(location.pathname.includes("/users")){
        getUsers();
    }else if(location.pathname.includes("/campaigns")){
        getCampaigns()
    }else if(location.pathname.includes("/pledges")) {
        getPledges();
    }

})



document.addEventListener("click", (e) => {
    const controlStatusBtn = e.target.closest(".control-user-active-status");
    if (controlStatusBtn) {
        controlUserActiveStatus(controlStatusBtn.closest("tr").dataset.id);
    }
    
    const controlCampaignBtn = e.target.closest(".control-campaign-status");
    if (controlCampaignBtn) {

        controlCampaignStatus(controlCampaignBtn.closest("tr").dataset.id);
    }

    const deleteCampaignBtn = e.target.closest(".campaign__delete-btn");
    if(deleteCampaignBtn) {
        console.log("Btn delete")
        deleteCampaign(deleteCampaignBtn.closest("tr").dataset.id)
    }

});


