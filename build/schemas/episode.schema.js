"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEpisodeSchema = exports.updateEpisodeSchema = exports.createEpisodeSchema = void 0;
const joi_1 = __importDefault(require("joi"));
const id = joi_1.default.number().integer();
const attributes = joi_1.default.object({
    description: joi_1.default.string(),
    canonicalTitle: joi_1.default.string(),
    number: joi_1.default.number(),
    thumbnail: joi_1.default.any(),
});
const createEpisodeSchema = joi_1.default.object({
    id: id.required(),
    attributes: attributes.required(),
});
exports.createEpisodeSchema = createEpisodeSchema;
const updateEpisodeSchema = joi_1.default.object({
    id: id.required(),
    attributes: attributes.required(),
});
exports.updateEpisodeSchema = updateEpisodeSchema;
const getEpisodeSchema = joi_1.default.object({
    id: id.required(),
});
exports.getEpisodeSchema = getEpisodeSchema;
