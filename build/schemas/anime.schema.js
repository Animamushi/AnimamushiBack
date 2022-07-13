"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAnimeSchema = exports.updateAnimeSchema = exports.createAnimeSchema = void 0;
const joi_1 = __importDefault(require("joi"));
const id = joi_1.default.number().integer();
const attributes = joi_1.default.object({
    description: joi_1.default.string(),
    titles: joi_1.default.any(),
    canonicalTitle: joi_1.default.string(),
    averageRating: joi_1.default.number(),
    status: joi_1.default.string(),
    posterImage: joi_1.default.any(),
    coverImage: joi_1.default.any(),
    episodeCount: joi_1.default.string()
});
const createAnimeSchema = joi_1.default.object({
    id: id.required(),
    attributes: attributes.required(),
});
exports.createAnimeSchema = createAnimeSchema;
const updateAnimeSchema = joi_1.default.object({
    id: id.required(),
    attributes: attributes.required(),
});
exports.updateAnimeSchema = updateAnimeSchema;
const getAnimeSchema = joi_1.default.object({
    id: id.required(),
});
exports.getAnimeSchema = getAnimeSchema;
