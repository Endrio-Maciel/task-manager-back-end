import { PrismaClient } from "@prisma/client";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from 'zod'
const prisma = new PrismaClient()

export async function createTask(request: FastifyRequest, reply: FastifyReply) {
 
    const registerBodyTaskSchema = z.object({
        title: z.string(),
        cost: z
        .string()
        .transform((value) => parseFloat(value.replace(",", ".")))
        .refine((value) => !isNaN(value), { message: "Invalid number format" }),
        deadline: z
        .string()
        .transform((value) => new Date(value.replace(/(\d{2})-(\d{2})-(\d{4})/, "$3-$2-$1")))
        .refine((value) => !isNaN(value.getTime()), { message: "Invalid date format" })
    })

    const { title, cost , deadline } = registerBodyTaskSchema.parse(request.body)


    

    const existingTask = await prisma.task.findUnique({
        where: { title }
    })
    if (existingTask) return reply.status(400).send({ message: 'Task already exists.'})
    
    const lastOrder = await prisma.task.findFirst({
        orderBy: {order: 'desc'}
    })

    const newOrder = lastOrder ? lastOrder.order + 1 : 1

    const task = await prisma.task.create({
        data: {
            title: title,
            cost: cost,
            deadline: new Date(deadline),
            order: newOrder,
         }
    })

    reply.status(201).send({ task })
}