const authController = require("../controllers/authController");
const deleteAcc = require("../controllers/deleteAcc");
const peopleAPI = require("../controllers/peopleAPI");
// import pool from '../database';

module.exports = (app)=> {

    // app.route('/register').post(authController.register);
    // app.route('/login').post(authController.login);
    app.route("/delete").post(deleteAcc.authorizeAccessToken, deleteAcc.deleteAccount);
    app.route("/auth/google").post(authController.googleAuth);
    app.route("/getAccessToken").post(peopleAPI.getNewToken);
    app.route("/getAccessTokenFromRef").get(peopleAPI.getToken_refreshToken);

};
