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
const express_1 = __importDefault(require("express"));
const EpisodeServices_1 = __importDefault(require("../services/Episodes/EpisodeServices"));
const Episodes_json_1 = __importDefault(require("../services/Episodes/Episodes.json"));
const validator_handler_1 = __importDefault(require("../middlewares/validator.handler"));
const episode_schema_1 = require("../schemas/episode.schema");
const EpisodesRouter = express_1.default.Router();
const service = new EpisodeServices_1.default();
EpisodesRouter.get('/', (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const episodeData = yield service.getDefaultEpisodes(Episodes_json_1.default);
    res.json({ data: episodeData });
}));
EpisodesRouter.get('/:id', (0, validator_handler_1.default)(episode_schema_1.getEpisodeSchema, 'params'), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const episode = yield service.getEpisodesByAnimeId(parseInt(id));
        res.json({ data: episode });
    }
    catch (error) {
        next(error);
    }
}));
exports.default = EpisodesRouter;
