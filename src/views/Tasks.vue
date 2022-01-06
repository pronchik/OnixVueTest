<template lang="pug">
.tasks
  .asd(v-if="Object.keys(this.task).length !== 0")
    task-details-modal(:showDetailsModal = 'showDetailsModal' :task = 'task' v-if="showDetailsModal === true")
  task-modal(:showModal = 'showModal' :tasks = 'tasks'
  @close-modal="showModal = $event")
  h2
      span Tasks
        button(class='add-task' @click="openModal()") +
        .nadesti
          .nades
            span Name
            span Description
          span Deadline
        .task(v-for='(task, index) in tasks' :key='task.index' :ref="setItemRef" class="list-item" )
          .name(@click="taskModal(index)")
            | {{task.name}}
          .description(@click="taskModal(index)")
            | {{task.description1}}
          .time(@click="taskModal(index)")
            | {{task.time}}
          button(class='delete-task' @click="deleteCart(index)") -
</template>

<script lang="ts">
import { computed, defineComponent, onBeforeMount, onMounted } from 'vue'
import { TaskInterface } from '@/types/task.interface'
import useValidate from '@vuelidate/core'
import { required } from '@vuelidate/validators'
import { emitter } from '../main'
import { TaskStatusEnum } from './../enums/TaskStatusEnum'
import TaskModal from '@/components/TaskModal.vue'
import TaskDetailsModal from '@/components/TaskDetailsModal.vue'
import { useStore } from 'vuex'
export default defineComponent({
  setup () {
    const store = useStore()
    const tasks = computed(() => store.state.tasks)
    let itemRefs = []
    const setItemRef = (el: never) => {
      if (el) {
        itemRefs.push(el)
      }
    }
    onBeforeMount(() => {
      itemRefs = []
    })
    onMounted(() => {
      for (let i = 0; i < itemRefs.length; i++) {
        setTimeout(() => {
          if (itemRefs[i]) {
            (itemRefs[i] as HTMLElement).classList.add('increase')
          }
        }, 2000 * i)
        setTimeout(() => {
          if (itemRefs[i]) {
            (itemRefs[i] as HTMLElement).classList.remove('increase')
          }
        }, 2000 * Object.values(itemRefs).length)
      }
    })
    return {
      tasks,
      setItemRef
    }
  },
  components: {
    TaskModal,
    TaskDetailsModal
  },
  data () {
    return {
      v$: useValidate(),
      task_name: '',
      task_deadline: '',
      task_description: '',
      task_status: '',
      TaskStatusEnum,
      showModal: 'none',
      showDetailsModal: false,
      task: ''
    }
  },
  validations: {
    task_name: { required },
    task_deadline: {
      required,
      minValue (val) {
        return new Date(val) > new Date()
      }
    },
    task_description: { required }
  },
  methods: {
    taskModal (index) {
      this.task = this.tasks[index]
      this.showDetailsModal = true
    },
    openModal () {
      this.showModal = 'block'
    },
    deleteCart (task) {
      this.tasks.splice(task, 1)
      emitter.emit('changeNumber', this.tasks.length)
    },
    takeTask () {
      emitter.on('task', task => {
        this.tasks.push({
          id: this.tasks.length,
          name: Object.values(task as string)[0] as string,
          description1: Object.values(task as string)[1] as string,
          time: Object.values(task as string)[2] as string,
          status: TaskStatusEnum.TODO
        })
        this.showModal = 'none'
        emitter.emit('changeNumber', this.tasks.length)
        this.$nextTick(() => {
          const element = Object.values(this.$refs as unknown as HTMLElement)[Object.values(this.$refs).length - 1]
          element.classList.add('blink')
          setTimeout(() => {
            if (element) {
              element.classList.remove('blink')
            }
          }, 4000)
        })
      })
    }
  },
  mounted () {
    emitter.on('removeLastElementFromTaskArray', () => {
      this.tasks = this.tasks.splice(1)
    })
    this.takeTask()
    emitter.on('save', task => {
      const index = task as TaskInterface
      this.tasks[index.id].name = index.name
      this.tasks[index.id].description1 = index.description1
      this.tasks[index.id].time = index.time
      this.tasks[index.id].status = index.status
      this.showDetailsModal = false
    })
    emitter.on('close', () => {
      this.showDetailsModal = false
    })
  }
})
</script>
