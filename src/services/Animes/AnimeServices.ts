import animes from "./Animes.json"
import { Anime } from "../../../index";

const fetch = require('node-fetch');
const boom = require('@hapi/boom');

export default class AnimeService {
    animesData: Anime[];
    animeSelected: Anime | undefined;

    constructor() {
        this.animesData = animes as unknown as Anime[];
        this.animeSelected = undefined;
    }
    getAnimesAllData() {
        const timeout = 200;
        return new Promise<
            any>((resolve) => {
                setTimeout(() => {
                    const data = this.animesData?.map(({ id, attributes }) => { return { id, attributes } });

                    return resolve(data);
                }, timeout);
            })
    }
    async getAnimeById(id_anime: number | string) {

        const anime: Anime | undefined = this.animesData?.find(({ id }: { id: any }) => id === +id_anime);

        if (!anime) {

            const response = await fetch(`https://kitsu.io/api/edge/anime/${id_anime}`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/vnd.api+json' }
            });

            const dataAnime = await response.json();
            // asign to a episodes Complete data to interact whit the associate data in other calls

            if (response.ok) {

                const { data } = dataAnime

                const dataMaped = this.animeMapData(data);

                /* const data = dataAnime?.data?.map((a: Anime) => this.animeMapData(a)); */

                this.animeSelected = dataAnime;

                return dataMaped;
            } else {
                const error = new Error('Unexpected input');
                throw boom.badRequest(error);
            }
        } else {
            this.animeSelected = anime;
        }

        return this.animeSelected;
    }
    animeMapData(data: Anime) {
        const { id, attributes } = data
        return {
            id, attributes
        }
    }
}

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