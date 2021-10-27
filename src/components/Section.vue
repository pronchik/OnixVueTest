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
                <div class="activity">
                    <h2><span>Today</span></h2>
                    <Message message = 'Darika Samak mark as done Listing on Product Hunt so that we can reach as many potential users' time = '8:40 PM'/>
                    <Message message = 'Emilee Simchenko commented on Account for teams and personal in bottom style' time = '7:32 PM'/>
                    <div class="tip">
                        <span>During a project build, it is necessary to evaluate the product design and development against project requirements and outcomes</span>
                    </div>
                    <Message message = 'Darika Samak uploaded 4 files on An option to search in current projects or in all projects' time = '6:02 PM'/>
                    <div class="pictures">
                        <img src="../assets/1-1.jpg" alt="">
                        <img src="../assets/1-1.jpg" alt="">
                        <img src="../assets/1-1.jpg" alt="">
                        <img src="../assets/1-1.jpg" alt="">
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
        }

      ]
    }
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss" src="">

</style>
