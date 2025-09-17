import campaign, { getCampaign } from "../campaign";

export default {
    
    
    html: `
        <div class='overlay'>   
            <button class='btn btn--danger overlay__close-btn'>X</button>     
            <form class="donate-form">
                <h2 class="donate-form__title">Donate Now</h2>

                <label for="amount">Donation Amount ($)</label>
                <input type="number" id="amount" name="amount" min="1"  step="1" placeholder="50" required>

                <div class="donate-form__payment">
                    <h3>Payment Information</h3>

                    <label for="cardName">Cardholder Name</label>
                    <input type="text" id="cardName" name="cardName" placeholder="John Doe" required>

                    <label for="cardNumber">Card Number</label>
                    <input type="text" id="cardNumber" name="cardNumber" maxlength="16" placeholder="1234 5678 9012 3456" required>

                    <div class="donate-form__card-details">
                    <div>
                        <label for="expiry">Expiry Date</label>
                        <input type="text" id="expiry" name="expiry" placeholder="MM/YY" required>
                    </div>
                    <div>
                        <label for="cvv">CVV</label>
                        <input type="text" id="cvv" name="cvv" maxlength="4" placeholder="123" required>
                    </div>
                    </div>
                </div>

            <button type="submit" class="donate-form__button">Donate</button>
            </form>
        </div>

    `,
    init: () => {
        const form = document.querySelector(".donate-form");
        if(form) {
            form.addEventListener("submit", (e) => {
                e.preventDefault();
                donate({
                    campaignId: campaign.id,
                    userId: JSON.parse(localStorage.getItem("user")).id, 
                    amount: donateForm.querySelector("input#amount").value
                });
                document.querySelector(".overlay").classList.remove("show");
                getCampaign()
            });
        }
    }
}

export const donate = async ({ campaignId, amount, userId }) => {

    const req = await fetch("http://localhost:3000/pledges", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("accessToken")
        },
        body: JSON.stringify({
            campaignId,
            userId,
            amount
        })
    })

    if(!req.ok) {
        const errorAlert = document.querySelector("alert--error");
        errorAlert.classList.add("show");
        const delay = setTimeout(() => {
            errorAlert.classList.remove("show")
            clearTimeout(delay);
        }, 4000);
        throw new Error("Sorry, Try Again as there is a problem")
    }
    const response = await req.json()
    const successAlert = document.querySelector(".alert--success");
    successAlert.classList.add("show");
    const delay = setTimeout(() => {
        successAlert.classList.remove("show")
        clearTimeout(delay);
    }, 4000);
    
}






