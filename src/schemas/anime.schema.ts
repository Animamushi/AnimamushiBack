import Joi from 'joi';

const id = Joi.number().integer();
const attributes = Joi.object({
    description: Joi.string(),
    titles: Joi.any(),
    canonicalTitle: Joi.string(),
    averageRating: Joi.number(),
    status: Joi.string(),
    posterImage: Joi.any(),
    coverImage: Joi.any(),
    episodeCount: Joi.string()
});

const createAnimeSchema = Joi.object({
    id: id.required(),
    attributes: attributes.required(),
});

const updateAnimeSchema = Joi.object({
    id: id.required(),
    attributes: attributes.required(),
});

const getAnimeSchema = Joi.object({
    id: id.required(),
});

export { createAnimeSchema, updateAnimeSchema, getAnimeSchema }