import { Router } from 'express'
import fs from 'fs'
import VideoService from '../services/Videos/VideosServices';

const WatchRouter = Router();
const service = new VideoService();

WatchRouter.get('/', async (_req, res) => {
    const video = await service.getVideoDefault()
    res.json(video);
})

WatchRouter.get('/video', (req, res) => {

    const range = req.headers.range ?? "bytes=0-";

    if (!range) {
        res.status(400).send("Requires Range header");
    }
    const { headers, videoPath, start, end } = service.generateVideoChunks(fs, range)

    // HTTP Status 206 for Partial Content
    res.writeHead(206, headers);

    // create video read stream for this particular chunk
    const videoStream = fs.createReadStream(videoPath, { start, end });

    // Stream the video chunk to the client
    videoStream.pipe(res);
});

export default WatchRouter