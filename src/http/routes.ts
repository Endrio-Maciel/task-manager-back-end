import { FastifyInstance } from "fastify";
import { createTask } from "./controllers/create-task";
import { fetchAllTasks } from "./controllers/fetch-all-tasks";
import { moveUpTask } from "./controllers/move-task-up";
import { moveDownTask } from "./controllers/move-task-down";
import { deleteTask } from "./controllers/delete-task";
import { changeTask } from "./controllers/change-task";

export async function appRoutes(app:FastifyInstance) {

    app.post('/tasks/create-task', createTask)  
    app.post('/task/:id', changeTask )
    app.get('/tasks', fetchAllTasks)
    app.patch('/tasks/:id/up' , moveUpTask )
    app.patch('/tasks/:id/down', moveDownTask)
    app.delete('/tasks/delete/:id', deleteTask)

    
}