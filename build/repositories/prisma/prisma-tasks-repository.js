"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrismaTasksRepository = void 0;
const prisma_1 = require("../../lib/prisma");
class PrismaTasksRepository {
    async findById(id) {
        const task = await prisma_1.prisma.task.findUnique({
            where: {
                id,
            }
        });
        return task;
    }
    async create(data) {
        return await prisma_1.prisma.task.create({
            data,
        });
    }
    async findAllOrdered() {
        return await prisma_1.prisma.task.findMany({
            orderBy: {
                order: 'asc'
            }
        });
    }
    async update(id, data) {
        return await prisma_1.prisma.task.update({
            where: { id },
            data
        });
    }
    async findLastTask() {
        return await prisma_1.prisma.task.findFirst({
            orderBy: {
                order: 'desc',
            }
        });
    }
    async delete(id) {
        const taskToDelete = await prisma_1.prisma.task.findUnique({
            where: { id }
        });
        if (!taskToDelete) {
            throw new Error("Task not found");
        }
        await prisma_1.prisma.task.delete({
            where: { id }
        });
        await prisma_1.prisma.task.updateMany({
            where: {
                order: {
                    gt: taskToDelete.order,
                },
            },
            data: {
                order: { decrement: 1 }
            }
        });
    }
    async findTaskAbove(taskId) {
        const task = await prisma_1.prisma.task.findUnique({
            where: { id: taskId }
        });
        if (!task) {
            throw Error('Task not found.');
        }
        const minOrderTask = await prisma_1.prisma.task.findFirst({
            orderBy: { order: 'asc' }
        });
        if (task.order === minOrderTask?.order) {
            throw Error('This task is already the firts one.');
        }
        const taskAbove = await prisma_1.prisma.task.findFirst({
            where: { order: { lt: task.order } },
            orderBy: { order: 'desc' }
        });
        if (!taskAbove) {
            throw new Error('No task above found');
        }
        try {
            await prisma_1.prisma.$transaction(async (prisma) => {
                const tempOrder = taskAbove.order - 1;
                await prisma.task.update({
                    where: { id: task.id },
                    data: { order: tempOrder }
                });
                await prisma.task.update({
                    where: { id: taskAbove.id },
                    data: { order: task.order }
                });
                await prisma.task.update({
                    where: { id: task.id },
                    data: { order: taskAbove.order }
                });
            });
        }
        catch (error) {
            throw new Error('Faleid to move task.');
        }
    }
    async findtaskBelow(taskId) {
        const task = await prisma_1.prisma.task.findUnique({
            where: { id: taskId }
        });
        if (!task) {
            throw Error('Task not found.');
        }
        const maxOrderTask = await prisma_1.prisma.task.findFirst({
            orderBy: { order: 'desc' }
        });
        if (task.order === maxOrderTask?.order) {
            throw Error('This task is already the last.');
        }
        const lowerTask = await prisma_1.prisma.task.findFirst({
            where: { order: { gt: task.order } },
            orderBy: { order: 'asc' }
        });
        if (lowerTask) {
            await prisma_1.prisma.$transaction(async (prisma) => {
                await prisma.task.update({
                    where: { id: task.id },
                    data: { order: -1 }
                });
                await prisma.task.update({
                    where: { id: lowerTask.id },
                    data: { order: task.order }
                });
                await prisma.task.update({
                    where: { id: task.id },
                    data: { order: lowerTask.order }
                });
            });
        }
    }
}
exports.PrismaTasksRepository = PrismaTasksRepository;
