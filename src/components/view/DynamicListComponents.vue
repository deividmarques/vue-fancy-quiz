<template>
  <component :is="component" :type="type" :data="dataTransform" v-if="component" />
</template>
<script>
  export default {
    name: 'dynamic-list-component',
    props: ['data', 'type'],
    data () {
      return {
        component: null
      }
    },
    computed: {
      loader () {
        let type = this.data.type
        if (!type) {
          return null
        }
        return () => import(`@/components/view/${type}`)
      },
      dataTransform () {
        // {...this.data, input: false}
        return Object.assign({}, this.data, { input: false })
      }
    },
    mounted () {
      this.loader()
        .then(() => {
          this.component = () => this.loader()
        })
        .catch(() => {
          this.component = () => import('@/components/view/Message')
        })
    }
  }
</script>
