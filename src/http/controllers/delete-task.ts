import { PrismaClient } from "@prisma/client";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from 'zod'

const prisma = new PrismaClient()

export async function deleteTask(request:FastifyRequest, reply: FastifyReply) {
    
    const deleteParamsSchema = z.object({
        id: z.string().uuid('The provided ID is not a valid UUID')
    })

    const parseResult = deleteParamsSchema.safeParse(request.params)
    if(parseResult.success === false){
        return reply.status(400).send({ error: parseResult.error.errors })
    }

    const { id } = parseResult.data

    try {
        const task = await prisma.task.findUnique({
            where: { id }
        })

        if (!task){
            return reply.status(404).send({ error: 'Task not found.' })
        }
        
        await prisma.task.delete({
            where: { id }
        })

        const tasks = await prisma.task.findMany({
            orderBy: { order: 'asc' }
        })

        await prisma.$transaction(async (prisma) => {
        for (let i = 0; i < tasks.length; i++) {
            await prisma.task.update({
                where: {id: tasks[i].id }, 
                data: { order: i + 1}
            })
        }      
        })
        reply.status(200).send({message: 'Task deleted sucessfully'})
    } catch (error) {
        reply.status(500).send({ message: 'Error deleting task.' })
    }
}