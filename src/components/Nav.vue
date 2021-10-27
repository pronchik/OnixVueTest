<template>
        <nav>
        <div class="website-redesign">
            <div class="left-part">
                <img src="../assets/Shapes@2x.png" alt="Redesign">
                <span>Website Redesign</span>
                <div class="circle">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
            <div class="right-part">
                <img src="../assets/me.png"  alt="user-img">
                <img src="../assets/me.png"  alt="user-img">
                <img src="../assets/me.png"  alt="user-img">
                <div class="share">
                    <span>Share</span>
                </div>
                <div class="chat">
                    <img src="../assets/CombinedShape@1x.svg" alt="chat">
                    <span>Chat</span>
                </div>
            </div>
        </div>
        <div class="navigation">
            <ul>
                <li><a href="#" v-on:click = 'hello'>Tasks</a></li>
                <li><a href="#" v-on:click = 'hello'>Kanban</a></li>
                <li><a href="#" v-on:click = 'hello'>Activity</a></li>
                <li><a href="#" v-on:click = 'hello'>Calendar</a></li>
                <li><a href="#" v-on:click = 'hello'>Files</a></li>
            </ul>
        </div>
        <div class="marker">
            <span></span>
            <span></span>
            <span class="third-marker"></span>
            <span class="fourth-marker"></span>
            <span></span>
        </div>
        <select name="Select page" id="select" onchange="selectContentSelector()">
            <option>Activity</option>
            <option >Tasks</option>
            <option>Kanban</option>
            <option>Calendar</option>
            <option>Files</option>
        </select>
        </nav>
</template>

<script lang="ts">

function selectActivity () : void {
  const markerActivity = document.querySelectorAll<HTMLElement>('.marker span.third-marker')
  const tab = document.querySelectorAll<HTMLElement>('.content .activity')

  tab[0].classList.add('active1')
  markerActivity[0].style.display = 'block'
}

function hello () : void {
  const markers = document.querySelectorAll<HTMLElement>('.marker span')
  const tabs = document.querySelectorAll<HTMLElement>('.content>div')
  document.querySelectorAll<HTMLElement>('.navigation a').forEach((link, index) => {
    link.onclick = () => {
      for (let i = 0; i < markers.length; i++) {
        markers[i].style.display = 'none'
      }
      tabs.forEach(tab => tab.classList.remove('active1'))
      markers[index].style.display = 'block'
      tabs[index].classList.add('active1')
    }
  })
}

function img () {
  const pictures = document.querySelectorAll<HTMLElement>('.pictures img')
  const log = document.querySelectorAll<HTMLElement>('.notifications span')[0]

  pictures.forEach((picture, index) => {
    picture.onclick = () => {
      log.innerText = String(index)
    }
  })
}

export default {
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  data () {
    return {
    }
  },
  methods: {

  },
  mounted () {
    selectActivity.call(this)
    hello.call(this)
    img.call(this)
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss" src="">

</style>
