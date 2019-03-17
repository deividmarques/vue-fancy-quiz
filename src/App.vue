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
              <!-- <chat /> -->

            <div class="container">
              <div class="page-header">
                <h1>Firebase and Vue</h1>
              </div>
              <div class="card">
                <div class="card-header">
                  <h3>Messages List</h3>
                </div>
                <div class="card-body">
                  <table class="table table-striped">
                    <thead>
                      <tr>
                        <th>Title</th>
                        <th>Author</th>
                        <th>Delete</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="message in chat" :key="message.id">
                        <td>
                          Type: {{ message.data.type }}</a>
                        </td>
                        <td>{{ message.data.message }}</td>
                        <td>
                          <span class="pointer"
                                @click="removeArticle(message)">
                            <i class="fas fa-trash"></i>
                          </span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <br><br>

            <div class="card">
              <div class="card-header">Add Message</div>
                <div class="card-body">
                  <form id="form"
                        class="form-inline"
                        @submit.prevent="addArticle">
                    <div class="form-group mb-2">
                      <label for="title" class="sr-only">Message</label>
                      <input id="title"
                            type="text"
                            class="form-control"
                            placeholder="Message"
                            v-model="newChat.data.message" />
                    </div>
                    <button class="btn btn-primary mx-sm-3 mb-2">Add</button>
                  </form>
                </div>
            </div>

          </v-card>
        </v-container>
      </v-layout>
    </v-content>

  </v-app>
</template>

<script>

// import Modal from '@/components/panel/modal/Index'
// import DynamicListComponents from '@/components/view/DynamicListComponents'
// import DynamicComponent from '@/components/view/DynamicComponent'
import Chat from '@/components/view/Chat'
import dbChat from './config'

export default {
  name: 'App',
  components: {
    Chat
  },
  firebase: {
    chat: dbChat
  },
  data () {
    return {
      newMessage: '',
      newChat: {
        data: {
          input: false,
          isBot: false,
          type: 'Message',
          message: ''
        }
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
    }
  },
  methods: {
    addArticle () {
      // console.log('add', this.newChat)
      dbChat.push(this.newChat)
      this.resetData()
    },
    removeArticle (chat) {
      dbChat.child(chat['.key']).remove()
    },
    createMessageComponent () {
      this.$router.push({ name: 'EditMessage' })
    },
    resetData () {
      let data = {
        input: false,
        isBot: false,
        type: 'Message',
        message: ''
      }
      this.newChat = Object.assign({}, this.newChat, { data })
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
  },
  mounted () {
    console.log('mounted')
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
