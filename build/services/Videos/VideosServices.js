"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const video_json_1 = __importDefault(require("./video.json"));
class VideoService {
    constructor() {
        this.video = video_json_1.default;
    }
    getVideoDefault() {
        return new Promise((resolve, _reject) => {
            resolve(this.video);
        });
    }
    generateVideoChunks(fs, range) {
        const videoPath = "src/assets/1.mp4"; //ruta del video
        const videoSize = fs.statSync(videoPath).size;
        const CHUNK_SIZE = 10 ** 6; // 1MB
        const start = Number(range.replace(/\D/g, ""));
        const end = Math.min(start + CHUNK_SIZE, videoSize - 1);
        // Create headers
        const contentLength = end - start + 1;
        const headers = {
            "Content-Range": `bytes ${start}-${end}/${videoSize}`,
            "Accept-Ranges": "bytes",
            "Content-Length": contentLength,
            "Content-Type": "video/mp4",
        };
        return { videoPath, headers, start, end };
    }
}
exports.default = VideoService;
