"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.moveUpTask = moveUpTask;
const zod_1 = require("zod");
const make_move_task_up_1 = require("../../use-cases/factories/make-move-task-up");
async function moveUpTask(request, reply) {
    const createParamsSchema = zod_1.z.object({
        id: zod_1.z.string().uuid('The provided ID is not a valid UUID')
    });
    try {
        const { id } = createParamsSchema.parse(request.params);
        const moveTaskUpUseCase = (0, make_move_task_up_1.makeMoveTaskUpUseCase)();
        await moveTaskUpUseCase.execute({ taskId: id });
        return reply.status(200).send({ message: "Task moved down successfully." });
    }
    catch (err) {
        reply.status(500).send({ message: 'Error moving task up.' });
    }
}
