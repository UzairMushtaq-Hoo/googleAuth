import express, {Application} from "express";
import dotenv from "dotenv";
import cors from "cors";
import connection from "../database";
import loginRoutes from "../routes/loginRoutes";

dotenv.config();
const app: Application = express();
const port =3001;
app.use(cors());
app.use(express.json());
loginRoutes(app);


connection.sync()
.then(() => {
    app.listen(port, ()=> {
        console.log("server started at " + port);
    })
})



