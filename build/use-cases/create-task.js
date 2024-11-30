"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateTaskUseCase = void 0;
const prisma_1 = require("../lib/prisma");
class CreateTaskUseCase {
    constructor(tasksRepository) {
        this.tasksRepository = tasksRepository;
    }
    async execute({ title, cost, deadline, }) {
        const lastOrder = await prisma_1.prisma.task.findFirst({
            orderBy: { order: 'desc' }
        });
        const newOrder = lastOrder ? lastOrder.order + 1 : 1;
        const task = await this.tasksRepository.create({
            title,
            cost,
            deadline,
            order: newOrder
        });
        return { task };
    }
}
exports.CreateTaskUseCase = CreateTaskUseCase;
