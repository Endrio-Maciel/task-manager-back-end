import { TasksRepository } from "../repositories/tasks-repository";

interface moveTaskUpUseCaseRequest {
    taskId: string
}

export class MoveTaskUpUseCase {
    constructor(
        private tasksRepository: TasksRepository,
    ) {}

    async execute({ taskId }: moveTaskUpUseCaseRequest) : Promise<void> {
        const task = await this.tasksRepository.findById(taskId)
        if (!task) {
            throw new Error('Task not found')
        }

        await this.tasksRepository.findTaskAbove(taskId);
     
    }
}