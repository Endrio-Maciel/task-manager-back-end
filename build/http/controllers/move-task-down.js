"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.moveDownTask = moveDownTask;
const zod_1 = require("zod");
const make_move_task_down_1 = require("../../use-cases/factories/make-move-task-down");
async function moveDownTask(request, reply) {
    const createParamsSchema = zod_1.z.object({
        id: zod_1.z.string().uuid('The provided ID is not a valid UUID')
    });
    try {
        const { id } = createParamsSchema.parse(request.params);
        const moveTaskDownUseCase = (0, make_move_task_down_1.makeMoveTaskDownUseCase)();
        await moveTaskDownUseCase.execute({ taskId: id });
        return reply.status(200).send({ message: 'Task moved down successfully.' });
    }
    catch (error) {
        reply.status(500).send({ message: 'Error moving task down.' });
    }
}
