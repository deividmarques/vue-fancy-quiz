<template>
  <v-layout row justify-center>
    <v-dialog v-model="isShow" lazy persistent scrollable max-width="750px" transition="dialog-bottom-transition">
      <v-card>
        <v-card-title>
          <h2 class="headline darkGray--text">{{title}}</h2>
          <v-spacer></v-spacer>
          <v-btn icon small aria-label="Pressione para fechar Modal" class="mx-0 my-0" @click.native="close">
            <v-icon>close</v-icon>
          </v-btn>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text>

          <smart-slot :key="componentType" :destroyed="!isShow" @send="submit" :type="componentType" />

        </v-card-text>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
  import SmartSlot from './SmartSlot'

  export default {
    name: 'Modal',
    props: {
      open: {
        type: Boolean,
        default: false
      }
    },
    components: { SmartSlot },
    data () {
      return {
        isShow: false
      }
    },
    methods: {
      close () {
        this.$emit('close')
        this.$router.push({ name: 'Home'})
      },
      submit (data) {
        this.$emit('submit', data)
      }
    },
    watch: {
      open (val) {
        this.isShow = val
      }
    },
    computed: {
      title () {
        return this.$route.params.title
      },
      componentType () {
        return this.$route.params.component
      }
    },
    mounted () {
      this.isShow = true
      console.log('rota', this.$route.params)
    },
    beforeDestroy () {
      this.isShow = false
    }
  }
</script>
