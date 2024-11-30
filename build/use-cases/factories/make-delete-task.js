"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeDeleteTaskUseCase = makeDeleteTaskUseCase;
const prisma_tasks_repository_1 = require("../../repositories/prisma/prisma-tasks-repository");
const delete_task_1 = require("../delete-task");
function makeDeleteTaskUseCase() {
    const tasksRepository = new prisma_tasks_repository_1.PrismaTasksRepository();
    const useCase = new delete_task_1.DeleteTaskUseCase(tasksRepository);
    return useCase;
}
