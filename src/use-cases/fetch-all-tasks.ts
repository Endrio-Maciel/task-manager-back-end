import { Task } from "@prisma/client";
import { TasksRepository } from "../repositories/tasks-repository";

interface FetchAllTasksUseCaseReply {
    tasks: Task[] | []
}

export class FetchAllTasksUseCase {
    constructor(
        private tasksRepository: TasksRepository,
    ) {}

    async execute(): Promise<FetchAllTasksUseCaseReply> {
        const tasks = await this.tasksRepository.findAllOrdered()
       
        return {
            tasks,
        }
    }

}