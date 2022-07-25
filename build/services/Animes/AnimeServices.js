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
const Animes_json_1 = __importDefault(require("./Animes.json"));
const fetch = require('node-fetch');
const boom = require('@hapi/boom');
class AnimeService {
    constructor() {
        this.animesData = Animes_json_1.default;
        this.animeSelected = undefined;
    }
    getAnimesAllData() {
        const timeout = 200;
        return new Promise((resolve) => {
            setTimeout(() => {
                var _a;
                const data = (_a = this.animesData) === null || _a === void 0 ? void 0 : _a.map(({ id, attributes }) => { return { id, attributes }; });
                return resolve(data);
            }, timeout);
        });
    }
    getAnimeById(id_anime) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const anime = (_a = this.animesData) === null || _a === void 0 ? void 0 : _a.find(({ id }) => id === +id_anime);
            if (!anime) {
                const response = yield fetch(`https://kitsu.io/api/edge/anime/${id_anime}`, {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/vnd.api+json' }
                });
                const dataAnime = yield response.json();
                // asign to a episodes Complete data to interact whit the associate data in other calls
                if (response.ok) {
                    const { data } = dataAnime;
                    const dataMaped = this.animeMapData(data);
                    /* const data = dataAnime?.data?.map((a: Anime) => this.animeMapData(a)); */
                    this.animeSelected = dataAnime;
                    return dataMaped;
                }
                else {
                    const error = new Error('Unexpected input');
                    throw boom.badRequest(error);
                }
            }
            else {
                this.animeSelected = anime;
            }
            return this.animeSelected;
        });
    }
    animeMapData(data) {
        const { id, attributes } = data;
        return {
            id, attributes
        };
    }
}
exports.default = AnimeService;
/* export const getAnimeAllData = () => anime;
export const getAnimeById = (id: number) => {
    try {
        const anime = getAnimeAllData().find(({ id }) => id === id);
        console.log(anime);
    } catch (error) {
        console.log(`Error on get ${id} --->`, error)
    }
}
export const addAnime = () => null; */ 
