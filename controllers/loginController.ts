import {google} from 'googleapis';
import {Request, Response} from 'express';
import dotenv from 'dotenv';
var querystring = require('querystring');
var request = require('request');

dotenv.config();
const refresh_url = 'https://oauth2.googleapis.com/token';
const SCOPES = ['https://www.googleapis.com/auth/contacts.readonly'];
const client_id = process.env.CLIENT_ID;
const client_secret = process.env.CLIENT_SECRET;
const redirect_uri = process.env.REDIRECT_URI;
const oAuth2Client = new google.auth.OAuth2(
                    client_id, client_secret, redirect_uri);


export const googleAuth = (req: Request, res: Response) => {
    console.log("SECRET::: ", client_secret);
    let data = req.body.code;
    //  do a db query to check if already have Access Token, Otherwise:
    const authUrl = oAuth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: SCOPES,
      });

      try{
        oAuth2Client.getToken(req.body.code, (err, tokens) => {
            if (err) return console.error('Error retrieving access token', err);
            const token:any = tokens;
            oAuth2Client.setCredentials(token);

            console.log(token);
            res.json(token);
    
            // Store the token to disk for later program executions
            // callback(oAuth2Client);
          });
      }
      catch (err){
          console.log(err);
          res.sendStatus(401);
      }

};



export const _verifyIdToken = async (req:Request, res:Response) => {
    console.log("idToken:::: ", req.body.idToken);
    console.log("idToken:::: ENDSSSSSSSSSSSSS");
    try{
    const resData = await oAuth2Client.verifyIdToken(req.body);
    console.log(resData);
    res.json(resData);
    }
    catch(err){
        console.log(err);
        res.sendStatus(401);
    }

}

export const _refreshToken = async (req:Request, res:Response) => {
    const refresh_Token = req.body.refresh_token;
        try{
            const data = {
                refresh_token: refresh_Token,
                client_id: client_id,
                client_secret: client_secret,
                grant_type: 'refresh_token',
            };
            var formData = querystring.stringify(data);
            var contentLength = formData.length;
            // request for new token
            request({
                headers: {
                  'Content-Length': contentLength,
                  'Content-Type': 'application/x-www-form-urlencoded'
                },
                uri: refresh_url,
                body: formData,
                method: 'POST'
              }, function (err:any, res:any, body:any) {
                //it works!
                console.log(body);
              });

    }
    catch(err){
        console.log(err);
        res.sendStatus(401);
    }
}

export const _getTokenInfo = async (req:Request, res:Response) => {
    const a_token = req.body.access_token;
    try{
        const resData = await oAuth2Client.getTokenInfo(a_token);
        console.log(resData);
        res.json(resData);
    }
    catch(err){
        console.log(err);
        res.sendStatus(401);
    }
}

export const _isTokenExpiring = (req:Request, res:Response) => {
    const expiry_date = req.body.expiry_date;
    try{
        const expiryDate = expiry_date;
        const resData = expiryDate
            ? expiryDate <= new Date().getTime()
            : false;
            console.log(resData);
            res.json(resData);
    }
    catch(err){
        console.log(err);
        res.sendStatus(401);
    }
}

export const _revokeToken = async (req:Request, res:Response) => {
    const token = req.body.access_token;
    try{
        const resData = await oAuth2Client.revokeToken(token);
        console.log(resData);
        res.json(resData);
    }
    catch(err){
        console.log(err);
        res.sendStatus(401);
    }
}
