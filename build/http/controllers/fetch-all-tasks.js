"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchAllTasks = fetchAllTasks;
const make_fetch_all_tasks_1 = require("../../use-cases/factories/make-fetch-all-tasks");
async function fetchAllTasks(request, reply) {
    const getAllTasks = (0, make_fetch_all_tasks_1.makeFetchAllTasksUseCase)();
    const { tasks } = await getAllTasks.execute();
    return reply.status(200).send({
        tasks
    });
}
