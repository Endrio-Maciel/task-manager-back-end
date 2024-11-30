import fastify from "fastify";
import { appRoutes } from "./http/routes";
import cors from "@fastify/cors";
import { fastifyCookie } from "@fastify/cookie";

export const app = fastify()

app.register(cors, {
    origin: 'http://localhost:5173',
})

app.register(fastifyCookie)
app.register(appRoutes)
