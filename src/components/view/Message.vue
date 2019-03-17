<template>
  <div class="cb-message" :class="{'is-bot' : data.isBot}">
    <span class="cb-message-icon" ref="icon">
      <svg v-if="data.isBot" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
           viewBox="0 0 48 48" enable-background="new 0 0 48 48" xml:space="preserve">
        <circle fill="#EDE7F6" cx="24" cy="24" r="20"/>
        <path fill="#673AB7" d="M24,44c4.5,0,8.6-1.5,11.9-4c-0.6-7.6-8.2-9-8.2-9L24,31.8L20.3,31c0,0-7.6,1.4-8.2,9
          C15.4,42.5,19.5,44,24,44z"/>
        <path fill="#311B92" d="M24,37c3.1,0,5.6-2.3,5.9-5.3c-0.9-0.4-1.6-0.6-2-0.7c0,2.2-1.8,3.9-4,3.9c-2.2,0-4-1.8-4-3.9
          c-0.4,0.1-1.1,0.3-2,0.7C18.4,34.7,20.9,37,24,37z"/>
        <path fill="#FFA726" d="M32,22.5c0,0.8-0.7,1.5-1.5,1.5c-0.8,0-1.5-0.7-1.5-1.5s0.7-1.5,1.5-1.5C31.3,21,32,21.7,32,22.5 M19,22.5
          c0-0.8-0.7-1.5-1.5-1.5S16,21.7,16,22.5s0.7,1.5,1.5,1.5S19,23.3,19,22.5"/>
        <path fill="#FF9800" d="M24,35c-4,0-4-4-4-4v-4h8v4C28,31,28,35,24,35z"/>
        <path fill="#FFB74D" d="M31,18.7c0-5.9-14-3.8-14,0v4.4c0,3.8,3.1,6.9,7,6.9c3.9,0,7-3.1,7-6.9V18.7z"/>
        <path fill="#424242" d="M24,11c-4.9,0-8,4.3-8,8.2V21l2,2v-4l9.2-3l2.8,3v4l2-2v-0.8c0-3.2-0.8-6.8-4.8-7.6L26.4,11H24z"/>
        <path fill="#784719" d="M26,22c0-0.6,0.4-1,1-1s1,0.4,1,1s-0.4,1-1,1S26,22.6,26,22 M20,22c0,0.6,0.4,1,1,1s1-0.4,1-1s-0.4-1-1-1
          S20,21.4,20,22"/>
      </svg>

      <svg v-else xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
       viewBox="0 0 48 48" style="enable-background:new 0 0 48 48;" xml:space="preserve">
        <circle style="fill:#EDE7F6;" cx="24" cy="24" r="20"/>
        <rect x="18" y="18.25" style="fill:#4E342E;" width="12" height="13.5"/>
        <path style="fill:#FF1744;" d="M24,44c4.482,0,8.605-1.492,11.94-3.982C35.326,32.641,28,31,28,31h-8c0,0-7.328,1.614-7.94,9.018
          C15.395,42.508,19.518,44,24,44z"/>
        <path style="fill:#A0530E;" d="M24,34.75c-1.439,0-3.5-3.75-3.5-3.75v-5h7v5C27.5,31,25.439,34.75,24,34.75"/>
        <path style="fill:#C16E14;" d="M31,23c0,3.728-3.272,7-7,7c-3.729,0-7-3.272-7-7v-6c0-3.728,14-5.726,14,0V23z M24,36
          c2.901,0,3.5-5,3.5-5s-1.864,3-3.5,3c-1.636,0-3.5-3-3.5-3S21.099,36,24,36"/>
        <path style="fill:#212121;" d="M26,22c0-0.551,0.448-1,1-1s1,0.449,1,1s-0.448,1-1,1S26,22.551,26,22 M20,22c0,0.551,0.448,1,1,1
          s1-0.449,1-1s-0.448-1-1-1S20,21.449,20,22"/>
        <path style="fill:#4E342E;" d="M24,11c-4.556,0-11,2.089-11,17l5,3.75V21l9-5l3,4v12l5-5c0-3.019-0.255-14.5-8-14.5L26,11H24z"/>
      </svg>

    </span>
    <div class="cb-message-text" ref="text">
      <template v-if="data.message !== '' ">
        <template>
          {{data.message}}<br>
          <a href="" v-if="data.link" @click.prevent="action">{{data.link}}</a>
        </template>
      </template>
      <div class="cb-message-spinner" v-else>
        <div class="dot"></div>
        <div class="dot"></div>
        <div class="dot"></div>
      </div>
    </div>
  </div>
</template>

<script>
  import mixin from './mixin'
  export default {
    mixins: [mixin],
    methods: {
      action () {
        this.$emit('action', true)
      },
      iconAnimation () {
        const direction = this.data.isBot ? -100 : 100
        const icon = this.$refs.icon

        this.anime({
          targets: icon,
          translateX: [
            { value: 0, duration: 100 },
            { value: direction, duration: 100 },
            { value: 0, duration: 500 }
          ],
          opacity: [
            { value: 0, duration: 100 },
            { value: 0, duration: 100 },
            { value: 1, duration: 250 }
          ]
        })
      },
      messageAnimation () {
        const direction = this.data.isBot ? 0 : 100
        const message = this.$refs.text

        this.anime({
          targets: message,
          delay: 150,
          transformOrigin: direction,
          scale: [
            { value: 0, duration: 100 },
            { value: 0, duration: 100 },
            { value: 1, duration: 500 }
          ],
          opacity: [
            { value: 0, duration: 100 },
            { value: 0, duration: 100 },
            { value: 1, duration: 250 }
          ]
        })
      }
    },
    mounted () {
      this.iconAnimation('left')
      this.messageAnimation('left')
    }
  }
</script>

<style lang="sass">
  @import '../../assets/style/variables'

  $radius: 6px
  $heightFooter: 75px
  // $darkGray: #000
  // $max-mobile: 600px
  // $action: #ccc

  .cb-message
    margin-bottom: 30px
    margin-right: 5px
    right: 0
    align-self: flex-end
    flex-direction: row-reverse
    display: flex
    align-items: baseline

    &-icon
      transform: translate(-100px)
      opacity: 0

      svg
        width: 50px
        height: 50px

    &-text
      background: #f1f0f0
      color: $darkGray
      padding: 6px 12px
      border-radius: $radius *2
      border-top-right-radius: 0
      position: relative
      font-size: 18px
      top: 15px
      opacity: 0
      max-width: 40%

    &.is-bot
      flex-direction: row
      align-self: flex-start
      left: 0

      .cb-message-text
        background: lighten($action, 50%)
        color: $darkGray
        border-radius: $radius *2
        border-top-right-radius: $radius *2
        border-top-left-radius: 0

      .cb-message-icon
        // transform: translate(-100px)

  .cb-message-spinner,
  .cb-message-spinner *
    box-sizing: border-box

  .cb-message-spinner
    height: 30px;
    display: flex
    align-items: center

    .dot
      // width: 10px
      // height: 10px
      margin: 0 5px
      padding: 1px
      border: calc(15px / 5) solid $darkGray
      // background: $darkGray
      border-radius: 50%
      transform: scale(0)
      opacity: 0
      animation: spinner-animation 1000ms ease infinite 0ms

      &:nth-child(1)
        animation-delay: calc(300ms * 1)

      &:nth-child(2)
        animation-delay: calc(300ms * 2)

      &:nth-child(3)
        animation-delay: calc(300ms * 3)

  @keyframes spinner-animation
    50%
      transform: scale(1)
      opacity: 1

    100%
      opacity: 0

  @media screen and (max-width: $max-mobile)
    .cb-message
      &-text
        max-width: 90%

</style>
