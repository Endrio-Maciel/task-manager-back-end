import { FastifyReply, FastifyRequest } from "fastify";
import { z } from 'zod'
import { makeCreateTaskUseCase } from "../../use-cases/factories/make-create-task";

export async function createTask(request: FastifyRequest, reply: FastifyReply) {

    const registerBodyTaskSchema = z.object({
        title: z.string(),
        cost: z.number().positive(),
        deadline: z.string().transform((value) => new Date(value)).refine((value) => !isNaN(value.getTime()), {
            message: "Invalid date format",
        }),
    })

    const { title, cost , deadline } = registerBodyTaskSchema.parse(request.body)

    try {
        const createTaskUseCase = makeCreateTaskUseCase()

        const task = await createTaskUseCase.execute({
            title,
            cost,
            deadline
        })

        return reply.status(201).send({ task })
    } catch (error) {
        throw error
    }
}