<template>
  <v-container v-if="dataOptions.input" class="option-component">
    <v-checkbox v-if="hasAccept" @change="changeTerm" :label="dataOptions.checkbox.label" v-model="accept"></v-checkbox>
    <h2 v-if="dataOptions.legend" class="legend darkGray--text">{{dataOptions.legend}}</h2>

    <v-select
      v-if="hasManyOptions && isMobile"
      :items="dataOptions.options"
      item-text="label"
      item-value="value"
      v-model="selected"
      label="Escolha"
      single-line
      @input="changeSelect"
    ></v-select>
    <v-btn
      v-else
      :color="option.style"
      :ref="`btn${index + 1}`"
      :disabled="option.disabled"
      class="option-element btn-big"
      v-for="(option, index) in dataOptions.options"
      :key="index"
      depressed
      dark
      @click="send(index, option.value)"
    >
      {{option.label}}
    </v-btn>
  </v-container>
  <message v-else :data="data" />
</template>

<script>
  import Message from './Message'
  import mixin from './mixin'

  export default {
    mixins: [mixin],
    components: { Message },
    data () {
      return {
        accept: true,
        selected: ''
      }
    },
    methods: {
      send (index, value) {
        let data = {
          id: this.data.id,
          value
        }
        this.endOptionsAnimation(index, data)
      },
      changeSelect () {
        // console.log('changeSelect', ev.target.value)
        let data = {
          id: this.data.id,
          value: this.selected
        }
        this.endOptionsAnimation(1, data)
      },
      startOptionsAnimation () {
        let children = this.$el.children
        let listTypes = [...children]

        listTypes.map((elem, index) => {
          let TIMELINE = this.anime.timeline({
            delay: 200 * (index + 1)
          })

          TIMELINE
            .add({
              targets: elem,
              duration: 500,
              opacity: [0, 1],
              scale: [0, 1]
            })
        })
      },
      endOptionsAnimation (index, option) {
        let children = this.$el.children
        let listTypes = [...children]
        let removedChild = listTypes[index]

        listTypes.splice(index, 1)
        listTypes.unshift(removedChild)

        listTypes.map((elem, index) => {
          let TIMELINE = this.anime.timeline({
            delay: 100 * index
          })

          TIMELINE
            .add({
              targets: elem,
              opacity: [1, 0],
              scale: [1, 0]
            })
        })

        // delay after selected
        setTimeout(() => {
          this.$emit('send', option)
        }, 100 * children.length)
      },
      changeTerm (isChecked) {
        this.dataOptions.options[0].disabled = !isChecked
      }
    },
    watch: {
      data (val) {
        setTimeout(() => {
          this.startOptionsAnimation()
        }, 500)
      }
    },
    computed: {
      dataOptions () {
        return this.data
      },
      hasAccept () {
        if (this.data.checkbox) { this.accept = false }
        return this.data.checkbox
      },
      hasManyOptions () {
        return this.dataOptions.options.length > 2
      }
    },
    mounted () {
      this.$nextTick(() => {
        this.startOptionsAnimation()
      })
    }
  }
</script>

<style lang="sass">
  @import '../../assets/style/variables'

  .option-element,
  .legend,
  .checkbox
    opacity: 0

  // scoped class
  .option-component
    display: flex
    justify-content: center
    flex-wrap: wrap

    select
      // -moz-appearance: menulist
      // -webkit-appearance: menulist
      border: 1px solid $gray
      padding: 10px 20px

    .legend
      top: 5px
      position: absolute
      text-align: center
      font-size: 16px
      font-weight: 400

    .checkbox
      left: calc(50% - 260px)
      top: -30px
      position: absolute

  @media screen and (max-width: $max-mobile)
    .option-component
      // bottom: -15px
      bottom: 0

      .checkbox
        left: 10px
        top: -25px

        label
          font-size: 14px
          line-height: 1.4
          text-overflow: initial
          overflow: inherit
          white-space: initial
          max-width: 75%

</style>
