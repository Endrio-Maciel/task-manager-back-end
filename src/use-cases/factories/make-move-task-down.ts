import { PrismaTasksRepository } from "../../repositories/prisma/prisma-tasks-repository";
import { MoveTaskDownUseCase } from "../move-task-down";

export function makeMoveTaskDownUseCase(){
    const tasksRepository = new PrismaTasksRepository()
    const useCase = new MoveTaskDownUseCase(tasksRepository)

    return useCase
}