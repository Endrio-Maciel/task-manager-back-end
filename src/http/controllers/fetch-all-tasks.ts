import { FastifyReply, FastifyRequest } from "fastify";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient()

export async function fetchAllTasks(request:FastifyRequest, reply: FastifyReply) {
    
    try {
        const tasks = await prisma.task.findMany({
            orderBy: { order: 'asc'}
        })
        return reply.status(200).send({ tasks })
        
    } catch (error) {
        return reply.status(500).send({error: 'An error occurred while fetching tasks.' })
    }

}