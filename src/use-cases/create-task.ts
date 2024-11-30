import { Task } from "@prisma/client";
import { TasksRepository } from "../repositories/tasks-repository";
import { prisma } from "../lib/prisma";

interface CreateTaskUseCaseRequest {
    title: string
    cost: number
    deadline: Date
}

interface CreateTaskUseCaseResponse {
    task: Task
}

export class CreateTaskUseCase {
    constructor(
        private tasksRepository: TasksRepository,
    ) {}

    async execute({
        title,
        cost,
        deadline,
    }: CreateTaskUseCaseRequest) : Promise<CreateTaskUseCaseResponse> {
       
        const lastOrder = await prisma.task.findFirst({
        orderBy: {order: 'desc'}
    })

    const newOrder = lastOrder ? lastOrder.order + 1 : 1
    
    const task = await this.tasksRepository.create({
        title,
        cost,
        deadline,
        order: newOrder
    })
    return {task}

    }

}