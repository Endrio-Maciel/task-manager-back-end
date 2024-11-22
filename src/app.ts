import fastify from "fastify";
import { appRoutes } from "./http/routes";
import fastifyJwt from "@fastify/jwt";
import { env } from "./env";
import { fastifyCookie } from "@fastify/cookie";

export const app = fastify()

app.register(fastifyJwt, {
    secret: env.JWT_SECRET,
})

app.register(fastifyCookie)
app.register(appRoutes)
