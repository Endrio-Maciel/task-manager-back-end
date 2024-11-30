"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FetchAllTasksUseCase = void 0;
class FetchAllTasksUseCase {
    constructor(tasksRepository) {
        this.tasksRepository = tasksRepository;
    }
    async execute() {
        const tasks = await this.tasksRepository.findAllOrdered();
        return {
            tasks,
        };
    }
}
exports.FetchAllTasksUseCase = FetchAllTasksUseCase;
