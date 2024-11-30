"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const fastify_1 = __importDefault(require("fastify"));
const routes_1 = require("./http/routes");
const cors_1 = __importDefault(require("@fastify/cors"));
const cookie_1 = require("@fastify/cookie");
exports.app = (0, fastify_1.default)();
exports.app.register(cors_1.default, {
    origin: 'http://localhost:5173',
});
exports.app.register(cookie_1.fastifyCookie);
exports.app.register(routes_1.appRoutes);
