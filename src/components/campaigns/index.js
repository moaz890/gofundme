export default {
    html: `
        <section class="campaigns">
            <div class="container">
                <div class="campaigns__container">

                </div>
            </div>
        </section>
    `
}

export async function getUsersInClient() {
    const req = await fetch("http://localhost:3000/users");
    const response = await req.json();
    return response;
} 
export async function getCampaignsInClient() {
    const req = await fetch("http://localhost:3000/campaigns");
    const response = await req.json();
    return response;
} 

export async function getPledgesInClient() {
    const req = await fetch("http://localhost:3000/pledges");
    const response = await req.json();
    return response;
} 

async function getCampaignsWithPledges() {

    const users = await getUsersInClient();    
    const campaigns = await getCampaignsInClient();    
    const pledges = await getPledgesInClient();    

    return { users, campaigns, pledges }
}

export async function getCampaignsJoined() {
  const { campaigns, pledges, users } = await getCampaignsWithPledges();
    
  // Build a map of users for quick lookup
  const userMap = Object.fromEntries(users.map(u => [u.id, u, u.name]));
  // For each campaign, attach its pledges and users
  
  const campaignsWithPledges = campaigns.map(campaign => {
    const campaignPledges = pledges.filter(p => p.campaignId == campaign.id);
    const { name } = users.find((x) => x.id == campaign.userId);
    
    // enrich each pledge with username & amount
    const pledgesWithUsernames = campaignPledges.map((p, x) => ({
      ...p,
      username: userMap[p.userId]?.name || "Unknown"
    }));

    return  {
      ...campaign,
      username: name,
      pledges: pledgesWithUsernames,
      totalAmount: pledgesWithUsernames.reduce((sum, p) => sum + +p.amount, 0)
    } 
  });
  return campaignsWithPledges;
}

