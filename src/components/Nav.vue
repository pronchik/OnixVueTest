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
              <div class="users-online" v-for="user in users" :key="user" >
                <img :src="require(`../assets/${user.img}`)"  alt="user-img">
              </div>
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

function deleteEmptyTip () :void{
  const tip = document.querySelectorAll<HTMLElement>('.tip')

  for (let i = 0; i < tip.length; i++) {
    if (tip[i].innerText === '') {
      tip[i].style.display = 'none'
    }
  }
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
  const pictures = document.querySelectorAll<HTMLElement>('.pictures .picture')
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
      users: [
        {
          img: 'me.png'
        },
        {
          img: 'me.png'
        },
        {
          img: 'me.png'
        }
      ]
    }
  },
  methods: {

  },
  mounted () {
    selectActivity.call(this)
    hello.call(this)
    img.call(this)
    deleteEmptyTip.call(this)
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss" src="">

</style>
