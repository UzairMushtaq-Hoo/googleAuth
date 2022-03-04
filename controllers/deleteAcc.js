// const pool = require("../database");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
// const { OAuth2Client } = require("google-auth-library");
// const client = new OAuth2Client(process.env.CLIENT_ID);

// Delete Account Controller
exports.deleteAccount = async (req, res) =>{
    const email = req.body.email;
    console.log(email);
    // const data = await pool.query("DELETE FROM app_users WHERE email = $1", [email]);
    console.log("delete");
    res.send("Deleted");
};


exports.authorizeAccessToken = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    console.log(authHeader);
    const token = authHeader && authHeader.split(" ")[1];
    console.log("Token is::: ", token);
    if(token === null){
        // res.send('token is null');
        console.log(token);
    }
    else{
        jwt.verify(token, process.env.ACCESS_TOKEN_JWT, (err, email)=>{
            console.log("verifying token");
            if(err)
            {console.log(err);}
            req.email = email;
        });
        // res.send('token ok');
    }
    next();

};