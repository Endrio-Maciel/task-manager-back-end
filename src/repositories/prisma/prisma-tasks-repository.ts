import { Prisma, Task } from "@prisma/client";
import { prisma } from "../../lib/prisma";
import { TasksRepository } from "../tasks-repository";

export class PrismaTasksRepository implements TasksRepository {
    
    async findById(id: string): Promise<Task | null> {
        const task = await prisma.task.findUnique({
            where: {
                id,
            }
        })
        return task
    }

    async create(data: Prisma.TaskCreateInput): Promise<Task> {
        return await prisma.task.create({
            data,
        })
    }

    async findAllOrdered(): Promise<Task[] > {
        return await prisma.task.findMany({
            orderBy: {
                order: 'asc'
            }
        })
    }

    async update(id: string, data: Partial<Prisma.TaskUpdateInput>): Promise<Task> {
        return await prisma.task.update({
            where: { id },
            data
        })
    }

    async findLastTask(): Promise<Task | null>{
        return await prisma.task.findFirst({
            orderBy: {
                order: 'desc',
            }
        })
    }

    async delete(id: string): Promise<void> {
        const taskToDelete = await prisma.task.findUnique({
            where: { id }
        })
        if(!taskToDelete){
            throw new Error ("Task not found")
        }
        await prisma.task.delete({
            where: { id }
        })
        
        await prisma.task.updateMany({
            where: {
                order: {
                    gt: taskToDelete.order,
                },
            },
            data: {
                order: { decrement: 1}
            }
        })
    }

    async findTaskAbove(taskId: string): Promise<void> {
        const task = await prisma.task.findUnique({
            where: { id: taskId }
        });
    
        if (!task) {
            throw new Error('Task not found.');
        }
    
        const minOrderTask = await prisma.task.findFirst({
            orderBy: { order: 'asc' }
        });
    
        if (task.order === minOrderTask?.order) {
            throw new Error('This task is already the first one.');
        }
    
        const taskAbove = await prisma.task.findFirst({
            where: { order: { lt: task.order } },
            orderBy: { order: 'desc' }
        });
    
        if (!taskAbove) {
            throw new Error('No task above found.');
        }
    
        console.log('Task to move:', task);
        console.log('Task above:', taskAbove);
    
        try {
            await prisma.$transaction(async (prisma) => {
                const tempOrder = -1; 

                await prisma.task.update({
                    where: { id: task.id },
                    data: { order: tempOrder }
                });
    
                await prisma.task.update({
                    where: { id: taskAbove.id },
                    data: { order: task.order }
                });
    
                await prisma.task.update({
                    where: { id: task.id },
                    data: { order: taskAbove.order }
                });
    
            });
    
            console.log('Task moved successfully.');
        } catch (error) {
            console.error('Error moving task:', error);
            throw new Error('Failed to move task.');
        }
    }

    async findtaskBelow(taskId: string):Promise <void>{
       
        const task = await prisma.task.findUnique({
            where: { id: taskId }
        })
        if(!task){
            throw Error ('Task not found.')
        }
        
        const maxOrderTask = await prisma.task.findFirst({
            orderBy: {order: 'desc' }
        })
        if (task.order === maxOrderTask?.order){
            throw Error('This task is already the last.')
        }
    
        const lowerTask = await prisma.task.findFirst({
            where: { order: {gt: task.order}} , 
            orderBy: {order: 'asc'}
        })
    
        if(lowerTask) {
            await prisma.$transaction(async (prisma)=> {
            
            await prisma.task.update({
                where: {id: task.id},
                data: {order: -1}
            })
            await prisma.task.update({
                where: { id: lowerTask.id },
                data: {order: task.order}
            })
            await prisma.task.update({
                where: {id: task.id},
                data: {order: lowerTask.order}
            })
        })
    }

    }

}