"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatedTask = updatedTask;
const zod_1 = require("zod");
const make_updated_task_1 = require("../../use-cases/factories/make-updated-task");
async function updatedTask(request, reply) {
    const updatedParamsSchema = zod_1.z.object({
        id: zod_1.z.string().uuid('The provided ID is not a valid UUID')
    });
    const updatedBodySchema = zod_1.z.object({
        title: zod_1.z.string().optional(),
        cost: zod_1.z
            .string()
            .transform((value) => parseFloat(value.replace(",", ".")))
            .refine((value) => !isNaN(value), { message: "Invalid number format" }).optional(),
        deadline: zod_1.z
            .string()
            .transform((value) => new Date(value.replace(/(\d{2})-(\d{2})-(\d{4})/, "$3-$2-$1")))
            .refine((value) => !isNaN(value.getTime()), { message: "Invalid date format" }).optional()
    });
    const { title, cost, deadline, } = updatedBodySchema.parse(request.body);
    const { id } = updatedParamsSchema.parse(request.params);
    const updatedTaskUseCase = (0, make_updated_task_1.makeUpdatedTasksUseCase)();
    try {
        const updatedTask = updatedTaskUseCase.execute({
            id,
            title,
            cost,
            deadline,
        });
        return reply.status(200).send({ updatedTask });
    }
    catch (error) {
    }
}
