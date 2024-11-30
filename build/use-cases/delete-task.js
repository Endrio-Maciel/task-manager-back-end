"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteTaskUseCase = void 0;
class DeleteTaskUseCase {
    constructor(tasksRepository) {
        this.tasksRepository = tasksRepository;
    }
    async execute({ id }) {
        if (!id) {
            throw new Error('Task not found');
        }
        await this.tasksRepository.delete(id);
    }
}
exports.DeleteTaskUseCase = DeleteTaskUseCase;
