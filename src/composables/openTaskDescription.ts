import { ref, provide, computed } from 'vue'
import { useStore } from 'vuex'
import { TaskStatusEnum } from './../enums/TaskStatusEnum'
import { TaskInterface } from '@/types/task.interface'
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default function openTaskDescription (props) {
  const store = useStore()
  const taskList = computed(() => store.state.tasks.tasks)
  const task = ref({}as TaskInterface)
  const showDetailsModal = ref(false)
  provide('showDetailsModal', showDetailsModal)
  const openTaskModal = (index) => {
    task.value = taskList.value[index]
    showDetailsModal.value = true
  }
  const openModalWithProps = index => {
    task.value = props.tasks[index]
    if (task.value.status !== TaskStatusEnum.DONE) {
      showDetailsModal.value = true
    } else {
      alert('You can`t edit this task')
    }
  }
  return {
    TaskStatusEnum,
    openTaskModal,
    showDetailsModal,
    store,
    taskList,
    task,
    openModalWithProps
  }
}
