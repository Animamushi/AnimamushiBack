import express from "express";
import EpisodeService from '../services/Episodes/EpisodeServices';
import episodes from '../services/Episodes/Episodes.json'
import validatorHandler from "../middlewares/validator.handler";
import { getEpisodeSchema } from "../schemas/episode.schema";

const EpisodesRouter = express.Router();
const service = new EpisodeService();

EpisodesRouter.get('/',
    async (_req, res) => {
        const episodeData = await service.getDefaultEpisodes(episodes);
        res.json({ data: episodeData });
    }
);

EpisodesRouter.get('/:id',
    validatorHandler(getEpisodeSchema, 'params'),
    async (req, res, next) => {
        try {
            const { id } = req.params;
            const episode = await service.getEpisodesByAnimeId(parseInt(id));
            res.json({ data: episode });
        } catch (error) {
            next(error);
        }
    }
);


export default EpisodesRouter;
