import { TasksRepository } from "../repositories/tasks-repository";

interface moveTaskDownUseCaseRequest {
    taskId: string
}

export class MoveTaskDownUseCase {
    constructor(
        private tasksRepository: TasksRepository,
    ) {}

    async execute({ taskId }: moveTaskDownUseCaseRequest) : Promise<void> {
        const task = await this.tasksRepository.findById(taskId)
        if (!task) {
            throw new Error('Task not found')
        }

        await this.tasksRepository.findtaskBelow(taskId)
     
    }
}