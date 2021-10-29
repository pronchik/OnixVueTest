<template>
<aside ref="aside">
                    <div class="modal">
                <div class="modal-content">
                <p>Are you sure you want to change the number of tasks?</p>
                <div class="buttons">
                    <button class="yes">Yes</button>
                    <button class="no">No</button>
                </div>
                </div>
            </div>
                <div class="project-logo">
                    <a href="#" v-on:click="openMenu">
                        <img src="../assets/Logo@3x.svg" id="project-logo" alt="logo">
                        <span>{{msg}}</span>
                    </a>
                    <img src="../assets/Search@3x.svg" alt="search" id = "search" >
                </div>

                <div class="introduction">
                    <div class="profile-info">
                        <img :src="require(`../assets/${img}`)" class = "user-img" alt="user-img" >
                        <div class="name-position">
                            <p>
                                {{fullName}}
                            </p>
                            <span>
                                {{position}}
                            </span>
                        </div>
                    </div>
                        <div class="circle" >
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                </div>

                <div class="statistic">
                    <div class="completed-tasks" v-on:click="modal">
                        <p>{{numberOfCompletedTasks}}</p>
                        <span>Completed tasks</span>
                    </div>
                    <div class="open-tasks">
                        <p>{{numberOfOpenTasks}}</p>
                        <span>Open tasks</span>
                    </div>

                </div>

                <div class="menu">
                    <span>MENU</span>
                    <ul>
                        <li>
                            Home
                        </li>
                        <li>
                            My Tasks
                        </li>
                        <li>
                            Notifications <div class="notifications"><span>{{notifications}}</span></div>

                        </li>
                    </ul>
                </div>
                <div class="img-menu">
                    <img src="../assets//home.png" alt="">
                    <img src="../assets//list.png" alt="">
                    <img src="../assets//notif.png" alt="">
                </div>
            </aside>
</template>

<script lang="ts">

export default {
  data () {
    return {
      msg: 'PROJECTUS',
      fullName: 'Maksym Pron',
      position: 'Devepoler',
      numberOfOpenTasks: 1,
      numberOfCompletedTasks: 256,
      notifications: 3,
      img: 'me.png'
    }
  },
  methods: {
    openMenu () : void {
      const aside = document.querySelectorAll('aside')[0]
      aside.classList.toggle('active')

      document.querySelectorAll('.project-logo a span')[0].classList.toggle('active')

      const search = document.querySelectorAll('aside .project-logo  img#search')[0]
      search.classList.toggle('active')

      const pLogo = document.querySelectorAll('img#project-logo')[0]
      pLogo.classList.toggle('active')

      const userImg = document.querySelectorAll('.introduction')[0]
      userImg.classList.toggle('active')

      const name = document.querySelectorAll('.name-position p')[0]
      name.classList.toggle('active')

      const position = document.querySelectorAll('.name-position span')[0]
      position.classList.toggle('active')

      const circle = document.querySelectorAll('.introduction .circle')[0]
      circle.classList.toggle('active')

      const statis = document.querySelectorAll('.statistic')[0]
      statis.classList.toggle('active')

      const menu = document.querySelectorAll('.menu')[0]
      menu.classList.toggle('active')

      const img = document.querySelectorAll('.img-menu img')
      img[0].classList.toggle('active')
      img[1].classList.toggle('active')
      img[2].classList.toggle('active')

      const spanMenu = document.getElementsByTagName('span')[7]
      spanMenu.classList.toggle('active')

      const ul = document.getElementsByTagName('ul')[0]
      ul.classList.toggle('active')

      const asd = document.getElementsByClassName('asd')[0]
      asd.classList.toggle('active')
    },
    modal () : void {
      const modal = document.querySelectorAll<HTMLElement>('.modal')[0]
      modal.style.display = 'block'
      const btnNo = document.querySelectorAll<HTMLElement>('.no')[0]
      const btnNYes = document.querySelectorAll<HTMLElement>('.yes')[0]

      const numberCompleted = document.querySelectorAll<HTMLElement>('.completed-tasks p')[0]

      const numberOpen = document.querySelectorAll<HTMLElement>('.open-tasks p')[0]

      btnNo.onclick = function () {
        modal.style.display = 'none'
      }

      btnNYes.onclick = function () {
        if (+numberOpen.innerText <= 0) {
          alert('Error')
          modal.style.display = 'none'
        } else {
          const result: string|number = parseInt(numberCompleted.innerText) + 1
          numberCompleted.innerText = String(result)

          const resultq: string|number = parseInt(numberOpen.innerText) - 1
          numberOpen.innerText = String(resultq)
          modal.style.display = 'none'
        }
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss" src="">

</style>
