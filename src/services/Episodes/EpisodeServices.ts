import { Episode } from "index";
const fetch = require('node-fetch');


export default class EpisodeService {
    episodesData: Episode[] | undefined;

    constructor() {
        this.episodesData = undefined;
    }
    getDefaultEpisodes(data: any) {
        let dataClean = undefined;
        if (data) {
            dataClean = data?.data?.map((e: Episode) => this.episodeMapData(e))

            this.episodesData = data ?? undefined;
        }
        return dataClean;
    }
    fetchEpisodesData(id: number | string) {
        return new Promise<any>
            ((resolve) => {
                const response = fetch(`https://kitsu.io/api/edge/anime/${id}/episodes`, {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/vnd.api+json' }
                });

                return resolve(response);
            })
    }
    async getEpisodesByAnimeId(id_anime: number | string) {
        const response = await fetch(`https://kitsu.io/api/edge/anime/${id_anime}/episodes`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/vnd.api+json' }
        });
        const dataEpisode = await response.json();
        // asign to a episodes Complete data to interact whit the associate data in other calls

        if (response.ok) {

            const data = dataEpisode?.data?.map((e: Episode) => this.episodeMapData(e));

            this.episodesData = dataEpisode;

            return data;
        } else {
            console.log("fetch error!", response);
            return { response }
        }
    }
    episodeMapData(data: Episode) {
        const { id, attributes } = data
        return {
            id, attributes
        }
    }
}