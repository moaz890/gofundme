import Navbar  from "../../components/navbar";
import campaigns from "./campaigns";
import Capmpaigns, { controlCampaignStatus, deleteCampaign } from "./campaigns";
import AdminHomePage from "./home";
import pledges from "./pledges";
import Pledges from "./pledges";
import Users, { controlUserActiveStatus } from "./users";

export default {
    
    html: `
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
                ${Navbar?.html}
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
                <section class='admin__container__content'>
                    ${
                        location.pathname === "/admin" ? AdminHomePage?.html :
                        location.pathname === "/admin/users" ? Users?.html:
                        location.pathname === "/admin/campaigns" ? Capmpaigns?.html:
                        location.pathname === "/admin/pledges" ? Pledges?.html:
                        '<h3>Page Not Found</h3>'
                        
                    }
                </section>
            </main>
        </div>
    </div>`,
    init: () => {
        Navbar?.init()
        location.pathname === `/admin` ? AdminHomePage?.init():
        location.pathname === `/admin/users` ? Users?.init() :
        location.pathname === "/admin/campaigns" ? Capmpaigns?.init():
        location.pathname === "/admin/pledges" ? Pledges?.init() : null
        
        const section = document.querySelector(".admin__container__content");
        if(section){

            section.addEventListener("click", (e) => {
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
        }
    }    
}    

// let users = []





