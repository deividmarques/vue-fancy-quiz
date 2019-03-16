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

        <v-container>
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-layout row wrap>
              <v-flex xs12>
                <v-textarea
                  name="input-7-1"
                  label="Mensagem simples"
                  v-model="message"
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
        </v-container>

      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
  export default {
    data () {
      return {
        isShow: false,
        valid: false,
        requiredRules: [
          v => !!v || 'Campo obrigatório'
        ],
        message: ''
      }
    },
    methods: {
      close () {
        this.isShow = false
        this.$router.push({ name: 'Home'})
      },
      submit () {
        if (this.$refs.form.validate()) {
          this.close()
        }
      },
      clearFields () {
        // this.$refs.form.reset()
      },
      focusIn () {
        this.$nextTick(() => {
          this.clearFields()
          this.$refs.message.focus()
        })
      },
      forceDestroy () {
        this.$destroy()
      }
    },
    mounted () {
      this.isShow = true
      this.newData = this.data
      this.focusIn()
    }
  }
</script>

