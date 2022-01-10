import { TaskStatusEnum } from './../enums/TaskStatusEnum'
export interface TaskInterface{
    id: number
    title: string
    description1: string
    time: string
    status: TaskStatusEnum.DONE | TaskStatusEnum.INPROGRESS | TaskStatusEnum.TODO
    start: string,
    end: string
}
