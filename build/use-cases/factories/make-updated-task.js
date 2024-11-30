"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeUpdatedTasksUseCase = makeUpdatedTasksUseCase;
const prisma_tasks_repository_1 = require("../../repositories/prisma/prisma-tasks-repository");
const updated_task_1 = require("../updated-task");
function makeUpdatedTasksUseCase() {
    const tasksRepository = new prisma_tasks_repository_1.PrismaTasksRepository();
    const useCase = new updated_task_1.UpdatedTaskUseCase(tasksRepository);
    return useCase;
}
