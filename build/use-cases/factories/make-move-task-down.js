"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeMoveTaskDownUseCase = makeMoveTaskDownUseCase;
const prisma_tasks_repository_1 = require("../../repositories/prisma/prisma-tasks-repository");
const move_task_down_1 = require("../move-task-down");
function makeMoveTaskDownUseCase() {
    const tasksRepository = new prisma_tasks_repository_1.PrismaTasksRepository();
    const useCase = new move_task_down_1.MoveTaskDownUseCase(tasksRepository);
    return useCase;
}
