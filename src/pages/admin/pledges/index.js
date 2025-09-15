
export default function Pledges () {
    return `
        <div class="admin__pledges">
            <table class="admin__pledges__data">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Campain Id</th>
                        <th>User Id</th>
                        <th>Amount</th>
                    </tr>
                </thead>
                <tbody>
                      
                          
                </tbody>
        </table>
    </div>
    `   
}


export async function getPledges () {    
    let req = await fetch("http://localhost:3000/pledges")
    let response = await req.json();

    generatePledgesStructure(response);

    return response;
}


export function generatePledgesStructure(response) {
    let html = `
        ${response.map((row) =>{

            return  `
                <tr data-id='${row.id}' class='pledge-row'>
                    <td data-label="ID">${row.id}</td>
                    <td data-label="Campaign Id">${row.campaignId}</td>
                    <td data-label="User Id">${row.userId}</td>
                    <td data-label="Amount">${row.amount}</td>
                </tr>`
                
            } 
        ).join("")}
    `
    document.querySelector(".admin__pledges__data tbody").innerHTML = html;
}