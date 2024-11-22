import { FastifyReply, FastifyRequest } from "fastify";
import { z } from 'zod'
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient()


export async function moveUpTask(request: FastifyRequest, reply: FastifyReply) {

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
    
    const minOrderTask = await prisma.task.findFirst({
        orderBy: {order: 'asc' }
    })
    if (task.order === minOrderTask?.order){
        return reply.status(400).send({error:'This task is already the first.'})
    }

    const upperTask = await prisma.task.findFirst({
        where: { order: {lt: task.order}} , 
        orderBy: {order: 'desc'}
    })

    if(upperTask) {
        
        await prisma.$transaction(async (prisma)=> {
        
        await prisma.task.update({
            where: {id: task.id},
            data: {order: -1}
        })
        await prisma.task.update({
            where: { id: upperTask.id },
            data: {order: task.order}
        })
        await prisma.task.update({
            where: {id: task.id},
            data: {order: upperTask.order}
        })
    })
        reply.send({message: 'Task moved up successfully.'})
    }
    } catch (error) {
        reply.status(500).send({ message: 'Error moving task up.'})
    }

}