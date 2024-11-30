"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MoveTaskUpUseCase = void 0;
class MoveTaskUpUseCase {
    constructor(tasksRepository) {
        this.tasksRepository = tasksRepository;
    }
    async execute({ taskId }) {
        const task = await this.tasksRepository.findById(taskId);
        if (!task) {
            throw new Error('Task not found');
        }
        await this.tasksRepository.findTaskAbove(taskId);
    }
}
exports.MoveTaskUpUseCase = MoveTaskUpUseCase;
