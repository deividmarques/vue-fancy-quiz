<template>
  <v-app class="chat">
    <v-toolbar class="topbar" color="primary" app dark flat>
      <v-container class="mx-auto py-0">
        <h1 class="font-weight-light">Create your Quiz Chat</h1>
        <v-card>
          <!-- <v-btn
            color="action"
            dark
            small
            absolute
            bottom
            right
            fab
            @click="openModal = true"
            >
            <v-icon>add</v-icon>
          </v-btn> -->
          <v-speed-dial
            v-model="fab"
            :top="top"
            :bottom="bottom"
            :right="right"
            :left="left"
            :direction="direction"
            :open-on-hover="hover"
            :transition="transition"
            >
            <v-btn
              slot="activator"
              v-model="fab"
              color="action"
              dark
              fab
            >
              <v-icon>add</v-icon>
              <v-icon>close</v-icon>
            </v-btn>
            <v-btn
              fab
              dark
              small
              color="red"
              @click="createMessageComponent"
            >
              <v-icon>message</v-icon>
            </v-btn>
            <v-btn
              fab
              dark
              small
              @click="callModal('Options', 'Crie uma lista com opções')"
              color="orange darken-2"
            >
              <v-icon>question_answer</v-icon>
            </v-btn>
            <v-btn
              fab
              dark
              small
              color="indigo"
            >
              <v-icon>keyboard</v-icon>
            </v-btn>
            <v-btn
              fab
              dark
              small
              color="blue darken-2"
            >
              <v-icon>settings</v-icon>
            </v-btn>
          </v-speed-dial>
        </v-card>
      </v-container>
    </v-toolbar>

    <!-- <Modal
      :open="modal.isOpen"
      :data="defaultData"
      @submit="submitModal"
      @close="closeModal"
      :title="modal.title"
    /> -->
    <router-view />

    <v-content class="chat-content">
      <v-layout class="chat-main">
        <v-container class="py-0 px-0">
          <v-card class="elevation-0" height="100%">
            <v-card-text class="chat-scroll">
              <dynamic-list-components :ref="index" v-for="(component, index) in chat" :key="index" :data="component" />
              <dynamic-component
                v-if="showLastMessage"
                :data="lastMessage"
                @send="responseInput"
              />
            </v-card-text>
          </v-card>
        </v-container>
      </v-layout>
    </v-content>

  </v-app>
</template>

<script>

// import Modal from '@/components/panel/modal/Index'
import DynamicListComponents from '@/components/view/DynamicListComponents'
import DynamicComponent from '@/components/view/DynamicComponent'

let chatDefault = {
  type: 'Message',
  id: 0,
  isBot: false,
  message: '',
  input: false,
  options: null
}

let chat3 = {
  type: 'Options',
  id: 3,
  isBot: true,
  writing: true,
  message: 'Podemos iniciar?',
  input: true,
  options: [
    {
      show: false,
      label: 'Sim, quero iniciar',
      value: true,
      style: 'success'
    },
    {
      show: false,
      label: 'Não quero',
      value: false,
      style: ''
    }
  ]
}

export default {
  name: 'App',
  components: {
    DynamicListComponents, DynamicComponent
  },
  data () {
    return {
      lastMessage: {},
      showLastMessage: false,
      chat: [],
      modal: {
        isOpen: false,
        title: '',
        type: ''
      },
      direction: 'left',
      fab: false,
      fling: false,
      hover: false,
      tabs: null,
      top: false,
      right: true,
      bottom: true,
      left: false,
      transition: 'slide-y-reverse-transition',
      defaultData: {
        id: 0,
        type: '',
        isBot: true,
        message: '',
        input: false,
        options: null
      }
    }
  },
  methods: {
    callModal (componentName, titleModal) {
      let updateModal = {
        isOpen: true,
        title: titleModal
      }
      let setId = this.chat.length + 1
      this.defaultData.id = setId
      this.defaultData.type = componentName
      this.modal = Object.assign({}, updateModal)
    },
    closeModal () {
      this.modal.isOpen = false
    },
    submitModal (result) {
      this.closeModal()
      this.$nextTick(() => {
        this.asyncChat(result, 1000)
        // this.asyncChat(chat3, 1000)
        // setTimeout(() => {
        //   this.showLastMessage = true
        //   this.getlastMessage()
        // }, 1500)
      })
    },
    asyncChat (obj, delay) {
      return new Promise(() => {
        setTimeout(() => this.chat.push(obj), delay)
      })
    },
    // autoScroll () {
    //   var elem = document.querySelector('.chat-scroll')
    //   elem.scrollTop = window.innerHeight
    // },
    getlastMessage () {
      let result = this.chat.length !== 0 ? this.chat[this.chat.length - 1] : chatDefault
      this.lastMessage = result
    },
    responseInput (result) {
      console.log('responseInput', result)

      switch (result.id) {
        case 3: {
          let asnwer = result.value ? 'Quero iniciar' : 'Não quero'
          let response = {
            type: 'Options',
            isBot: false,
            message: asnwer,
            input: false,
            options: null
          }
          this.asyncChat(response, 1000)
          break
        }
      }
    },
    startChat () {
      // this.showLastMessage = true
      // this.getlastMessage()
      // this.asyncChat(chat1, 1000)
      // this.asyncChat(chat2, 3000)
      // this.asyncChat(chat3, 5000)
      // setTimeout(() => {
      //   this.showLastMessage = true
      //   this.getlastMessage()
      // }, 5200)
    },
    createMessageComponent () {
      // this.$router.push({ name: 'editMessage', params: { id: '1'}})
      this.$router.push({ name: 'EditMessage' })
      // this.$router.push({ name: 'modal', params: { component: 'Message', title: 'Componente de Mensagem'} })
    }
  },
  watch: {
    top (val) {
      this.bottom = !val
    },
    right (val) {
      this.left = !val
    },
    bottom (val) {
      this.top = !val
    },
    left (val) {
      this.right = !val
    }
  }
}
</script>

<style lang="sass">
  .topbar
    .v-speed-dial
      position: absolute
      bottom: -50px

    .v-btn--floating
      position: relative


  $spaceTopbar: 50px

  .chat
    height: 100vh

    .logo-topbar
      display: flex
      align-items: center
      color: #fff

      h1
        display: flex
        margin-right: 10px

      p
        font-size: 16px

      .logo
          width: 220px

  .chat-content
    margin-top: $spaceTopbar
    height: calc(100vh - 50px)

    .card:first-child
      // overflow: hidden

  .chat-main
    height: 100vh

    > .container
      margin-top: 0
      height: 100vh

      // > .card .card__text
      //   background: #fff

  .chat-scroll
    padding-top: $spaceTopbar
    padding-bottom: $spaceTopbar * 2
    height: calc(100% - #{$spaceTopbar})
    -webkit-overflow-scrolling: touch
    -moz-overflow-scrolling: touch
    -ms-overflow-scrolling: touch
    overflow-scrolling: touch

  @media screen and (max-width: 600px)

    .chat

      .toolbar__content .logo-topbar:not(.btn):not(.menu):first-child:not(:only-child)
        margin: 0 16px

        h1
          font-size: 22px

      .ellipsis
        max-width: 100%

</style>
