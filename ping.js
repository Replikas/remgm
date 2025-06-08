const axios = require('axios');

// Your Render site URL
const SITE_URL = 'https://remgm.onrender.com';

// Function to ping the site
async function pingSite() {
    try {
        const response = await axios.get(SITE_URL);
        console.log(`[${new Date().toISOString()}] Ping successful! Status: ${response.status}`);
    } catch (error) {
        console.error(`[${new Date().toISOString()}] Ping failed:`, error.message);
    }
}

// Ping every 14 minutes (Render's sleep timeout is 15 minutes)
const PING_INTERVAL = 14 * 60 * 1000;

// Initial ping
pingSite();

// Set up periodic pinging
setInterval(pingSite, PING_INTERVAL);

console.log('Ping service started. Will ping every 14 minutes.'); 