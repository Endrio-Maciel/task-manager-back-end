"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeFetchAllTasksUseCase = makeFetchAllTasksUseCase;
const prisma_tasks_repository_1 = require("../../repositories/prisma/prisma-tasks-repository");
const fetch_all_tasks_1 = require("../fetch-all-tasks");
function makeFetchAllTasksUseCase() {
    const tasksRepository = new prisma_tasks_repository_1.PrismaTasksRepository();
    const useCase = new fetch_all_tasks_1.FetchAllTasksUseCase(tasksRepository);
    return useCase;
}
