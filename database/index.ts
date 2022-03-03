import {Sequelize} from "sequelize-typescript"
import { User } from "./models/users";

const connection = new Sequelize({
    dialect: "postgres",
    host: "localhost",
    username: "postgres",
    password: "1234",
    database: "auth_postgres_seq_awilix",
    logging: false,
    models: [User],
  });
  
  export default connection;

