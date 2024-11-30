"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdatedTaskUseCase = void 0;
class UpdatedTaskUseCase {
    constructor(tasksRepository) {
        this.tasksRepository = tasksRepository;
    }
    async execute({ id, title, cost, deadline, order, }) {
        if (!id) {
            throw new Error('Task ID is required');
        }
        const existingTask = await this.tasksRepository.findById(id);
        if (!existingTask) {
            throw new Error('Task not found');
        }
        const updatedTask = await this.tasksRepository.update(id, {
            title,
            cost,
            deadline,
            order,
        });
        return { task: updatedTask };
    }
}
exports.UpdatedTaskUseCase = UpdatedTaskUseCase;
