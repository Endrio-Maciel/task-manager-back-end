"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.appRoutes = appRoutes;
const create_task_1 = require("./controllers/create-task");
const fetch_all_tasks_1 = require("./controllers/fetch-all-tasks");
const move_task_up_1 = require("./controllers/move-task-up");
const move_task_down_1 = require("./controllers/move-task-down");
const delete_task_1 = require("./controllers/delete-task");
const updated_task_1 = require("./controllers/updated-task");
async function appRoutes(app) {
    app.post('/tasks/create-task', create_task_1.createTask);
    app.patch('/task/:id', updated_task_1.updatedTask);
    app.get('/tasks', fetch_all_tasks_1.fetchAllTasks);
    app.patch('/tasks/:id/up', move_task_up_1.moveUpTask);
    app.patch('/tasks/:id/down', move_task_down_1.moveDownTask);
    app.delete('/tasks/delete/:id', delete_task_1.deleteTask);
}
