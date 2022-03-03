"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const loginController = require("../controllers/loginController");
// import * as loginController from "../controllers/loginController";
const loginRoutes = (expressApp) => {
    expressApp.route('/google/auth').post(loginController.googleAuth);
    expressApp.route('/verifyIdToken').post(loginController._verifyIdToken);
    expressApp.route('/refreshToken').post(loginController._refreshToken);
    expressApp.route('/getTokenInfo').post(loginController._getTokenInfo);
    expressApp.route('/isTokenExpiring').post(loginController._isTokenExpiring);
    expressApp.route('/revokeToken').post(loginController._revokeToken);
    expressApp.route('/getAccessToken').post(loginController._getAccessToken);
};
exports.default = loginRoutes;
