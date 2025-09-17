import { isFormValid } from "../login";

export default  {
    html:  `
        <section class="register-container">
        <form class="register-container__form">
            <h3>Register Form</h3>
            <div class="input-wrapper input-wrapper--with-label">
            <input type="text" id="username" name="username" required>
            <label for="username">Username</label>
            </div>
            <div class="input-wrapper input-wrapper--with-label">
            <input type="text" id="email" name="email" required>
            <label for="email">Email</label>
            <span class='register-container__form__error email-error hide'></span>
            </div>
            <div class="input-wrapper input-wrapper--with-label">
            <input type="password" id="password" name="password" required>
            <label for="password">Password</label>
            </div>
            <div>
                <a href="/login">have account? Login Now</a>
            </div>
            <span class='register-container__form__error relative invalid-form hide'>Enter a valid email, username with more than 4 chracters and a password with more than 8 characters</span>
            <button type="submit" class="btn btn--primary">Register</button>
        </form>
    </section>
    `,
    init: () => {
        const registerForm = document.querySelector(".register-container__form");
        if(registerForm) {
            registerForm.addEventListener("submit", register);
        }
    }
}


export function register (e) {
    e.preventDefault();
    const email = this.querySelector("#email").value;
    const username = this.querySelector("#username").value;
    const password = this.querySelector("#password").value;
    console.log(password)
    const invalidFormSpan = this.querySelector(".invalid-form");
    if(!isFormValid(email, password, username)){
        invalidFormSpan.classList.remove("hide");
        return
    }else {
        invalidFormSpan.classList.add("hide");
    }

    fetch("http://localhost:3000/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            email,
            password,
            name: username,
            active: true,
            role: "user"
        }) 
                
    })
    .then(response => {
        if (!response.ok) {
            return response.json().then(err => { 
                throw err
             });
        }
        return response.json();
    })
    .then((data => {
        localStorage.setItem("access-token", data.accessToken);
        localStorage.setItem("user", JSON.stringify(data.user));
        location.pathname = "/"
    })).catch(err => {
        if(err === "Email already exists"){
            const emailErrorSpan = document.querySelector(".email-error");
            emailErrorSpan.classList.remove("hide");
            emailErrorSpan.textContent = err            
        }        
    })
}