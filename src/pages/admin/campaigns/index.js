export default function Capmpaigns () {
    return `
        <div class="admin__campaigns">
            <table class="admin__campaigns-data">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Title</th>
                        <th>Author</th>
                        <th>Category</th>
                        <th>Description</th>
                        <th>Goal</th>
                        <th>image</th>
                        <th>Deadline</th>
                        <th>Status</th>
                        <th>Control</th>
                    </tr>
                </thead>
                <tbody>

                </tbody>
        </table>
    </div>
    `
}


export async function getCampaigns () {    
    let req = await fetch("http://localhost:3000/campaigns")
    let response = await req.json();

    generateCampaignsStructure(response);

    return response;
}


export function generateCampaignsStructure(response) {
    let html = `
        ${response.map((row) =>{

            return  `
                <tr data-id='${row.id}' class='campaign-row'>

                    <td data-label="ID">${row.id}</td>
                    <td data-label="Title">${row.title}</td>
                    <td data-label="Author">${row.userId}</td>
                    <td data-label="Category">${row.category}</td>
                    <td data-label="description">${row.description}</td>
                    <td data-label="goal">${row.goal}</td>
                    <td data-label="image">
                    <img src="${row.image}"/>
                    </td>
                    <td data-label="deadline">${row.deadline}</td>
                    <td data-label="Status" class='${row.approved ? 'approved-campaign': 'unapproved-campaign'}'><span>${row.approved ? 'Approved': 'Pending'}</span></td>
                    <td data-label="Control">
                        <button class="btn ${row.approved ? 'btn--danger' : "btn--primary"} control-campaign-status">${row.approved ? 'Ban' : 'Approve'}</button>
                        <button class="btn btn--danger campaign__delete-btn">Delete</button>
                    </td>
                </tr>`
                
            } 
        ).join("")}
    `
    document.querySelector(".admin__campaigns-data tbody").innerHTML = html;
}
export async function controlCampaignStatus(id) {

    const isCampaignFound = await fetch(`http://localhost:3000/campaigns/${id}`)
    if(!isCampaignFound.ok){
        throw new Error("Campaign Not Found");
    }
    const isCampaignFoundResponse = await isCampaignFound.json();
    const req = await fetch(`http://localhost:3000/campaigns/${id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("accessToken")
        },
        body: JSON.stringify({ approved : !isCampaignFoundResponse.approved})
    })

    if(!req.ok) {
        throw new Error("Make sure you send the correct and complete user data");
    }
    const response = await req.json();
    getCampaigns();
}

export async function deleteCampaign(id) {
    const req = await fetch(`http://localhost:3000/campaigns/${id}`, {
        method: "DELETE",
        headers: {
            Authorization: "Bearer "+ localStorage.getItem("access-token")
        }
    })
    if(!req.ok){
        throw new Error("Campaign Not Found");
    }
    
    const response = await req.json();
    getCampaigns();
}