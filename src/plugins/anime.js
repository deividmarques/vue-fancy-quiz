import anime from 'animejs'
import Vue from 'vue'

const animeMixin = (Vue) => {
  Vue.mixin({
    data () {
      return {
        anime: anime
      }
    }
  })
}

Vue.use(animeMixin)
