import express from 'express'
import AnimeRouter from './anime.router'
import EpisodesRouter from './episode.router'
import WatchRouter from "./watch.router"
import { boomErrorHandler, errorHandler, logErrors } from '../middlewares/error.handler';

export default function routerAnimamushi(app: any) {
    const router = express.Router();
    app.use('/api/v1', router);
    router.use('/anime', AnimeRouter);
    router.use('/episode', EpisodesRouter);
    router.use('/watch', WatchRouter);
    router.use(logErrors);
    router.use(boomErrorHandler);
    router.use(errorHandler);
}
