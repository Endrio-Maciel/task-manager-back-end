"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTask = deleteTask;
const zod_1 = require("zod");
const make_delete_task_1 = require("../../use-cases/factories/make-delete-task");
async function deleteTask(request, reply) {
    const deleteParamsSchema = zod_1.z.object({
        id: zod_1.z.string().uuid('The provided ID is not a valid UUID')
    });
    const { id } = deleteParamsSchema.parse(request.params);
    const deleteTaskUseCase = (0, make_delete_task_1.makeDeleteTaskUseCase)();
    try {
        await deleteTaskUseCase.execute({ id });
        return reply.status(200).send({ message: "Task deleted successfully" });
    }
    catch (error) {
        return reply.status(400).send({ error });
    }
}
