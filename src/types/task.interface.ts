import { TaskStatusEnum } from './../enums/TaskStatusEnum'
export interface TaskInterface{
    id: number
    name: string
    description1: string
    time: string
    status: TaskStatusEnum.DONE | TaskStatusEnum.INPROGRESS | TaskStatusEnum.TODO
}
