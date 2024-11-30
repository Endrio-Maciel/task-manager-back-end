"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeCreateTaskUseCase = makeCreateTaskUseCase;
const prisma_tasks_repository_1 = require("../../repositories/prisma/prisma-tasks-repository");
const create_task_1 = require("../create-task");
function makeCreateTaskUseCase() {
    const tasksRepository = new prisma_tasks_repository_1.PrismaTasksRepository();
    const useCase = new create_task_1.CreateTaskUseCase(tasksRepository);
    return useCase;
}
