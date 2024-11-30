import { FastifyReply, FastifyRequest } from "fastify";
import { z } from 'zod'
import { makeMoveTaskUpUseCase } from "../../use-cases/factories/make-move-task-up";

export async function moveUpTask(request: FastifyRequest, reply: FastifyReply) {

    const createParamsSchema = z.object({
        id: z.string().uuid('The provided ID is not a valid UUID')
    })
    try {
        const { id } = createParamsSchema.parse(request.params)

        const moveTaskUpUseCase = makeMoveTaskUpUseCase();
        await moveTaskUpUseCase.execute({ taskId: id });
        
        return reply.status(200).send({ message: "Task moved down successfully." });
    } catch (err) {
        reply.status(500).send({ message: 'Error moving task up.'})
    }
}