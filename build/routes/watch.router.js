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
const express_1 = require("express");
const fs_1 = __importDefault(require("fs"));
const VideosServices_1 = __importDefault(require("../services/Videos/VideosServices"));
const WatchRouter = (0, express_1.Router)();
const service = new VideosServices_1.default();
WatchRouter.get('/', (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const video = yield service.getVideoDefault();
    res.json(video);
}));
WatchRouter.get('/video', (req, res) => {
    var _a;
    const range = (_a = req.headers.range) !== null && _a !== void 0 ? _a : "bytes=0-";
    if (!range) {
        res.status(400).send("Requires Range header");
    }
    const { headers, videoPath, start, end } = service.generateVideoChunks(fs_1.default, range);
    // HTTP Status 206 for Partial Content
    res.writeHead(206, headers);
    // create video read stream for this particular chunk
    const videoStream = fs_1.default.createReadStream(videoPath, { start, end });
    // Stream the video chunk to the client
    videoStream.pipe(res);
});
exports.default = WatchRouter;
