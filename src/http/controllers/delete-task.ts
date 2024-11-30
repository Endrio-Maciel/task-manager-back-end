import { FastifyReply, FastifyRequest } from "fastify";
import { z } from 'zod'
import { makeDeleteTaskUseCase } from "../../use-cases/factories/make-delete-task";

export async function deleteTask(request:FastifyRequest, reply: FastifyReply) {
    
    const deleteParamsSchema = z.object({
        id: z.string().uuid('The provided ID is not a valid UUID')
    })

    const { id } = deleteParamsSchema.parse(request.params)
    
    const deleteTaskUseCase = makeDeleteTaskUseCase()

   try {
    await deleteTaskUseCase.execute( {id} )
    return reply.status(200).send({ message: "Task deleted successfully"})
   } catch (error) {
    return reply.status(400).send({ error })
  
    }  
}