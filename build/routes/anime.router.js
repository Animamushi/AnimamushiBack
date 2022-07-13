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
const validator_handler_1 = __importDefault(require("../middlewares/validator.handler"));
const anime_schema_1 = require("../schemas/anime.schema");
const AnimeServices_1 = __importDefault(require("../services/Animes/AnimeServices"));
const AnimeRouter = express_1.default.Router();
const service = new AnimeServices_1.default();
AnimeRouter.get('/', (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const animes = yield (yield service.getAnimesAllData());
    res.json(animes);
}));
AnimeRouter.get('/:id', (0, validator_handler_1.default)(anime_schema_1.getAnimeSchema, 'params'), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const anime = yield service.getAnimeById(parseInt(id));
        res.json(anime);
    }
    catch (error) {
        next(error);
    }
}));
exports.default = AnimeRouter;
