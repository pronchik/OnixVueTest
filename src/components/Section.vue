<template>
<section>
            <div class="content">
                <div class="tasks">
                    <h2><span>Tasks</span></h2>
                    <div class="nadesti">
                      <div class="nades">
                        <span>Name</span>
                        <span>Description</span>
                      </div>
                      <span>Dedline</span>
                    </div>
                    <div v-for="item in items" :key="item" class="task">
                      <div class="name">
                        {{item.name}}
                      </div>
                      <div class="description">
                        {{item.description}}
                      </div>
                      <div class="time">
                        {{item.time}}
                      </div>

                    </div>
                </div>
                <div class="kanban"><span>Kanban</span></div>
                <div class="activity" >
                    <h2><span>Today</span></h2>
                    <div class="message" v-for="item1 in items1" :key="item1">
                      <div class="message1" style="display: flex">
                        <span>
                            <img :src="require(`../assets/${item1.img}`)" alt="checkmark">
                        </span>
                        <div class="text">
                            <p>{{item1.message}}</p>
                            <p>{{item1.time}}</p>
                        </div>
                      </div>
                        <div class="tip">
                          <span>{{item1.tip}}</span>
                        </div>
                    </div>

                    <div class="pictures">
                      <div class="picture" v-for="picture in pictures" :key="picture">
                        <img :src="require(`../assets/${picture.img}`)" alt="">
                      </div>

                    </div>
                </div>
                <div class="calendar"><span>Calendar</span></div>
                <div class="files"><span>Files</span></div>
            </div>
        </section>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import Message from '@/components/Message.vue'

@Options({
  components: {
    Message
  }
})
export default class Home extends Vue {
  data () {
    return {
      items: [
        {
          name: 'Create app',
          description: 'Use smth to do this Use smth to do this Use smth to do this Use smth to do this Use smth to do this Use smth to do this Use smth to do this Use smth to do this',
          time: '02.12.2021'
        },
        {
          name: 'Fix bugs',
          description: 'Fix all bugs',
          time: '02.12.2021'
        },
        {
          name: 'Создать проект с помощью Vue CLI.',
          description: 'Перенести сверстанную страницу в компонент Vue. Выделить потенциально динамический контент на странице (имена, даты, тексты) и перенести его в переменные. На вкладке Tasks создать список задач с названием задачи, описанием и планируемой датой завершения задачи. Данные записать в массив объектов.',
          time: '29.10.2021'
        }
      ],
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
          img: 'Icon@3x.svg'
        }
      ],
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
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss" src="">

</style>
