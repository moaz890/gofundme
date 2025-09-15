export default function Login () {
    return `
        <section class="login-container">
        <form class="login-container__form">
            <h3>Login Form</h3>
            <div class="input-wrapper input-wrapper--with-label">
                <input type="text" id="email" name="email" required>
                <label for="email">Email</label>
                <span class='login-container__form__error email-error hide'></span>
            </div>
            <div class="input-wrapper input-wrapper--with-label">
                <input type="password" id="password" name="password" required>
                <label for="password">Password</label>
                <span class='login-container__form__error password-error hide'></span>
            </div>
            <div>
            <a href="/register">not have account? Register Now</a>
            </div>
            <span class='login-container__form__error relative invalid-form hide'>Enter a valid email and a password more than 8 characters</span>
            <button type="submit" class="btn btn--primary">Login</button>
        </form>
    </section>
    `
}


export function login (e) {
    e.preventDefault();

    const email = this.querySelector("#email").value;
    const password = this.querySelector("#password").value;
    const invalidFormSpan = document.querySelector(".invalid-form")
    
    if(!isFormValid(email, password)) {
        invalidFormSpan.classList.remove("hide");
        return;
    }else {
        invalidFormSpan.classList.add("hide");
        fetch("http://localhost:3000/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: email,
                password: password
            }) 
                    
        }).then(response => {
            if (!response.ok) {
                return response.json().then(err => { 
                    throw err
                });
            }
            return response.json();
        })
        .then((data => {
            if(!data.user.active) {
                handleErrors("Banned User")
                return
            } 
            
            localStorage.setItem("access-token", data.accessToken);
            localStorage.setItem("user", JSON.stringify(data.user));
            
            if (data.user.role === "admin") {
                location.pathname = "/admin"
            }else{
                location.pathname = "/"
            }

        })).catch(err => {
            handleErrors(err)        
        })
    }   
}

export const isFormValid = (email, password, username="") => {
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^.{8,}$/;

    if(emailRegex.test(email) && passwordRegex.test(password)){

        if (username && username.length < 4) {
            return false
        } 
        return true
    }

    return false
}


export const handleErrors = (err) => {
    const emailErrorSpan = document.querySelector(".email-error");
    const passwordErrorSpan = document.querySelector(".password-error");
    
    if(err === "Cannot find user"){
        emailErrorSpan.classList.remove("hide");
        emailErrorSpan.textContent = err            
    }else {
        emailErrorSpan.classList.add("hide");
    }
    
    if(err === "Incorrect password"){
        passwordErrorSpan.classList.remove("hide");
        passwordErrorSpan.textContent = err            
    }else {
        passwordErrorSpan.classList.add("hide");
    }

    if(err === "Banned User") {
        emailErrorSpan.classList.remove("hide");
        emailErrorSpan.textContent = err;
    }
}