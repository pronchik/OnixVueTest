<template lang="pug">
.tasks
  .asd(v-if="Object.keys(this.task).length !== 0")
    task-details-modal(:showDetailsModal = 'showDetailsModal' :task = 'task' :showEditButton='showEditButton' v-if="showDetailsModal")
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
          .name(@click="openTaskModal(index)")
            | {{task.title}}
          .description(@click="openTaskModal(index)")
            | {{task.description1}}
          .time(@click="openTaskModal(index)")
            | {{task.time}}
          button(class='delete-task' @click="deleteCart(index)") -
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import useValidate from '@vuelidate/core'
import { required } from '@vuelidate/validators'
import { emitter } from '../main'
import { TaskStatusEnum } from './../enums/TaskStatusEnum'
import TaskModal from '@/components/TaskModal.vue'
import TaskDetailsModal from '@/components/TaskDetailsModal.vue'
import { mapMutations, mapState } from 'vuex'
export default defineComponent({
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
      task: '',
      itemRefs: [],
      showEditButton: true
    }
  },
  computed: {
    ...mapState(['tasks'])
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
    ...mapMutations(['deleteTask']),
    openTaskModal (index:number) {
      this.task = this.tasks[index]
      this.showDetailsModal = true
    },
    openModal () {
      this.showModal = 'block'
    },
    deleteCart (index :number) {
      this.deleteTask(index)
    },
    takeTask () {
      emitter.on('blinkLastTask', () => {
        this.showModal = 'none'
        this.$nextTick(() => {
          const element = (this.itemRefs as unknown as HTMLElement)[this.itemRefs.length - 1]
          element.classList.add('blink')
          setTimeout(() => {
            if (element) {
              element.classList.remove('blink')
            }
          }, 4000)
        })
      })
    },
    setItemRef (el: never) {
      if (el) {
        this.itemRefs.push(el)
      }
    },
    blink () {
      for (let i = 0; i < this.itemRefs.length; i++) {
        setTimeout(() => {
          if (this.itemRefs[i]) {
            (this.itemRefs as unknown as HTMLElement)[i].classList.add('increase')
          }
        }, 2000 * i)
        setTimeout(() => {
          if ((this.itemRefs as unknown as HTMLElement)[i]) {
            (this.itemRefs as unknown as HTMLElement)[i].classList.remove('increase')
          }
        }, 2000 * this.itemRefs.length)
      }
    }
  },
  mounted () {
    this.blink()
    this.takeTask()
    emitter.on('close', () => {
      this.showDetailsModal = false
    })
  }
})
</script>
