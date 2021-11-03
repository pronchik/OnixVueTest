<template lang="pug">
section
  .content
    .tasks(v-if="changeTab === 'tasks'")
      h2
        span Tasks
      .nadesti
        .nades
          span Name
          span Description
        span Deadline
      .task(v-for='task in tasks' :key='task')
        .name
          | {{task.name}}
        .description
          | {{task.description1}}
        .time
          | {{task.time}}
    .kanban(v-if="changeTab === 'kanban'")
      span Kanban
    .activity(v-if="changeTab === 'activity'")
      h2
        span Today
      .message(v-for='item1 in items1' :key='item1')
        .message1(style='display: flex')
          span
            img(:src='require(`../assets/${item1.img}`)' alt='checkmark')
          .text
            p {{item1.message}}
            p {{item1.time}}
        .tip(v-if='item1.tip')
          span {{item1.tip}}
        .pictures(v-if='item1.pictures')
          .picture(v-for='(picture,index) in item1.pictures' :key='index' @click="selectImg(index)")
            img(:src='require(`../assets/${picture.img}`)' alt='')
    .calendar(v-if="changeTab === 'calendar'")
      span Calendar
    .files(v-if="changeTab === 'files'")
      span Files

</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { emitter } from '../main'
import { TaskInterface } from '@/types/task.interface'
export default defineComponent({
  data () {
    const tasks: TaskInterface[] = [
      {
        name: 'Create app',
        description1: 'Use smth ',
        time: '02.12.2021'
      },
      {
        name: 'Fix bugs',
        description1: 'Fix all bugs',
        time: '02.12.2021'
      }
    ]
    return {
      tasks,
      changeTab: 'activity',
      items1: [
        {
          message: 'Darika Samak mark as done Listing on Product Hunt so that we can reach as many potential users',
          time: '8:40 PM',
          img: 'Icon@3x.svg'
        },
        {
          message: 'Emilee Simchenko commented on Account for teams and personal in bottom style',
          time: '7:32 PM',
          img: 'Icon@3x.svg',
          tip: 'During a project build, it is necessary to evaluate the product design and development against project requirements and outcomes'
        },
        {
          message: 'Darika Samak uploaded 4 files on An option to search in current ',
          time: '6:02 PM',
          img: 'Icon@3x.svg',
          pictures: [
            {
              img: '1-1.jpg'
            },
            {
              img: '1-1.jpg'
            },
            {
              img: '1-1.jpg'
            },
            {
              img: '1-1.jpg'
            }
          ]
        }
      ]
    }
  },
  methods: {
    selectImg (index: number) {
      // console.log('click')
      emitter.emit('change', index)
    }
  },
  mounted () {
    emitter.on('changeTab', changeTab => {
      this.changeTab = changeTab as string
    })
  }
})
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss" src="">

</style>
