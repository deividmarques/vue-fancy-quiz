<template>
  <component :is="component" :destroyed="isDestroyed" @send="send" :type="type" v-if="component" />
</template>
<script>
  export default {
    props: ['type', 'destroyed', ],
    data () {
      return {
        isDestroyed: null,
        renderComponent: true
      }
    },
    computed: {
      // loader () {
      //   let type = this.type
      //   if (!type) {
      //     return null
      //   }
      //   return () => import(`./content/${type}/Index.vue`)
      // }
      component () {
        let type = this.type
        return () => import(`./content/${type}/Index.vue`)
      }
    },
    methods: {
      send (result) {
        this.$emit('send', result)
      },
      // forceRerender() {
      //   this.renderComponent = false

      //   this.$nextTick(() => {
      //     this.renderComponent = true
      //   });
      // }
    },
    mounted () {
      // this.forceRerender()
      // this.loader()
      //   .then(() => {
      //     this.component = () => this.loader()
      //   })
      //   .catch(() => {
      //     // this.component = () => import('@/components/chat/modal/content/Message')
      //   })
    },
    watch: {
      data (val) {
        console.log('change data', val)
      },
      destroyed (val) {
        console.log('destroyed fake do slot', val)
        this.isDestroyed = val
      }
    }
  }
</script>
