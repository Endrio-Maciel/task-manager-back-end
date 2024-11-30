import { Task } from "@prisma/client";
import { TasksRepository } from "../repositories/tasks-repository";

interface UpdatedTaskUseCaseRequest {
    id: string
    title?: string 
    cost?: number
    deadline?: Date
    order?: number
}

interface UpdatedTaskUseCaseResponse {
    task: Task
}

export class UpdatedTaskUseCase {
    constructor(
        private tasksRepository: TasksRepository,
    ) {}

    async execute({
        id,
        title,
        cost,
        deadline,
        order,
    }: UpdatedTaskUseCaseRequest) : Promise<UpdatedTaskUseCaseResponse> {
        
        if(!id){
            throw new Error('Task ID is required')
        }
        
        const existingTask = await this.tasksRepository.findById(id)
        if(!existingTask){
            throw new Error('Task not found')
        }
        
        const updatedTask = await this.tasksRepository.update(id,{
            title,
            cost,
            deadline,
            order,
        })
        return{ task: updatedTask}
    }
}