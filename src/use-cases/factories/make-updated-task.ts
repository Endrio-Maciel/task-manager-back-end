import { PrismaTasksRepository } from "../../repositories/prisma/prisma-tasks-repository";
import { UpdatedTaskUseCase } from "../updated-task";

export function makeUpdatedTasksUseCase(){
    const tasksRepository = new PrismaTasksRepository()
    const useCase = new UpdatedTaskUseCase(tasksRepository)

    return useCase
}