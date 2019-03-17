<template>
  <component :is="component" :type="type" @send="send" :data="data" v-if="component" />
</template>
<script>
  export default {
    name: 'dynamic-component',
    props: ['data', 'type'],
    computed: {
      component () {
        let type = this.type
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
