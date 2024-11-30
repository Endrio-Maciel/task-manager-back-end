import { TasksRepository } from "../repositories/tasks-repository";

interface deleteTaskUseCaseRequest {
    id: string
}

export class DeleteTaskUseCase {
    constructor(
        private tasksRepository: TasksRepository,
    ) {}

    async execute({ id }: deleteTaskUseCaseRequest) : Promise<void> {
        
        if(!id){
            throw new Error('Task not found')
        }
        await this.tasksRepository.delete(id)
        
    }
}