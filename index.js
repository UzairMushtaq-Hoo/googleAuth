const express = require("express");
const cors = require("cors");
const routes = require("./routes/routes");
const dotenv = require("dotenv");
// const { OAuth2Client } = require("google-auth-library");
// const client = new OAuth2Client(process.env.CLIENT_ID);


const serverPort = 3001;
dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

routes(app);

app.listen(serverPort, ()=>{
    console.log("Server Started at port", serverPort);
});