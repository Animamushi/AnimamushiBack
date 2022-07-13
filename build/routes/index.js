"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const anime_router_1 = __importDefault(require("./anime.router"));
const episode_router_1 = __importDefault(require("./episode.router"));
const watch_router_1 = __importDefault(require("./watch.router"));
const error_handler_1 = require("../middlewares/error.handler");
function routerAnimamushi(app) {
    const router = express_1.default.Router();
    app.use('/api/v1', router);
    router.use('/anime', anime_router_1.default);
    router.use('/episode', episode_router_1.default);
    router.use('/watch', watch_router_1.default);
    router.use(error_handler_1.logErrors);
    router.use(error_handler_1.boomErrorHandler);
    router.use(error_handler_1.errorHandler);
}
exports.default = routerAnimamushi;
