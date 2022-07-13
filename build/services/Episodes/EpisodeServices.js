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
Object.defineProperty(exports, "__esModule", { value: true });
const fetch = require('node-fetch');
class EpisodeService {
    constructor() {
        this.episodesData = undefined;
    }
    getDefaultEpisodes(data) {
        var _a;
        let dataClean = undefined;
        if (data) {
            dataClean = (_a = data === null || data === void 0 ? void 0 : data.data) === null || _a === void 0 ? void 0 : _a.map((e) => this.episodeMapData(e));
            this.episodesData = data !== null && data !== void 0 ? data : undefined;
        }
        return dataClean;
    }
    fetchEpisodesData(id) {
        return new Promise((resolve) => {
            const response = fetch(`https://kitsu.io/api/edge/anime/${id}/episodes`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/vnd.api+json' }
            });
            return resolve(response);
        });
    }
    getEpisodesByAnimeId(id_anime) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield fetch(`https://kitsu.io/api/edge/anime/${id_anime}/episodes`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/vnd.api+json' }
            });
            const dataEpisode = yield response.json();
            // asign to a episodes Complete data to interact whit the associate data in other calls
            if (response.ok) {
                const data = (_a = dataEpisode === null || dataEpisode === void 0 ? void 0 : dataEpisode.data) === null || _a === void 0 ? void 0 : _a.map((e) => this.episodeMapData(e));
                this.episodesData = dataEpisode;
                return data;
            }
            else {
                console.log("fetch error!", response);
                return { response };
            }
        });
    }
    episodeMapData(data) {
        const { id, attributes } = data;
        return {
            id, attributes
        };
    }
}
exports.default = EpisodeService;
