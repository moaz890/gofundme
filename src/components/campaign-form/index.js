 import { getMyCampaigns } from "../my-campaigns";

export default  {
    html: `
        <div class='overlay'>   
            <button class='btn btn--danger overlay__close-btn'>X</button>     
        <section class="campaign-form-section">
  <h2>Create New Campaign</h2>
  <form class="campaign-form" id="campaignForm">
    <div class="form-group">
      <label for="title">Campaign Title</label>
      <input type="text" id="title" name="title" placeholder="Enter campaign title" required />
    </div>

    <div class="form-group">
      <label for="description">Description</label>
      <textarea id="description" name="description" rows="4" placeholder="Enter campaign description" required></textarea>
    </div>

    <div class="form-group">
      <label for="goal">Goal Amount</label>
      <input type="number" id="goal" name="goal" placeholder="Enter goal amount" required />
    </div>

    <div class="form-group">
      <label for="deadline">Deadline</label>
      <input type="date" id="deadline" name="deadline" required />
    </div>
    
    <div class="form-group">
      <label for="imageFile">Upload Image</label>
      <input type="file" id="imageFile" name="imageFile" accept="image/*" required />
      <img src="" class='image-perview'>
    </div>

    <div class="form-group">
      <label for="category">Category</label>
      <select id="category" name="category" required>
        <option value="">Select category</option>
        <option value="education">Education</option>
        <option value="health">Health</option>
        <option value="mosque">Mosque</option>
        <option value="environment">Environment</option>
        <option value="wars">Wars</option>
      </select>
    </div>

    <button type="submit" class="btn btn--primary">Create Campaign</button>
  </form>
</section>
</div>
    `,

  init: () => {
    const form = document.querySelector(".campaign-form");
    if(form) {
      form.addEventListener("submit", (e) => {
        e.preventDefault()
        addCampaign(e)
      })
    }
  }
}


function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}
const addCampaign = async (e) => {
  e.preventDefault(); 

  const form = e.target;
  const formData = new FormData(form);

  
  const newCampaign = {
    title: formData.get('title'),
    description: formData.get('description'),
    goal: Number(formData.get('goal')),
    deadline: (formData.get('deadline')),
    category: formData.get('category'),
    userId: JSON.parse(localStorage.getItem("user")).id,
    approved: false
  };

  
  const fileInput = document.getElementById('imageFile');
  const file = fileInput.files[0];

  if (file) {
    const base64Image = await fileToBase64(file);
    newCampaign.image = base64Image;
  } else {
    const existingImage = form.querySelector("#existingImage");
    if (form.classList.contains("edit-campaign") && existingImage) {
      newCampaign.image = existingImage.value;
    } else {
      const errorAlert = document.querySelector(".alert--error");
      errorAlert.querySelector(".alert__text").textContent = 'Error in File Upload';
      errorAlert.classList.add("show");
      setTimeout(() => {
        errorAlert.classList.remove("show");
      }, 4000);
      return;
    }
  }

  const successAlert = document.querySelector(".alert--success");

  if (form.classList.contains("edit-campaign")) {
    const campaignId = form.querySelector("#campaign-id").value;

    await fetch(`http://localhost:3000/campaigns/${campaignId}`, {
      method: 'PATCH', 
      headers: {
        'Content-Type': 'application/json',
        'Authorization': "Bearer " + localStorage.getItem("access-token")
      },
      body: JSON.stringify(newCampaign)
    });

    successAlert.querySelector(".alert__text").textContent = 'Campaign Updated Successfully';
  } else {
    await fetch('http://localhost:3000/campaigns', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': "Bearer " + localStorage.getItem("access-token")
      },
      body: JSON.stringify(newCampaign)
    });

    successAlert.querySelector(".alert__text").textContent = 'Campaign Created Successfully';
  }

  successAlert.classList.add("show");
  document.querySelector(".overlay").classList.remove("show");

  setTimeout(() => {
    successAlert.classList.remove("show");
  }, 4000);
  getMyCampaigns()
  form.reset();
};


