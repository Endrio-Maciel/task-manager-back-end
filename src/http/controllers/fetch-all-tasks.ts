import { FastifyReply, FastifyRequest } from "fastify";
import { makeFetchAllTasksUseCase } from "../../use-cases/factories/make-fetch-all-tasks";

export async function fetchAllTasks(request:FastifyRequest, reply: FastifyReply) {
    
    const getAllTasks = makeFetchAllTasksUseCase()

    const { tasks } = await getAllTasks.execute()

    return reply.status(200).send({
        tasks
    })
}