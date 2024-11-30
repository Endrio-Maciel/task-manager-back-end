import { FastifyReply, FastifyRequest } from "fastify";
import { z } from 'zod'
import { makeMoveTaskDownUseCase } from "../../use-cases/factories/make-move-task-down";

export async function moveDownTask(request:FastifyRequest, reply: FastifyReply) {
    const createParamsSchema = z.object({
        id: z.string().uuid('The provided ID is not a valid UUID')
    })
    try {
    
        const  { id } =  createParamsSchema.parse(request.params)

        const moveTaskDownUseCase = makeMoveTaskDownUseCase()
        await moveTaskDownUseCase.execute({taskId: id})

       return reply.status(200).send({message: 'Task moved down successfully.'})
    } catch (error) {
        reply.status(500).send({ message: 'Error moving task down.'})
    }
}