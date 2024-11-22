import { FastifyReply, FastifyRequest } from "fastify";
import { z } from 'zod'
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient()


export async function changeTask(request:FastifyRequest, reply: FastifyReply) {
    const changeParamsSchema = z.object({
        id: z.string().uuid('The provided ID is not a valid UUID')
    })

    const changeBodySchema = z.object({
        title: z.string().optional(),
        cost: z
        .string()
        .transform((value) => parseFloat(value.replace(",", ".")))
        .refine((value) => !isNaN(value), { message: "Invalid number format" }).optional(),
        deadline: z
        .string()
        .transform((value) => new Date(value.replace(/(\d{2})-(\d{2})-(\d{4})/, "$3-$2-$1")))
        .refine((value) => !isNaN(value.getTime()), { message: "Invalid date format" }).optional()
    })

    try {
      
    const { id } = changeParamsSchema.parse(request.params)
    const { title, cost, deadline } = changeBodySchema.parse(request.body)

    const taskExists = await prisma.task.findUnique({
    where: {id}
    })

    if(!taskExists){
        return reply.status(404).send({message: 'Task not found'})
    }

    const updateTask = await prisma.task.update({
        where: { id },
        data: {
            title,
            cost,
            deadline,
        }
    })

    reply.status(200).send({ message: 'Task updated successfully', task: updateTask})

    } catch (error) {
        if(error instanceof z.ZodError){
           return reply.status(400).send({
            message: 'Validation Error',
            errors: error.errors,
           })
        }
        return reply.status(500).send({
            message: "Internal server error",
        });
    }
}