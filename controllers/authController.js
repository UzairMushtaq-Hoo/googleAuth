const { OAuth2Client } = require("google-auth-library");

// const clientID = "953999418916-g6ht104mq1rdooi3iickb4olava8qj3k.apps.googleusercontent.com";
const client = new OAuth2Client("953999418916-g6ht104mq1rdooi3iickb4olava8qj3k.apps.googleusercontent.com");


exports.googleAuth = async (req, res) => {
    const { token } = req.body;
    console.log(token);
    try{
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: "953999418916-g6ht104mq1rdooi3iickb4olava8qj3k.apps.googleusercontent.com",
            maxExpiry: 10000
        });
        console.log("here.....");
        const { name, email, picture } = ticket.getPayload();
        // console.log({sub, name, email, picture});
        // const userid = sub;
        res.json({status:200, name, email, picture});
    }
    catch(err){
        console.log("error occ");
        res.sendStatus(403);
    }

};












// test

// import querystring from "querystring";
// import axios from "axios";

// function getTokens({
//   code,
//   clientId,
//   clientSecret,
//   redirectUri,
// }) {

//   /*
//   Returns:
//   Promise<{
//     access_token: string;
//     expires_in: Number;
//     refresh_token: string;
//     scope: string;
//     id_token: string;
//   }>
//   */
//   const url = "https://oauth2.googleapis.com/token";
//   const values = {
//     code,
//     client_id: clientId,
//     client_secret: clientSecret,
//     redirect_uri: redirectUri,
//     grant_type: "authorization_code",
//   };

//   return axios
//     .post(url, querystring.stringify(values), {
//       headers: {
//         "Content-Type": "application/x-www-form-urlencoded",
//       },
//     })
//     .then((res) => res.data)
//     .catch((error) => {
//       throw new Error(error.message);
//     });
// }