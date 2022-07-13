import Joi from 'joi';

const id = Joi.number().integer();
const attributes = Joi.object({
    description: Joi.string(),
    canonicalTitle: Joi.string(),
    number: Joi.number(),
    thumbnail: Joi.any(),
});

const createEpisodeSchema = Joi.object({
    id: id.required(),
    attributes: attributes.required(),
});

const updateEpisodeSchema = Joi.object({
    id: id.required(),
    attributes: attributes.required(),
});

const getEpisodeSchema = Joi.object({
    id: id.required(),
});

export { createEpisodeSchema, updateEpisodeSchema, getEpisodeSchema }