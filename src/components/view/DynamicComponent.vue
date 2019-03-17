<template>
  <component :is="component" :type="data.type" @send="send" :data="data" v-if="component" />
</template>
<script>
  export default {
    name: 'dynamic-component',
    props: ['data'],
    computed: {
      component () {
        let type = this.data.type
        return () => import(`@/components/view/${type}`)
      }
    },
    methods: {
      send (option) {
        this.$emit('send', option)
      }
    }
  }
</script>
