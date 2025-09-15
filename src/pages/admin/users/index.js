
export default function Users () {
    
    return `
        <div class="admin__users">
            <table class="admin__users__data">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>username</th>
                        <th>email</th>
                        <th>role</th>
                        <th>status</th>
                        <th>control</th>
                    </tr>
                </thead>
                <tbody>

                </tbody>
        </table>
    </div>
 `   
}

export async function getUsers () {    
    let req = await fetch("http://localhost:3000/users")
    let response = await req.json();

    generateStructure(response);

    return response;
}


export function generateStructure(response) {
    let html = `
        ${response.map((row) =>{

            return  localStorage.getItem("user") && row.email !== JSON.parse(localStorage.getItem("user")).email ? `
                <tr data-id='${row.id}' class='user-row'>
                    <td>${row.id}</td>
                    <td>${row.name}</td>
                    <td>${row.email}</td>
                    <td>${row.role}</td>
                    <td class='${row.active ? 'active-user': 'inactive-user'}'>${row.active ? 'Active': 'Not Active'}</td>
                    <td>
                        <button class="btn btn--secondary control-user-active-status">${row.active ? 'Ban' : 'Activate'}</button>
                    </td>
                </tr>`
                : ""
            } 
        )}
    `
    document.querySelector(".admin__users__data tbody").innerHTML = html;
}
export async function controlUserActiveStatus(id) {

    const isUserFound = await fetch(`http://localhost:3000/users/${id}`)
    if(!isUserFound.ok){
        throw new Error("User Not Found");
    }
    const isUserFoundResponse = await isUserFound.json();
    const req = await fetch(`http://localhost:3000/users/${id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("accessToken")
        },
        body: JSON.stringify({ active : !isUserFoundResponse.active})
    })

    if(!req.ok) {
        throw new Error("Make sure you send the correct and complete user data");
    }
    const response = await req.json();
    getUsers();
}

