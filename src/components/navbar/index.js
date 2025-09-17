export default {
    
    html : `
        <nav class="navbar">
            <div class="container flex items-center justify-between">
                <span class="navbar__logo">
                    <svg class="hrt-disp-block hrt-gfm-logo" fill="none" height="36" viewBox="0 0 105 36" width="105"
                        xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                        <path
                        d="m49.483 1.416.913 5.167c.023.131.142.22.274.209a12.65 12.65 0 0 1 2.266 0 .253.253 0 0 0 .274-.209l.912-5.167a.254.254 0 0 0-.22-.296 18.61 18.61 0 0 0-4.199 0 .253.253 0 0 0-.22.296ZM60.051 14.004a.254.254 0 0 0 .212-.394 10.182 10.182 0 0 0-8.46-4.504 10.18 10.18 0 0 0-8.459 4.504.254.254 0 0 0 .213.394H60.05ZM38.744 6.856l3.965 3.442c.1.087.249.081.344-.011a12.589 12.589 0 0 1 1.76-1.424.255.255 0 0 0 .083-.336L42.35 3.938a.254.254 0 0 0-.358-.092 18.61 18.61 0 0 0-3.264 2.64.252.252 0 0 0 .016.369ZM61.258 3.94l-2.546 4.589a.256.256 0 0 0 .082.335 12.681 12.681 0 0 1 1.76 1.424.255.255 0 0 0 .345.01l3.965-3.441a.254.254 0 0 0 .016-.37 18.484 18.484 0 0 0-3.264-2.639.254.254 0 0 0-.358.093v-.002ZM88.106 16.67c-1.222 0-2.545.576-3.482 1.764a.204.204 0 0 1-.332-.017c-.748-1.155-1.855-1.747-2.954-1.747-1.1 0-2.37.792-3.1 1.764-.076.101-.239.03-.216-.096l.195-1.106a.254.254 0 0 0-.25-.297h-3.394a.254.254 0 0 0-.254.254V27.99c0 .14.113.254.253.254h3.312c.14 0 .254-.114.254-.254v-6.223c0-1.039.694-1.745 1.575-1.745.88 0 1.562.693 1.562 1.745v6.224c0 .14.114.253.254.253h3.31c.14 0 .254-.114.254-.254v-6.223c0-1.039.695-1.745 1.575-1.745.881 0 1.562.693 1.562 1.745v6.224c0 .14.114.253.254.253h3.31c.14 0 .255-.114.255-.254v-6.959c0-2.833-1.922-4.36-3.943-4.36v-.002ZM72.567 10.975h-3.378a.22.22 0 0 0-.22.22v7.138a.15.15 0 0 1-.273.087c-.71-.994-1.972-1.76-3.386-1.75-3.1.019-5.157 2.863-5.157 5.92 0 3.055 2.062 5.751 5.157 5.912 1.62.083 2.891-.881 3.646-1.877.056-.073.172-.023.156.069l-.274 1.549h3.729a.22.22 0 0 0 .22-.22V11.195a.22.22 0 0 0-.22-.22ZM66.272 25.15a2.56 2.56 0 0 1-2.566-2.564 2.56 2.56 0 0 1 2.566-2.564 2.56 2.56 0 0 1 2.567 2.564 2.56 2.56 0 0 1-2.567 2.564Z"
                        fill="#4A9D44"></path>
                        <path clip-rule="evenodd"
                        d="m103.264 14.004.613 1.8.609-1.8h.411v2.128h-.275v-1.256c0-.044 0-.115.003-.216.003-.1.003-.208.003-.323l-.609 1.795h-.287l-.614-1.795v.065l.004.24c.003.106.003.184.003.235v1.256h-.276v-2.128h.415Zm-.673 0v.254h-.718v1.874h-.292v-1.874h-.719v-.254h1.729ZM19.668 16.67c-3.37 0-6.096 2.398-6.096 5.915s2.726 5.916 6.096 5.916 6.144-2.423 6.144-5.916c0-3.493-2.763-5.916-6.144-5.916Zm.024 8.479a2.56 2.56 0 0 1-2.566-2.564 2.56 2.56 0 0 1 2.566-2.564 2.56 2.56 0 0 1 2.567 2.564 2.56 2.56 0 0 1-2.567 2.564Z"
                        fill="#4A9D44" fill-rule="evenodd"></path>
                        <path
                        d="M12.635 17.192a.263.263 0 0 0-.263-.263H8.989a.254.254 0 0 0-.25.297l.193 1.095c.023.124-.136.196-.214.098-.684-.864-1.947-1.826-3.56-1.75C2.06 16.814 0 19.526 0 22.58c0 3.055 2.058 5.919 5.158 5.92a4.163 4.163 0 0 0 3.435-1.825c.067-.1.224-.053.224.068v1.955c0 1.61-1.021 2.563-2.439 2.563-1.092 0-2.131-.675-2.487-1.92a.305.305 0 0 0-.397-.202L.54 30.213a.248.248 0 0 0-.15.308c.798 2.611 3.243 4.158 5.964 4.158 3.454 0 6.281-2.276 6.281-5.981V17.19v.002ZM6.12 25.149a2.56 2.56 0 0 1-2.567-2.564 2.56 2.56 0 0 1 2.567-2.564 2.56 2.56 0 0 1 2.566 2.564A2.56 2.56 0 0 1 6.12 25.15ZM39.63 28.506c1.121 0 2.35-.784 3.077-1.758.076-.102.239-.03.216.096l-.195 1.107a.253.253 0 0 0 .251.298l3.392-.005c.14 0 .254-.114.254-.254V17.186a.254.254 0 0 0-.254-.254h-3.31a.254.254 0 0 0-.255.254v6.068c0 1.101-.756 1.88-1.711 1.88-.955 0-1.712-.754-1.712-1.88v-6.069a.254.254 0 0 0-.254-.253h-3.31a.254.254 0 0 0-.254.254v6.92c0 2.895 1.959 4.398 4.067 4.398l-.001.002Z"
                        fill="#4A9D44"></path>
                        <path clip-rule="evenodd"
                        d="M101.514 24.45a.256.256 0 0 0-.311.12c-.403.704-1.264 1.073-2.096 1.073-1.165 0-2.157-.807-2.528-2.002h8.113a.253.253 0 0 0 .252-.221c.037-.27.056-.549.056-.834 0-3.62-2.865-5.915-5.917-5.915-3.37 0-6.097 2.398-6.097 5.915 0 3.518 2.727 5.916 6.097 5.916 2.195 0 4.13-1.022 5.217-2.695a.263.263 0 0 0-.133-.391l-2.653-.965Zm-2.408-5.014c1.224 0 2.095.75 2.474 1.84h-4.947c.378-1.09 1.249-1.84 2.474-1.84h-.001Z"
                        fill="#4A9D44" fill-rule="evenodd"></path>
                        <path
                        d="M55.148 16.675c-1.121 0-2.35.784-3.077 1.757-.076.102-.239.03-.216-.096l.195-1.107a.253.253 0 0 0-.251-.297l-3.392.005a.254.254 0 0 0-.254.254v10.804c0 .14.114.254.255.254h3.31c.14 0 .254-.114.254-.254v-6.07c0-1.1.756-1.88 1.711-1.88.955 0 1.712.755 1.712 1.88v6.07c0 .14.113.254.254.254h3.31c.14 0 .254-.114.254-.254v-6.921c0-2.895-1.959-4.397-4.066-4.397v-.002ZM34.29 16.933h-2.226a.152.152 0 0 1-.153-.153v-.756c0-1.432 1.27-2.393 2.706-1.93a.252.252 0 0 0 .324-.198l.527-2.962a.255.255 0 0 0-.195-.293c-3.694-.855-7.178 1.72-7.178 5.705v.434a.153.153 0 0 1-.153.154h-1.697a.254.254 0 0 0-.254.254v2.582a.251.251 0 0 0 .253.253h1.697c.085 0 .153.069.153.153v7.81c0 .14.114.254.254.254h3.31c.14 0 .254-.114.254-.254v-7.81c0-.084.069-.152.153-.152h2.226c.14 0 .254-.114.254-.255v-2.581a.254.254 0 0 0-.254-.254l-.001-.001Z"
                        fill="#4A9D44"></path>
                    </svg>
                </span>

                <ul class='navbar__links'>

                </ul>

                <div class="flex items-center">
                    <div class="navbar__control-accessbility">
                        <div class="${!isAnonymousUser() ? 'hide': ''}">
                            <a class="btn btn--transparent" href="/login">Login</a>
                            <a class="btn btn--transparent" href="./register">Register</a>
                        </div>
                        <div class="${!isAnonymousUser() ? '' : 'hide'}">
                            <button class="btn btn--transparent" " id='logout-btn'>Logout</button>
                        </div>
                    </div>

                    <span class="navbar__control-mode">
                        <i class="fa-solid "></i>
                    </span>
                </div>
            </div>
       </nav>`,

    init: () => {
        const navbarLinks = document.querySelector(".navbar__links");
        const modeBtn = document.querySelector(".navbar__control-mode");
        const logoutBtn = document.querySelector(".navbar__control-accessbility #logout-btn");
        
        if(!isAnonymousUser()){
            navbarLinks.innerHTML = getNavLinks();
        }
        
        modeBtn.addEventListener("click", (e) => {
            const currentMode = localStorage.getItem("mode");
            changeMode(currentMode);
        });
        
        logoutBtn.addEventListener("click", logout);
        
    }
}

export const setMode = () => {
    let currentMode = localStorage.getItem("mode");
    if (currentMode) {

        document.body.classList.remove(currentMode === "dark-mode" ? 'light-mode' : 'dark-mode');
        document.body.classList.add(currentMode);
    }else {
        currentMode = "light-mode"
        document.body.classList.add(currentMode);
        localStorage.setItem("mode", currentMode);
    }

    switchMode()
}

export const changeMode = (currentMode) => {
    let newMode = currentMode === "light-mode" ? 'dark-mode' : 'light-mode';
    localStorage.setItem("mode", newMode);
    setMode()
}

function switchMode () {
    const newMode = localStorage.getItem("mode");
    const icon = document.querySelector(".navbar__control-mode i");
    if (!icon) return; // Prevent error if navbar is not present
    icon.classList.remove(newMode === 'light-mode' ? 'fa-moon' : 'fa-sun');
    icon.classList.add(newMode === 'light-mode' ? 'fa-sun' : 'fa-moon');
}

export function isAnonymousUser ()  {
    const accessToken = localStorage.getItem("access-token");
    if(accessToken) {
        return false;
    }
    return true;
}

export function logout () {
    localStorage.removeItem("access-token")
    localStorage.removeItem("user");
    location.pathname = '/';
}

const getNavLinks = () => {
    return `
            <li><a href="/">Home</a></li>
            <li><a href="/my-campaigns">My Campaigns</a></li>
            <li><a href="/my-pledges">My Pledges</a></li>
    `
}