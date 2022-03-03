"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports._getAccessToken = exports._revokeToken = exports._isTokenExpiring = exports._getTokenInfo = exports._refreshToken = exports._verifyIdToken = exports.googleAuth = void 0;
const googleapis_1 = require("googleapis");
const dotenv_1 = __importDefault(require("dotenv"));
// import fetch from 'node-fetch';
// const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
var querystring = require('querystring');
var request = require('request');
dotenv_1.default.config();
const SCOPES = ['https://www.googleapis.com/auth/contacts.readonly'];
const client_id = process.env.CLIENT_ID;
const client_secret = process.env.CLIENT_SECRET;
const redirect_uri = process.env.REDIRECT_URI;
const oAuth2Client = new googleapis_1.google.auth.OAuth2(client_id, client_secret, redirect_uri);
// const UserRefreshClient_1 = new google.auth.UserRefreshClient()
const refresh_url = 'https://oauth2.googleapis.com/token';
// console.log("SECRET::: ", client_secret);
const googleAuth = (req, res) => {
    console.log("SECRET::: ", client_secret);
    let data = req.body.code;
    //  do a db query to check if already have Access Token, Otherwise:
    const authUrl = oAuth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: SCOPES,
    });
    try {
        oAuth2Client.getToken(req.body.code, (err, tokens) => {
            if (err)
                return console.error('Error retrieving access token', err);
            const token = tokens;
            oAuth2Client.setCredentials(token);
            console.log(token);
            res.json(token);
            // Store the token to disk for later program executions
            // callback(oAuth2Client);
        });
    }
    catch (err) {
        console.log(err);
        res.sendStatus(401);
    }
};
exports.googleAuth = googleAuth;
const _verifyIdToken = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("idToken:::: ", req.body.idToken);
    console.log("idToken:::: ENDSSSSSSSSSSSSS");
    try {
        const resData = yield oAuth2Client.verifyIdToken(req.body);
        console.log(resData);
        res.json(resData);
    }
    catch (err) {
        console.log(err);
        res.sendStatus(401);
    }
});
exports._verifyIdToken = _verifyIdToken;
const _refreshToken = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const refresh_Token = req.body.refresh_token;
    try {
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
        }, function (err, res, body) {
            //it works!
            console.log(body);
        });
        // const res = await transporter.request({
        //     method: 'POST',
        //     refresh_url,
        //     data: stringify(data),
        //     headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        // });
        // const tokens = res.data;
        // // TODO: de-duplicate this code from a few spots
        // if (res.data && res.data.expires_in) {
        //     tokens.expiry_date = new Date().getTime() + res.data.expires_in * 1000;
        //     delete tokens.expires_in;
        // }
        // console.log(tokens);
        // res.json(tokens);
        // const resData = await oAuth2Client.refreshTokenNoCache(refresh_Token);
        // console.log(resData);
        // res.json(resData);
    }
    catch (err) {
        console.log(err);
        res.sendStatus(401);
    }
});
exports._refreshToken = _refreshToken;
const _getTokenInfo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const a_token = req.body.access_token;
    try {
        const resData = yield oAuth2Client.getTokenInfo(a_token);
        console.log(resData);
        res.json(resData);
    }
    catch (err) {
        console.log(err);
        res.sendStatus(401);
    }
});
exports._getTokenInfo = _getTokenInfo;
const _isTokenExpiring = (req, res) => {
    const expiry_date = req.body.expiry_date;
    try {
        const expiryDate = expiry_date;
        const resData = expiryDate
            ? expiryDate <= new Date().getTime()
            : false;
        console.log(resData);
        res.json(resData);
    }
    catch (err) {
        console.log(err);
        res.sendStatus(401);
    }
};
exports._isTokenExpiring = _isTokenExpiring;
const _revokeToken = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.body.access_token;
    try {
        const resData = yield oAuth2Client.revokeToken(token);
        console.log(resData);
        res.json(resData);
    }
    catch (err) {
        console.log(err);
        res.sendStatus(401);
    }
});
exports._revokeToken = _revokeToken;
const _getAccessToken = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const resData = yield oAuth2Client.getAccessToken();
    }
    catch (err) {
    }
});
exports._getAccessToken = _getAccessToken;
