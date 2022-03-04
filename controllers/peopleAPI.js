const {google} = require("googleapis");

// const SCOPES = ["https://www.googleapis.com/auth/contacts.readonly", "https://www.googleapis.com/auth/userinfo.email", "https://www.googleapis.com/auth/userinfo.profile"];
const SCOPES = ["https://www.googleapis.com/auth/contacts.readonly"];
const client_id= "953999418916-g6ht104mq1rdooi3iickb4olava8qj3k.apps.googleusercontent.com";
const client_secret= "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";
const redirect_uris= "http://localhost:3000";
// const code= "4/0AX4XfWjrUBs4J1bARz8Bgib25aWINudP6UeBLTA9QR7_l9AlQ_LROxKZE9ecNt7hxhNoVg";
const refToken = "1//03xCG9vvNd1FrCgYIARAAGAMSNwF-L9Ir5cRmGwAKbcxsPMySjJd4yy5Obq9U6JA342b5x7H1Qe5GcCWefSYALkWO67-9xk8Q_L8";



// GET ACCESS TOKEN using CODE
exports.getNewToken = async(req, res) => {
    console.log("inn get New Token");
    const code = req.body.code;
    const oAuth2Client = new google.auth.OAuth2(
        client_id, client_secret, redirect_uris);

    oAuth2Client.generateAuthUrl({
        access_type: "offline",
        scope: SCOPES,
    });

    oAuth2Client.getToken(code, (err, token) => {
        if (err) return console.error("Error retrieving access token", err);
        console.log(token);
        oAuth2Client.setCredentials(token);
        res.json(token);
    });
    // const data = await oAuth2Client.getToken(code);
    // console.log(data);
    // res.json(data);

};


// Get ACCESS TOKEN using a stored REFRESH TOKEN
exports.getToken_refreshToken = async(req, res)=> {
    const oAuth2Client = new google.auth.OAuth2(
        client_id, client_secret, redirect_uris);

    try{
        const data = await oAuth2Client.refreshToken(refToken);
        console.log(data.tokens);
        res.json(data.tokens);
    }
    catch(err){
        console.log(err);
    }

};
