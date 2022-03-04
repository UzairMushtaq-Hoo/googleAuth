// const client = new OAuth2Client("953999418916-g6ht104mq1rdooi3iickb4olava8qj3k.apps.googleusercontent.com")
const {OAuth2Client} = require("google-auth-library");
// const http = require("http");
// const url = require("url");
// const open = require('open');
// const destroyer = require('server-destroy');
// const keys = require('./oauth2.keys.json');

const code = "4/0AX4XfWhCVoaUhI6kbume2n9bHtEuV1-lwdVVAzf8Jc8bRSysUlbNm23UuMunBY5YsCJVzw";



const genToken = async() =>{
    const oAuth2Client1 = new OAuth2Client(
        "953999418916-g6ht104mq1rdooi3iickb4olava8qj3k.apps.googleusercontent.com",
        "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",
        "http://localhost:3000"
    );
    console.log(oAuth2Client1);
    const tokens = await oAuth2Client1.getToken(code);
    console.log(tokens.access_token);
};


genToken();