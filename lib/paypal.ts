const base = process.env.PAYPAL_API_URL || "https://api-m.sandbox.paypal.com";
const clientId = process.env.PAYPAL_CLIENT_ID || "";
const clientSecret = process.env.PAYPAL_CLIENT_SECRET || "";
export const paypal = {}

//Generate paypal access token
async function generateAccessToken(){
    const {PAYPAL_CLIENT_ID, PAYPAL_APP_SECRET} = process.env;
    const auth = Buffer.from(`${PAYPAL_CLIENT_ID}:${PAYPAL_APP_SECRET}`).toString("base64");
    const response = await fetch(`${base}/v1/oauth2/token`, {
        method: "POST",
        headers: {
            "Authorization": `Basic ${auth}`,
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({ grant_type: "client_credentials" }),
    });
    if(response.ok){
        const jsonData = await response.json();
        return jsonData.access_token
    } else {
        const errorMessage = await response.text();
        throw new Error(errorMessage);
    }
}       
    
export { generateAccessToken };