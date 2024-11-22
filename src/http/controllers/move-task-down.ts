import { FastifyReply, FastifyRequest } from "fastify";
import { PrismaClient } from "@prisma/client";
import { z } from 'zod'
const prisma = new PrismaClient()

export async function moveDownTask(request:FastifyRequest, reply: FastifyReply) {
    const createParamsSchema = z.object({
        id: z.string().uuid('The provided ID is not a valid UUID')
    })
    const  parseResult =  createParamsSchema.safeParse(request.params)
    if(parseResult.success === false){
        return reply.status(400).send({ error: parseResult.error.errors });
    }  
    const { id } = parseResult.data
    
    try {
    const task = await prisma.task.findUnique({
        where: { id }
    })
    if(!task){
        return reply.status(404).send({ error: 'Task not found.' })
    }
    
    const maxOrderTask = await prisma.task.findFirst({
        orderBy: {order: 'desc' }
    })
    if (task.order === maxOrderTask?.order){
        return reply.status(400).send({error:'This task is already the last.'})
    }

    const lowerTask = await prisma.task.findFirst({
        where: { order: {gt: task.order}} , 
        orderBy: {order: 'asc'}
    })

    if(lowerTask) {
        await prisma.$transaction(async (prisma)=> {
        
        await prisma.task.update({
            where: {id: task.id},
            data: {order: -1}
        })
        await prisma.task.update({
            where: { id: lowerTask.id },
            data: {order: task.order}
        })
        await prisma.task.update({
            where: {id: task.id},
            data: {order: lowerTask.order}
        })
    })
        reply.send({message: 'Task moved down successfully.'})
    }
    } catch (error) {
        reply.status(500).send({ message: 'Error moving task down.'})
    }
}