<template>
  <v-dialog v-model="isShow" lazy persistent scrollable max-width="750px" transition="dialog-bottom-transition">
    <v-card>
      <v-card-title>
        <h2 class="headline darkGray--text">Mensagem Simples</h2>
        <v-spacer></v-spacer>
        <v-btn icon small aria-label="Pressione para fechar Modal" class="mx-0 my-0" @click.native="close">
          <v-icon>close</v-icon>
        </v-btn>
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text>

        deivid

        <!-- <v-container>
          <v-form v-model="valid" ref="form">
            <v-layout row wrap>
              <v-flex xs12>
                <v-textarea
                  name="input-7-1"
                  label="Mensagem simples"
                  v-model="newData.message"
                  hint="Ex: Mensagem de boas vindas"
                  :rules="requiredRules"
                  ref="message"
                ></v-textarea>
              </v-flex>
            </v-layout>
          </v-form>
          <v-card-actions>
            <v-btn
              flat
              @click="clearFields"
            >
              Limpar
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn
              flat
              :disabled="!valid"
              color="action"
              @click="submit"
            >Salvar</v-btn>
          </v-card-actions>
        </v-container> -->

      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
  export default {
    props: {
      destroyed: {
        type: Boolean,
        default: false
      },
      data: {
        type: Object
      }
    },
    data () {
      return {
        isShow: false,
        valid: false,
        requiredRules: [
          v => !!v || 'Campo obrigatório'
        ],
        newData: {
          message: ''
        }
      }
    },
    methods: {
      close () {
        this.isShow = false
        this.$router.push({ name: 'Home'})
      },
      submit () {
        this.newData = Object.assign({}, this.newData, { message: this.newData.message})
        this.$emit('send', this.newData)
      },
      clearFields () {
        // this.$refs.form.reset()
      },
      focusIn () {
        this.clearFields()
        // this.$refs.message.focus()
      },
      forceDestroy () {
        this.$destroy()
      }
    },
    watch: {
      destroyed (isHide) {
        console.log('destroyed', isHide)
        !isHide && this.focusIn()
        isHide && this.forceDestroy()
      }
    },
    mounted () {
      this.isShow = true
      this.newData = this.data
      this.focusIn()
    }
  }
</script>

