import { PrismaTasksRepository } from "../../repositories/prisma/prisma-tasks-repository";
import { MoveTaskUpUseCase } from "../move-task-up";

export function makeMoveTaskUpUseCase(){
    const tasksRepository = new PrismaTasksRepository()
    const useCase = new MoveTaskUpUseCase(tasksRepository)

    return useCase
}