"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeMoveTaskUpUseCase = makeMoveTaskUpUseCase;
const prisma_tasks_repository_1 = require("../../repositories/prisma/prisma-tasks-repository");
const move_task_up_1 = require("../move-task-up");
function makeMoveTaskUpUseCase() {
    const tasksRepository = new prisma_tasks_repository_1.PrismaTasksRepository();
    const useCase = new move_task_up_1.MoveTaskUpUseCase(tasksRepository);
    return useCase;
}
