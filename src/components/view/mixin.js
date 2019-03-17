export default {
  props: ['data', 'type'],
  methods: {
    autoScroll () {
      var elem = document.querySelector('.chat-scroll')
      var count = this.$parent.$parent.$children.length
      elem.scrollTop = window.innerHeight + (100 * count)
    }
  },
  computed: {
    isMobile () {
      return this.$vuetify.breakpoint.xsOnly
    }
  },
  mounted () {
    this.autoScroll()
  }
}
