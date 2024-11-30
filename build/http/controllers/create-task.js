"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTask = createTask;
const zod_1 = require("zod");
const make_create_task_1 = require("../../use-cases/factories/make-create-task");
async function createTask(request, reply) {
    const registerBodyTaskSchema = zod_1.z.object({
        title: zod_1.z.string(),
        cost: zod_1.z.number().positive(),
        deadline: zod_1.z.string().transform((value) => new Date(value)).refine((value) => !isNaN(value.getTime()), {
            message: "Invalid date format",
        }),
    });
    const { title, cost, deadline } = registerBodyTaskSchema.parse(request.body);
    try {
        const createTaskUseCase = (0, make_create_task_1.makeCreateTaskUseCase)();
        const task = await createTaskUseCase.execute({
            title,
            cost,
            deadline
        });
        return reply.status(201).send({ task });
    }
    catch (error) {
        throw error;
    }
}
