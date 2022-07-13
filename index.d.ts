
export interface AnimeAllData {
    id: number,
    type: string,
    links: Object[],
    attributes: Partial<AttributesAnime>,
    relationships: Object[]
}
export interface Anime {
    id: number,
    attributes: Pick<AttributesAnime, "canonicalTitle" | "averageRating" | "status" | "posterImage" | "coverImage" | "episodeCount">,
    episodes: Pick<Episode>
}

export interface EpisodeAllData {
    id: number | string,
    type: string,
    links: Object[],
    attributes: Partial<AttributesEpisode>,
    relationships: Object[]
}
export interface Episode {
    id: number | string,
    attributes: Pick<AttributesEpisode, "description" | "number" | "thumbnail" | "canonicalTitle">
}
export interface AttributesEpisode {
    createdAt?: string,
    updatedAt?: string,
    synopsis: string,
    description: string,
    titles?: Partial<Record<k, t>>,
    canonicalTitle?: string,
    seasonNumber: number,
    number: number,
    relativeNumber: number,
    airdate: string,
    length: number,
    thumbnail?: Partial<Record<k, t>>
}
export interface AttributesAnime {
    createdAt: string,
    updatedAt: string,
    slug: string,
    synopsis: string,
    description: string,
    coverImageTopOffset: number,
    titles: Object,
    canonicalTitle: string,
    abbreviatedTitles: [],
    averageRating: string,
    ratingFrequencies: {},
    userCount?: number,
    favoritesCount?: number,
    startDate?: string,
    endDate?: null | string,
    nextRelease?: string,
    popularityRank?: number,
    ratingRank?: number,
    ageRating?: string,
    ageRatingGuide?: string,
    subtype?: string,
    status?: string,
    tba?: null | string,
    posterImage?: {} | any,
    coverImage?: {} | any,
    episodeCount?: number | 1179,
    episodeLength?: number,
    totalLength?: number,
    youtubeVideoId?: string,
    showType?: string,
    nsfw?: boolean
}

