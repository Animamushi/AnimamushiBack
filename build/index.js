"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const index_1 = __importDefault(require("./routes/index"));
const error_handler_1 = require("./middlewares/error.handler");
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3300;
const API_ROUTE = process.env.API_ROUTE || '/api/v1';
app.use(express_1.default.json());
const whitelist = ['http://localhost:3300', 'http://localhost:3000', 'https://animamushi.com'];
const options = {
    origin: (origin, callback) => {
        if (whitelist.includes(origin) || !origin) {
            callback(null, true);
        }
        else {
            callback(new Error('no permitido'));
        }
    }
};
app.use((0, cors_1.default)(options));
app.get('/', (_req, res) => {
    //console.log('root');
    const apiInfo = {
        links: {
            self: API_ROUTE,
            anime: API_ROUTE + "/anime",
            episode: API_ROUTE + "/episode"
        }
    };
    res.send(apiInfo);
});
(0, index_1.default)(app);
app.use(error_handler_1.logErrors);
app.use(error_handler_1.boomErrorHandler);
app.use(error_handler_1.errorHandler);
app.listen(PORT, () => {
    console.log(`Server on port 
    ***************************
     http://localhost:${PORT}/
     **************************
     🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀`);
});
