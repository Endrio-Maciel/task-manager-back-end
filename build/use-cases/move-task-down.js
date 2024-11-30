"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MoveTaskDownUseCase = void 0;
class MoveTaskDownUseCase {
    constructor(tasksRepository) {
        this.tasksRepository = tasksRepository;
    }
    async execute({ taskId }) {
        const task = await this.tasksRepository.findById(taskId);
        if (!task) {
            throw new Error('Task not found');
        }
        await this.tasksRepository.findtaskBelow(taskId);
    }
}
exports.MoveTaskDownUseCase = MoveTaskDownUseCase;
