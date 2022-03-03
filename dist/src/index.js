"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const database_1 = __importDefault(require("../database"));
const loginRoutes_1 = __importDefault(require("../routes/loginRoutes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = 3001;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
(0, loginRoutes_1.default)(app);
database_1.default.sync()
    .then(() => {
    app.listen(port, () => {
        console.log("server started at " + port);
    });
});
