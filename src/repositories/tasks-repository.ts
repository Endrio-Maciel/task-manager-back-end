import { Prisma, Task } from "@prisma/client"

export interface TasksRepository {
    findById (id: string): Promise<Task | null> 

    create(data: Prisma.TaskCreateInput) : Promise<Task> 
    
    update(id: string, data: Partial<Prisma.TaskUpdateInput> ): Promise<Task>

    findLastTask(): Promise<Task | null>

    findAllOrdered(): Promise<Task[]>

    delete(id: string): Promise<void>

    findTaskAbove(taskId: string): Promise<void> 

    findtaskBelow(taskId: string): Promise<void> 
}   