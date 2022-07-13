import video from "./video.json";

export default class VideoService {
    video: any;

    constructor() {
        this.video = video;
    }
    getVideoDefault() {
        return new Promise((resolve, _reject) => {
            resolve(this.video)
        });
    }
    generateVideoChunks(fs: any, range: string) {

        const videoPath = "src/assets/1.mp4";//ruta del video
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

        return { videoPath, headers, start, end }
    }
}