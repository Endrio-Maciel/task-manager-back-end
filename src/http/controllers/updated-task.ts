import { FastifyReply, FastifyRequest } from "fastify";
import { z } from 'zod'
import { makeUpdatedTasksUseCase } from "../../use-cases/factories/make-updated-task";
import { UpdatedTaskUseCase } from "../../use-cases/updated-task";

export async function updatedTask(request:FastifyRequest, reply: FastifyReply) {
    const updatedParamsSchema = z.object({
        id: z.string().uuid('The provided ID is not a valid UUID')
    })

    const updatedBodySchema = z.object({
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

    const {title, cost, deadline, } = updatedBodySchema.parse(request.body)
    const {id} = updatedParamsSchema.parse(request.params)

    const updatedTaskUseCase =  makeUpdatedTasksUseCase()

    try {
        const updatedTask = updatedTaskUseCase.execute({
            id,
            title,
            cost,
            deadline,
        })

        return reply.status(200).send({ updatedTask })
    } catch (error) {
        
    }

}