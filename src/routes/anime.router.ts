import express from "express";
import validatorHandler from "../middlewares/validator.handler";
import { getAnimeSchema } from "../schemas/anime.schema";
import AnimeService from '../services/Animes/AnimeServices'

const AnimeRouter = express.Router();
const service = new AnimeService();

AnimeRouter.get('/',
    async (_req, res) => {
        const animes = await (await service.getAnimesAllData());
        res.json(animes);
    });

AnimeRouter.get('/:id',
    validatorHandler(getAnimeSchema, 'params'),
    async (req, res, next) => {
        try {
            const { id } = req.params;
            const anime = await service.getAnimeById(parseInt(id));
            res.json(anime);
        } catch (error) {
            next(error);
        }
    }
);

export default AnimeRouter;


