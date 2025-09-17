import CampaignComponent from './components/campaign/index.js';
import MyCampaignsComponent from './components/my-campaigns/index.js';
import MyPledgesComponent from './components/my-pledges/index.js';
import { setMode } from './components/navbar/index.js';
import Admin from './pages/admin/index.js';
import Home from './pages/home/index.js';
import Login from './pages/login/index.js';
import Register from './pages/register/index.js';
import "./Sass/main.css"


const routes = {
  "": Home,
  "client-campaigns": CampaignComponent,
  "my-campaigns": MyCampaignsComponent,
  "my-pledges": MyPledgesComponent,
  "login": Login,
  "register": Register,
  "admin": Admin 
}

function router() {
  
  removeTokenIfExpired()
  
  let route = getRoute();
  let page = routes[route];
  
  if (!page) {
    document.getElementById('app').innerHTML = '<h1>404</h1>';
    return;
  }

  document.getElementById('app').innerHTML = page.html;

  if (page.init) page.init();
}


export function isTokenExpired(token) {
  if (!token) return true;
  const payload = JSON.parse(atob(token.split('.')[1]));
  // exp is in seconds, Date.now() is in ms
  return Date.now() >= payload.exp * 1000;
}

export function removeTokenIfExpired() {
  const token = localStorage.getItem("access-token");
  if (isTokenExpired(token)) {
    localStorage.removeItem("access-token");
    localStorage.removeItem("user");
  }
}

window.addEventListener("popstate", router);
document.addEventListener("DOMContentLoaded", () => {
  router();
  setMode();
});



function getRoute() {
  let route = location.pathname.split("/")[1] || ""
  
  if (!localStorage.getItem("access-token") && (route === "admin" )) {
    route = "login"
  }
  if (localStorage.getItem("access-token") && (route === "login" || route === "register")){
    route = ""
  }
  
  if (!localStorage.getItem("access-token") && (route === "my-campaigns" || route === 'my-pledges') ){
    route = "login"
  }
  
  if(localStorage.getItem("user") && JSON.parse(localStorage.getItem("user")).role === "admin" && route === ""){
    route = "admin"
  }

  return route;

}