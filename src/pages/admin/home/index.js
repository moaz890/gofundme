import Chart from "chart.js/auto"
export default function AdminHomePage () {
    return `
        <div class="admin-dashboard">
            <div class="admin-dashboard__chart">
                <h3>Campaign Funding Progress</h3>
                <canvas id="campaignFundingChart"></canvas>
            </div>

            <div class="admin-dashboard__chart">
                <h3>User Contributions</h3>
                <canvas id="userContributionsChart"></canvas>
            </div>

            <div class="admin-dashboard__chart">
                <h3>Campaigns by Status</h3>
                <canvas id="campaignStatusChart"></canvas>
            </div>
            <div class="admin-dashboard__chart">
                <h3>Users Status</h3>
               <canvas id="userStatusChart"></canvas>
            </div>
        </div>
    `   
}


document.addEventListener("DOMContentLoaded", async () => {
    if (location.pathname === "/admin") {

        const campaigns = await getCampaigns()
        const pledges = await getPledges();
        const campaignTotals = campaigns.map(camp => {
        const totalPledged = pledges
          .filter(p => p.campaignId == camp.id)
          .reduce((sum, p) => sum + Number(p.amount), 0);
        return {
          title: camp.title,
          goal: camp.goal,
          pledged: totalPledged
        };
      });
    
      
      const users = await getUsers();
      const userTotals = users.map(user => {
        const totalContributed = pledges
          .filter(p => p.userId == user.id)
          .reduce((sum, p) => sum + Number(p.amount), 0);
        return {
          name: user.name,
          amount: totalContributed
        };
      });
    
    
      const approvedCount = campaigns.filter(c => c.approved).length;
      const pendingCount = campaigns.filter(c => !c.approved).length;
    
    
      const campaignFundingCtx = document.getElementById('campaignFundingChart');
      new Chart(campaignFundingCtx, {
        type: 'bar',
        data: {
          labels: campaignTotals.map(c => c.title),
          datasets: [
            {
              label: 'Goal',
              data: campaignTotals.map(c => c.goal),
              backgroundColor: 'rgba(255, 123, 0, 0.4)'
            },
            {
              label: 'Pledged',
              data: campaignTotals.map(c => c.pledged),
              backgroundColor: 'rgba(40, 167, 69, 0.6)'
            }
          ]
        },
        options: {
          responsive: true,
          plugins: {
            legend: { position: 'top' },
            title: { display: true, text: 'Campaign Funding Progress' }
          }
        }
      });
    
      const userContributionsCtx = document.getElementById('userContributionsChart');
      new Chart(userContributionsCtx, {
        type: 'pie',
        data: {
          labels: userTotals.map(u => u.name),
          datasets: [{
            data: userTotals.map(u => u.amount),
            backgroundColor: ['#FF7B00', '#28A745', '#007BFF']
          }]
        },
        options: {
          responsive: true,
          plugins: {
            title: { display: true, text: 'User Contributions' }
          }
        }
      });
    
      const campaignStatusCtx = document.getElementById('campaignStatusChart');
      new Chart(campaignStatusCtx, {
        type: 'doughnut',
        data: {
          labels: ['Approved', 'Pending'],
          datasets: [{
            data: [approvedCount, pendingCount],
            backgroundColor: ['#28A745', '#FF9800']
          }]
        },
        options: {
          responsive: true,
          plugins: {
            title: { display: true, text: 'Campaign Status' }
          }
        }
      });
    
      const usCanvas = document.getElementById('userStatusChart');
      const activeUsers = users.filter(x => x.active).length;
      const bannedUsers = users.length - activeUsers;
    
      if (usCanvas) {
        const ctx = usCanvas.getContext('2d');
        new Chart(ctx, {
          type: 'doughnut', // or 'pie'
          data: {
            labels: ['Active', 'Not Active'],
            datasets: [
              {
                data: [activeUsers, bannedUsers],
                backgroundColor: ['#28A745', '#FF4B4B']
              }
            ]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { position: 'top' } }
          }
        });
      }
    }   

})

const getCampaigns = async () => {
    let req = await fetch("http://localhost:3000/campaigns")
    let response = await req.json();
    return response;
}
const getPledges = async () => {
    let req = await fetch("http://localhost:3000/pledges")
    let response = await req.json();
    return response;
}
const getUsers = async () => {
    let req = await fetch("http://localhost:3000/users")
    let response = await req.json();
    return response;
}