<template>
  <v-card-text class="chat-scroll">
    <dynamic-list-components :ref="`output${index}`" v-for="(component, index) in components" :key="`output${index}`" :data="component.data" :type="component.data.type" />
    <div class="input-area">
      <dynamic-component
        v-if="lastMessage.data.input"
        :ref="`input${lastMessage.data.id}`"
        :key="`input${lastMessage.data.id}`"
        :data="lastMessage.data"
        @send="responseInput"
      />
    </div>
  </v-card-text>
</template>

<script>
  /* eslint no-unexpected-multiline: 0 */
  /* eslint func-call-spacing: 0 */
  import DynamicListComponents from './DynamicListComponents'
  import DynamicComponent from './DynamicComponent'
  // import MenuHelp from '@/components/chat/MenuHelp'
  // import ExpireInfo from '@/components/chat/ExpireInfo'
  import proposal from '@/mocks/proposal'

  let companyName = proposal.company.fantasyName

  let day5 = '22/12/2018'
  let day10 = '29/12/2018'
  let day15 = '03/01/2019'

  var chatDefault = {
    type: 'Message',
    data: {
      id: 0,
      isBot: false,
      message: '',
      input: false,
      options: null
    }
  }

  var chat1 = {
    id: 1,
    type: 'Message',
    data: {
      isBot: true,
      message: 'Olá tudo bem? Obrigado por atender ao nosso convite',
      input: false,
      options: null
    }
  }

  var chat2 = {
    type: 'Message',
    data: {
      id: 2,
      isBot: true,
      message: `Eu sou o Mentor Inteligente. Fui criado para entregar informações e soluções que possam atender os seus interesses junto a empresa ${companyName}`,
      input: false,
      options: null
    }
  }

  var chat3 = {
    type: 'Options',
    data: {
      id: 3,
      isBot: true,
      writing: true,
      message: 'Você gostaria de visualizar uma proposta criada especialmente pra você? ',
      input: true,
      options: [
        {
          show: false,
          label: 'Sim, quero',
          value: true,
          style: 'channelEmail'
        },
        {
          show: false,
          label: 'Recusar',
          value: false,
          style: 'channelSms'
        }
      ]
    }
  }

  // var chat4 = {
  //   type: 'Message',
  //   data: {
  //     id: 4,
  //     isBot: true,
  //     message: 'Valor original R$ 3000,00, Valor atualizado R$ 2000,00',
  //     input: false,
  //     options: null
  //   }
  // }

  var showTickets = {
    type: 'Tickets',
    data: {
      id: 6,
      isBot: true,
      message: '',
      input: false,
      options: null
    }
  }

  var selectParcel = {
    type: 'Options',
    data: {
      id: 8,
      isBot: true,
      message: 'Como gostaria de pagar?',
      input: true,
      options: [
        {
          show: false,
          label: 'à vista',
          value: 'cash',
          style: 'channelEmail'
        },
        {
          show: false,
          label: 'Parcelado',
          value: 'installment',
          style: 'channelSms'
        }
      ]
    }
  }

  var detailsParcels = {
    type: 'Parcels',
    data: {
      id: 9,
      isBot: true,
      message: '',
      input: false,
      options: null
    }
  }

  var optionsParcels = {
    type: 'OptionsParcels',
    data: {
      id: 10,
      isBot: true,
      message: 'Gostaria de pagar em quantas parcelas?',
      input: true,
      options: [
        {
          show: false,
          label: proposal.installments[0].parcelValue,
          value: proposal.installments[0].parcel,
          total: proposal.installments[0].currentValue,
          style: 'channelEmail'
        },
        {
          show: false,
          label: proposal.installments[1].parcelValue,
          value: proposal.installments[1].parcel,
          total: proposal.installments[1].currentValue,
          style: 'channelEmail'
        },
        {
          show: false,
          label: proposal.installments[2].parcelValue,
          value: proposal.installments[2].parcel,
          total: proposal.installments[2].currentValue,
          style: 'channelEmail'
        },
        {
          show: false,
          label: proposal.installments[3].parcelValue,
          value: proposal.installments[3].parcel,
          total: proposal.installments[3].currentValue,
          style: 'channelEmail'
        },
        {
          show: false,
          label: proposal.installments[4].parcelValue,
          value: proposal.installments[4].parcel,
          total: proposal.installments[4].currentValue,
          style: 'channelEmail'
        }
      ]
    }
  }

  // var chat11 = {
  //   type: 'ParcelSelected',
  //   data: {
  //     id: 11,
  //     isBot: true,
  //     message: 'Confira os detalhes da parcela escolhida',
  //     input: false,
  //     options: null
  //   }
  // }

  // var chat12 = {
  //   type: 'Options',
  //   data: {
  //     id: 12,
  //     isBot: true,
  //     message: 'Confirmar esta parcela?',
  //     input: true,
  //     options: [
  //       {
  //         show: false,
  //         label: 'Sim',
  //         value: true,
  //         style: 'channelEmail'
  //       },
  //       {
  //         show: false,
  //         label: 'Outra parcela',
  //         value: false,
  //         style: 'channelSms'
  //       }
  //     ]
  //   }
  // }

  // var selectPay = {
  //   type: 'Options',
  //   data: {
  //     id: 13,
  //     isBot: true,
  //     message: 'Qual a forma de pagamento ?',
  //     input: true,
  //     options: [
  //       {
  //         show: false,
  //         label: 'Boleto',
  //         value: 'ticket',
  //         style: 'channelEmail'
  //       },
  //       {
  //         show: false,
  //         label: 'Cartão de Crédito',
  //         value: 'creditCard',
  //         style: 'channelEmail'
  //       }
  //     ]
  //   }
  // }

  let chat12a = {
    type: 'Message',
    data: {
      isBot: false,
      message: 'Eu quero escolher outra parcela',
      input: false,
      options: null
    }
  }

  // let acceptTerm = {
  //   type: 'Options',
  //   data: {
  //     id: 15,
  //     isBot: true,
  //     message: 'Você aceita o Termo de Acordo para a quitação da dívida?',
  //     input: true,
  //     checkbox: {
  //       label: 'Declaro que li e aceito o Termo de Acordo para a quitação da dívida'
  //     },
  //     options: [
  //       {
  //         show: false,
  //         label: 'Aceitar',
  //         value: true,
  //         style: 'channelEmail',
  //         disabled: true
  //       },
  //       {
  //         show: false,
  //         label: 'Recusar',
  //         value: false,
  //         style: 'channelSms',
  //         disabled: false
  //       }
  //     ]
  //   }
  // }

  var optionsPaymentDay = {
    type: 'Options',
    data: {
      id: 16,
      isBot: true,
      message: 'Por favor escolha qual será o dia do mês para o pagamento das parcelas',
      input: true,
      legend: 'O pagamento será feito todo',
      options: [
        {
          show: false,
          label: 'Dia 10',
          value: '10',
          style: 'channelEmail'
        },
        {
          show: false,
          label: 'Dia 20',
          value: '20',
          style: 'channelEmail'
        },
        {
          show: false,
          label: 'Dia 30',
          value: '30',
          style: 'channelEmail'
        }
      ]
    }
  }

  let termAgree = {
    type: 'Term',
    data: {
      id: 15,
      isBot: true,
      message: 'Leia o Termo até o final. Uma cópia desse Termo será enviada para você por email.',
      input: true,
      agree: true,
      checkbox: {
        label: 'Declaro que li e aceito o Termo de Acordo para a quitação da dívida'
      },
      options: [
        {
          show: false,
          label: 'Aceitar',
          value: true,
          style: 'channelEmail',
          disabled: true
        },
        {
          show: false,
          label: 'Recusar',
          value: false,
          style: 'channelSms',
          disabled: false
        }
      ]
    }
  }

  // let optionsRefuseTerm = {
  //   type: 'Options',
  //   data: {
  //     id: 811,
  //     isBot: true,
  //     message: 'Você aceita o Termo?',
  //     input: true,
  //     checkbox: {
  //       label: 'Declaro que li e aceito o Termo de Acordo Recusado'
  //     },
  //     options: [
  //       {
  //         show: false,
  //         label: 'Aceitar',
  //         value: true,
  //         style: 'channelEmail',
  //         disabled: true
  //       },
  //       {
  //         show: false,
  //         label: 'Voltar a proposta',
  //         value: false,
  //         style: 'channelSms',
  //         disabled: false
  //       }
  //     ]
  //   }
  // }

  let termDisagree = {
    type: 'Term',
    data: {
      id: 811,
      isBot: true,
      message: 'Leia o Termo até o final. Uma cópia desse Termo será enviada para você por email.',
      input: true,
      agree: false,
      checkbox: {
        label: 'Declaro que li e aceito o Termo de Acordo Recusado'
      },
      options: [
        {
          show: false,
          label: 'Aceitar',
          value: true,
          style: 'channelEmail',
          disabled: true
        },
        {
          show: false,
          label: 'Voltar a proposta',
          value: false,
          style: 'channelSms',
          disabled: false
        }
      ]
    }
  }

  var disagree = {
    type: 'Options',
    data: {
      id: 80,
      isBot: true,
      message: `Por favor me responda o motivo da recusa da proposta?`,
      input: true,
      options: [
        {
          show: false,
          label: 'Não reconheço essa dívida',
          value: 'disagree1',
          style: 'channelEmail'
        },
        {
          show: false,
          label: 'Fazer contraproposta',
          value: 'disagree2',
          style: 'channelSms'
        },
        {
          show: false,
          label: 'Tenho outros motivos',
          value: 'disagree3',
          style: 'channelLetter'
        },
        {
          show: false,
          label: 'Voltar a proposta',
          value: 'backProposal',
          style: 'action'
        }
      ]
    }
  }

  let disagreeInitial = {
    type: 'Options',
    data: {
      id: 80,
      isBot: true,
      message: `Por favor me responda o motivo da recusa da proposta?`,
      input: true,
      options: [
        {
          show: false,
          label: 'Não reconheço essa dívida',
          value: 'disagree1',
          style: 'channelEmail'
        },
        {
          show: false,
          label: 'Tenho outros motivos',
          value: 'disagree3',
          style: 'channelLetter'
        },
        {
          show: false,
          label: 'Voltar a proposta',
          value: 'backProposal',
          style: 'action'
        }
      ]
    }
  }

  let emailField = {
    type: 'InputEmail',
    data: {
      id: 18,
      isBot: true,
      message: 'Agora preciso do seu e-mail para lhe enviar os detalhes do nosso acordo',
      input: true,
      options: {
        show: false,
        label: 'label do input',
        value: ''
      }
    }
  }

  let messageFinalDisagree = {
    type: 'Message',
    data: {
      isBot: true,
      message: 'Sentimos muito que não tenha aceito a proposta apresentada! Uma cópia do Termo foi enviado pro seu e-mail.',
      input: false,
      options: null
    }
  }

  let counterProposal = {
    type: 'CounterProposal',
    data: {
      id: 82,
      isBot: true,
      message: 'Preencha os campos abaixo com valor total a ser pago e quantidade de parcelas que você gostaria',
      input: true,
      options: {
        value: '',
        parcels: ''
      }
    }
  }

  let success = {
    type: 'Options',
    data: {
      id: 100,
      isBot: true,
      message: 'Chegamos ao fim da nossa conversa. Poderia responder 4 perguntas que levará aproximadamente 30 segundos?',
      input: true,
      options: [
        {
          show: false,
          label: 'Quero responder',
          value: true,
          style: 'channelEmail'
        },
        {
          show: false,
          label: 'Não quero',
          value: false,
          style: 'channelSms'
        }
      ]
    }
  }

  let successDisagree = {
    type: 'Options',
    data: {
      id: 100,
      isBot: true,
      message: 'Chegamos ao fim da nossa conversa. Poderia responder 3 perguntas que levará aproximadamente 15 segundos?',
      input: true,
      options: [
        {
          show: false,
          label: 'Quero responder',
          value: true,
          style: 'channelEmail'
        },
        {
          show: false,
          label: 'Não quero',
          value: false,
          style: 'channelSms'
        }
      ]
    }
  }

  let survey1 = {
    type: 'Options',
    data: {
      id: 101,
      isBot: true,
      message: 'Como você avalia sua experiência conosco?',
      input: true,
      options: [
        {
          show: false,
          label: 'Excelente',
          value: 'Excelente',
          style: 'channelEmail',
          disabled: false
        },
        {
          show: false,
          label: 'Boa',
          value: 'Boa',
          style: 'channelSms',
          disabled: false
        },
        {
          show: false,
          label: 'Razoável',
          value: 'Razoável',
          style: 'channelLetter',
          disabled: false
        },
        {
          show: false,
          label: 'Péssima',
          value: 'Péssima',
          style: 'accent',
          disabled: false
        }
      ]
    }
  }

  let survey2 = {
    type: 'Options',
    data: {
      id: 102,
      isBot: true,
      message: 'Como você avalia o tempo gasto nessa operação?',
      input: true,
      options: [
        {
          show: false,
          label: 'Muito rápido',
          value: 'Muito rápido',
          style: 'channelEmail',
          disabled: false
        },
        {
          show: false,
          label: 'Rápido',
          value: 'Rápido',
          style: 'channelSms',
          disabled: false
        },
        {
          show: false,
          label: 'Satisfatório',
          value: 'Satisfatório',
          style: 'channelLetter',
          disabled: false
        },
        {
          show: false,
          label: 'Insatisfatório',
          value: 'Insatisfatório',
          style: 'accent',
          disabled: false
        }
      ]
    }
  }

  let survey3 = {
    type: 'Options',
    data: {
      id: 103,
      isBot: true,
      message: 'Como você avalia a nossa comunicação no convite enviado? ',
      input: true,
      options: [
        {
          show: false,
          label: 'Excelente',
          value: 'Excelente',
          style: 'channelEmail',
          disabled: false
        },
        {
          show: false,
          label: 'Boa',
          value: 'Boa',
          style: 'channelSms',
          disabled: false
        },
        {
          show: false,
          label: 'Razoável',
          value: 'Razoável',
          style: 'channelLetter',
          disabled: false
        },
        {
          show: false,
          label: 'Péssima',
          value: 'Péssima',
          style: 'accent',
          disabled: false
        }
      ]
    }
  }

  let survey4 = {
    type: 'Options',
    data: {
      id: 104,
      isBot: true,
      message: 'Você utilizaria novamente nossa plataforma? ',
      input: true,
      options: [
        {
          show: false,
          label: 'Com certeza',
          value: 'Com certeza',
          style: 'channelEmail',
          disabled: false
        },
        {
          show: false,
          label: 'Talvez',
          value: 'Talvez',
          style: 'channelSms',
          disabled: false
        },
        {
          show: false,
          label: 'Ainda não sei',
          value: 'Ainda não sei',
          style: 'channelLetter',
          disabled: false
        },
        {
          show: false,
          label: 'Prefiro Call Center',
          value: 'Prefiro Call Center',
          style: 'accent',
          disabled: false
        }
      ]
    }
  }

  let messageAfterSurvey = {
    type: 'Message',
    data: {
      isBot: true,
      message: 'Muito obrigado por responder nossas perguntas, com isso encerramos nossa conversa.',
      input: false,
      options: null
    }
  }

  export default {
    // components: { DynamicListComponents, DynamicComponent, MenuHelp, ExpireInfo },
    components: { DynamicListComponents, DynamicComponent },
    props: {
      lists: {
        type: Array
      }
    },
    data () {
      return {
        components: [],
        showLastMessage: false,
        windowSize: {
          x: 0,
          y: 0
        },
        selectedDay: null,
        isOneParcel: false,
        parcelData: '',
        parcel: '',
        flowRefusal: false
      }
    },
    watch: {
      lists (val) {
        if (val.length === 0) {
          this.startChat()
        } else {
          let renderList = new Promise((resolve) => {
            let list = val.map((item, index) => {
              this.asyncChat(item, 100 * index)
            })
            resolve(list)
          })

          renderList.then(() => {
            this.autoScroll()
            this.showLastMessage = true
          })
        }
      }
    },
    computed: {
      lastMessage () {
        return this.components.length !== 0 ? this.components[this.components.length - 1] : chatDefault
      }
    },
    methods: {
      autoScroll () {
        // var elem = document.querySelector('.chat-scroll')
        var elem = document.querySelector('body')
        console.log('elem', elem)
        console.log('window.innerHeight', window.innerHeight)
        elem.scrollTop = window.innerHeight
      },
      responseInput (option) {
        console.log('responseInput', option)

        switch (option.id) {
          case 3: {
            let asnwer = option.value ? `Eu quero ver a proposta da empresa ${companyName}` : 'Eu recuso a proposta'

            var chat21 = {
              type: 'ResumeProposal',
              data: {
                id: 21,
                isBot: true,
                message: '',
                input: false,
                options: {
                  parcel: 1,
                  date: day5, // criar funcao pra calcular daqui 5 dias sempre
                  proposal: proposal
                }
              }
            }

            var chat31 = {
              type: 'Options',
              data: {
                id: 31,
                isBot: true,
                message: `Você aceita o pagamento à vista até o dia ${day5}?`,
                input: true,
                options: [
                  {
                    show: false,
                    label: 'Sim, pagar à vista',
                    value: 'noParcel',
                    style: 'channelEmail',
                    disabled: false
                  },
                  {
                    show: false,
                    label: 'Ver detalhes da dívida',
                    value: 'details',
                    style: 'channelSms',
                    disabled: false
                  },
                  {
                    show: false,
                    label: 'Parcelar a dívida',
                    value: 'parcels',
                    style: 'channelLetter',
                    disabled: false
                  }
                ]
              }
            }

            if (option.value) {
              let question = {
                type: 'Options',
                data: {
                  isBot: false,
                  message: asnwer,
                  input: false,
                  options: null
                }
              }
              this.asyncChat(question, 100)
              // this.asyncChat(chat4, 1500)
              this.asyncChat(chat21, 1500)
              this.asyncChat(chat31, 3000)
            } else {
              let response = {
                type: 'Message',
                data: {
                  isBot: false,
                  message: asnwer,
                  input: false,
                  options: null
                }
              }
              this.flowRefusal = true

              this.asyncChat(response, 100)
              this.asyncChat(disagreeInitial, 1500)
            }
            break
          }
          case 31: {
            if (option.value === 'noParcel') {
              let response = {
                type: 'Message',
                data: {
                  isBot: false,
                  message: `Sim, pagarei o boleto até o dia ${day5}`,
                  input: false,
                  options: null
                }
              }
              this.isOneParcel = true
              this.asyncChat(response, 100)
              this.asyncChat(termAgree, 1000)
              // this.asyncChat(acceptTerm, 2500)
            } else if (option.value === 'details') {
              let response = {
                type: 'Message',
                data: {
                  isBot: false,
                  message: 'Sim, eu quero ver detalhes da dívida',
                  input: false,
                  options: null
                }
              }
              var chat32 = {
                type: 'Options',
                data: {
                  id: 32,
                  isBot: true,
                  message: 'Ver todas as opções de pagamento?',
                  input: true,
                  options: [
                    {
                      show: false,
                      label: 'Sim, todas',
                      value: true,
                      style: 'channelEmail'
                    },
                    {
                      show: false,
                      label: 'Recusar',
                      value: false,
                      style: 'channelSms'
                    }
                  ]
                }
              }
              this.asyncChat(response, 100)
              this.asyncChat(showTickets, 1000)
              this.asyncChat(chat32, 5000)
            } else if (option.value === 'parcels') {
              let response = {
                type: 'Message',
                data: {
                  isBot: false,
                  message: 'Quero parcelar',
                  input: false,
                  options: null
                }
              }
              this.asyncChat(response, 100)
              this.asyncChat(detailsParcels, 1000)
              this.asyncChat(optionsParcels, 5000)
            }
            break
          }
          case 32: {
            let answer = option.value ? 'Sim, eu quero ver todas as opções de pagamento ' : 'Eu quero sair e recusar a proposta'

            let response = {
              type: 'Options',
              data: {
                isBot: false,
                message: answer,
                input: false,
                options: null
              }
            }
            this.asyncChat(response, 100)

            if (option.value) {
              this.asyncChat(detailsParcels, 1500)
              this.asyncChat(optionsParcels, 5000)
            } else {
              this.flowRefusal = true
              this.asyncChat(disagree, 1500)
            }

            break
          }
          // case 5: {
          //   let asnwer = option.value ? 'Sim, eu quero ver detalhes da dívida' : 'Não quero ver detalhes da dívida'

          //   if (option.value) {
          //   } else {
          //     let response = {
          //       type: 'Message',
          //       data: {
          //         isBot: false,
          //         message: asnwer,
          //         input: false,
          //         options: null
          //       }
          //     }

          //     this.asyncChat(response, 300)
          //     this.asyncChat(questionProposal, 1500)
          //   }
          //   break
          // }
          case 7: {
            let asnwer = option.value ? `Quero ver a proposta da empresa ${companyName}` : 'Não quero ver proposta, quero sair'

            if (option.value) {
              let response = {
                type: 'Message',
                data: {
                  isBot: false,
                  message: asnwer,
                  input: false,
                  options: null
                }
              }
              this.asyncChat(response, 100)
              this.asyncChat(detailsParcels, 1000)
              this.asyncChat(selectParcel, 4000)
            } else {
              let response = {
                type: 'Message',
                data: {
                  isBot: false,
                  message: asnwer,
                  input: false,
                  options: null
                }
              }
              this.flowRefusal = true
              this.asyncChat(response, 100)
              this.asyncChat(disagree, 1500)
            }
            break
          }
          case 8: {
            let asnwer = option.value === 'cash' ? 'Quero pagar à vista' : 'Quero pagar parcelado'
            let response = {
              type: 'Message',
              data: {
                isBot: false,
                message: asnwer,
                input: false,
                options: null
              }
            }
            this.asyncChat(response, 100)

            if (option.value === 'installment') {
              this.asyncChat(optionsParcels, 1500)
              this.isOneParcel = false
            } else {
              this.isOneParcel = true
              let chat11 = {
                type: 'ParcelSelected',
                data: {
                  id: 11,
                  isBot: true,
                  message: 'Confira os detalhes da proposta à vista',
                  input: false,
                  options: {
                    value: 1
                  }
                }
              }

              console.log('chamou o ParcelSelected')

              let chat12 = {
                type: 'Options',
                data: {
                  id: 12,
                  isBot: true,
                  message: 'Você aceita a proposta à vista?',
                  input: true,
                  options: [
                    {
                      show: false,
                      label: 'Sim',
                      value: true,
                      style: 'channelEmail'
                    },
                    {
                      show: false,
                      label: 'Quero parcelar',
                      value: false,
                      style: 'channelSms'
                    }
                  ]
                }
              }
              this.asyncChat(chat11, 1500)
              this.asyncChat(chat12, 2500)
            }
            break
          }
          case 10: {
            let asnwer = option.value === 1 ? 'Quero pagar à vista' : `Quero pagar em ${option.value} parcelas `

            this.parcel = option.value

            let response = {
              type: 'Message',
              data: {
                isBot: false,
                message: asnwer,
                input: false,
                options: null
              }
            }

            if (option.value === 1) {
              this.isOneParcel = true

              let chat33 = {
                type: 'OptionsDate',
                data: {
                  id: 33,
                  isBot: true,
                  message: 'Qual a melhor data de pagamento?',
                  input: true,
                  options: [
                    {
                      show: false,
                      label: `Dia ${day5}`,
                      value: 5,
                      style: 'channelEmail'
                    },
                    {
                      show: false,
                      label: `Dia ${day10}`,
                      value: 10,
                      style: 'channelSms'
                    },
                    {
                      show: false,
                      label: `Dia ${day15}`,
                      value: 15,
                      style: 'channelLetter'
                    }
                  ]
                }
              }

              this.asyncChat(response, 100)
              this.asyncChat(chat33, 1000)
            } else {
              this.isOneParcel = false
              this.asyncChat(response, 100)
              this.asyncChat(optionsPaymentDay, 1000)
            }

            // let chat11 = {
            //   type: 'ParcelSelected',
            //   data: {
            //     id: 11,
            //     isBot: true,
            //     message: 'Confira os detalhes da parcela escolhida',
            //     input: false,
            //     options: {
            //       value: option.value
            //     }
            //   }
            // }

            // let parcelSelected = option.value === 1 ? 'Confirmar pagamento à vista ?' : 'Confirmar parcelamento?'

            // let chat12 = {
            //   type: 'Options',
            //   data: {
            //     id: 12,
            //     isBot: true,
            //     message: parcelSelected,
            //     input: true,
            //     options: [
            //       {
            //         show: false,
            //         label: 'Sim',
            //         value: true,
            //         style: 'channelEmail'
            //       },
            //       {
            //         show: false,
            //         label: 'Outra parcela',
            //         value: false,
            //         style: 'channelSms'
            //       }
            //     ]
            //   }
            // }

            // this.asyncChat(response, 100)
            // this.asyncChat(chat11, 1000)
            // this.asyncChat(chat12, 2500)

            break
          }
          // case 121: {
          //   if (option.value) {
          //     let response = {
          //       type: 'Message',
          //       data: {
          //         isBot: false,
          //         message: 'Sim, eu confirmo',
          //         input: false,
          //         options: null
          //       }
          //     }

          //     this.asyncChat(response, 100)
          //     this.asyncChat(acceptTerm, 1500)
          //   } else {
          //     this.asyncChat(chat12a, 1500)
          //     this.asyncChat(optionsParcels, 3000)
          //   }
          //   break
          // }
          case 33: {
            this.isOneParcel = true

            if (option.value === 5) {
              this.parcelData = day5
              let response = {
                type: 'Message',
                data: {
                  isBot: false,
                  message: `Quero pagar até o dia ${day5}`,
                  input: false,
                  options: null
                }
              }
              var chat331 = {
                type: 'ResumeProposal',
                data: {
                  id: 21,
                  isBot: true,
                  message: '',
                  input: false,
                  options: {
                    parcel: 1,
                    date: day5, // criar funcao pra calcular daqui 5 dias sempre
                    proposal: proposal
                  }
                }
              }
              this.asyncChat(response, 100)
              this.asyncChat(chat331, 1500)
            } else if (option.value === 10) {
              this.parcelData = day10
              let response = {
                type: 'Message',
                data: {
                  isBot: false,
                  message: `Quero pagar até o dia ${day10}`,
                  input: false,
                  options: null
                }
              }
              var chat332 = {
                type: 'ResumeProposal',
                data: {
                  id: 21,
                  isBot: true,
                  message: '',
                  input: false,
                  options: {
                    parcel: 1,
                    date: day10, // criar funcao pra calcular daqui 5 dias sempre
                    proposal: proposal
                  }
                }
              }
              this.asyncChat(response, 100)
              this.asyncChat(chat332, 1500)
            } else if (option.value === 15) {
              this.parcelData = day15
              let response = {
                type: 'Message',
                data: {
                  isBot: false,
                  message: `Quero pagar até o dia ${day15}`,
                  input: false,
                  options: null
                }
              }
              var chat333 = {
                type: 'ResumeProposal',
                data: {
                  id: 21,
                  isBot: true,
                  message: '',
                  input: false,
                  options: {
                    parcel: 1,
                    date: day15, // criar funcao pra calcular daqui 5 dias sempre
                    proposal: proposal
                  }
                }
              }
              this.asyncChat(response, 100)
              this.asyncChat(chat333, 1500)
            }
            // this.asyncChat(termAgree, 2500)

            var chat34 = {
              type: 'Options',
              data: {
                id: 34,
                isBot: true,
                message: `Você aceita o pagamento à vista até o dia ${this.parcelData}?`,
                input: true,
                options: [
                  {
                    show: false,
                    label: 'Sim, eu aceito',
                    value: 'agree',
                    style: 'channelEmail',
                    disabled: false
                  },
                  {
                    show: false,
                    label: 'Parcelar dívida',
                    value: 'parcel',
                    style: 'channelSms',
                    disabled: false
                  },
                  {
                    show: false,
                    label: 'Recusar proposta',
                    value: 'disagree',
                    style: 'channelLetter',
                    disabled: false
                  }
                ]
              }
            }
            this.asyncChat(chat34, 2500)
            break
          }
          case 34: {
            if (option.value === 'agree') {
              let response = {
                type: 'Message',
                data: {
                  isBot: false,
                  message: `Sim, eu aceito o pagamento à vista até o dia ${this.parcelData}`,
                  input: false,
                  options: null
                }
              }
              this.asyncChat(response, 100)
              this.asyncChat(termAgree, 1000)
              // this.asyncChat(acceptTerm, 2000)
            } else if (option.value === 'parcel') {
              let response = {
                type: 'Message',
                data: {
                  isBot: false,
                  message: 'Quero parcelar minha dívida',
                  input: false,
                  options: null
                }
              }
              this.asyncChat(response, 100)
              this.asyncChat(optionsParcels, 1000)
            } else if (option.value === 'disagree') {
              let response = {
                type: 'Message',
                data: {
                  isBot: false,
                  message: 'Quero recusar a proposta',
                  input: false,
                  options: null
                }
              }
              this.flowRefusal = true
              this.asyncChat(response, 100)
              this.asyncChat(disagree, 1000)
            }
            break
          }
          case 12: {
            if (option.value) {
              let response = {
                type: 'Message',
                data: {
                  isBot: false,
                  message: 'Sim, eu confirmo',
                  input: false,
                  options: null
                }
              }

              this.asyncChat(response, 100)
              this.asyncChat(termAgree, 1000)
              // this.asyncChat(acceptTerm, 2500)
            } else {
              this.asyncChat(chat12a, 100)
              this.asyncChat(optionsParcels, 1500)
            }
            break
          }

          case 13: {
            let asnwer = option.value === 'ticket' ? 'Quero pagar no Boleto' : 'Quero pagar no Cartão de crédito'

            let response = {
              type: 'Message',
              data: {
                isBot: false,
                message: asnwer,
                input: false,
                options: null
              }
            }

            this.asyncChat(response, 100)
            this.asyncChat(termAgree, 1500)
            // this.asyncChat(acceptTerm, 3000)
            break
          }
          case 15: {
            let asnwer = option.value ? 'Eu li e aceito o Termo de Acordo para a quitação da dívida' : 'Não aceito o Termo de Acordo para a quitação da dívida'

            let response = {
              type: 'Message',
              data: {
                isBot: false,
                message: asnwer,
                input: false,
                options: null
              }
            }
            this.asyncChat(response, 100)

            if (option.value) {
              this.asyncChat(emailField, 1500)
              // if (this.isOneParcel) {
              // } else {
              //   this.asyncChat(optionsPaymentDay, 1500)
              // }
            } else {
              this.flowRefusal = true
              this.asyncChat(disagree, 1500)
            }
            break
          }

          case 16: {
            let asnwer = `Eu escolho pagar todo dia ${option.value} de cada mês`

            let response = {
              type: 'Message',
              data: {
                isBot: false,
                message: asnwer,
                input: false,
                options: null
              }
            }

            var parcelDetails = {
              type: 'ParcelDetails',
              data: {
                isBot: true,
                message: '',
                input: false,
                options: {
                  parcel: this.parcel,
                  date: option.value,
                  proposal: proposal
                }
              }
            }
            this.selectedDay = option.value

            this.asyncChat(response, 100)
            this.asyncChat(parcelDetails, 1000)

            var chat17 = {
              type: 'Options',
              data: {
                id: 17,
                isBot: true,
                message: `Você confirma que o pagamento será feito todo dia ${option.value} de cada mês?`,
                input: true,
                options: [
                  {
                    show: false,
                    label: 'Sim',
                    value: true,
                    style: 'channelEmail'
                  },
                  {
                    show: false,
                    label: 'Outro dia',
                    value: false,
                    style: 'channelSms'
                  }
                ]
              }
            }

            this.asyncChat(chat17, 3000)
            break
          }
          case 17: {
            if (option.value) {
              let response = {
                type: 'Message',
                data: {
                  isBot: false,
                  message: 'Sim, eu confirmo',
                  input: false,
                  options: null
                }
              }
              this.asyncChat(response, 100)
              // this.asyncChat(emailField, 1500)
              this.asyncChat(termAgree, 1500)
              // this.asyncChat(acceptTerm, 3000)
            } else {
              let response = {
                type: 'Message',
                data: {
                  isBot: false,
                  message: 'Eu quero escolher outro dia',
                  input: false,
                  options: null
                }
              }
              this.asyncChat(response, 100)
              if (!this.isOneParcel) {
                this.asyncChat(optionsPaymentDay, 1500)
              }
            }

            break
          }

          case 18: {
            let response = {
              type: 'Message',
              data: {
                isBot: false,
                message: `Meu e-mail é o ${option.value.toLowerCase()}`,
                input: false,
                options: null
              }
            }
            let confirmEmail = {
              type: 'Options',
              data: {
                id: 181,
                isBot: true,
                message: `Pra finalizarmos, me confirme se o e-mail ${option.value.toLowerCase()} está correto?`,
                input: true,
                options: [
                  {
                    show: false,
                    label: 'Confirmo',
                    value: true,
                    style: 'channelEmail'
                  },
                  {
                    show: false,
                    label: 'Não',
                    value: false,
                    style: 'channelSms'
                  }
                ]
              }
            }

            this.asyncChat(response, 100)
            this.asyncChat(confirmEmail, 1500)
            break
          }

          case 181: {
            let message = option.value ? 'Sim, o e-mail está correto' : 'Quero digitar o e-mail novamente'
            let response = {
              type: 'Message',
              data: {
                isBot: false,
                message,
                input: false,
                options: null
              }
            }
            this.asyncChat(response, 100)
            if (option.value) {
              if (this.flowRefusal) {
                this.asyncChat(messageFinalDisagree, 1000)
                this.asyncChat(successDisagree, 3500)
              } else {
                let chat19 = {
                  type: 'Message',
                  data: {
                    id: 19,
                    isBot: true,
                    message: 'Em alguns instantes você receberá o boleto e uma cópia do Termo em seu e-mail',
                    input: false,
                    options: null
                  }
                }
                this.asyncChat(chat19, 1000)
                this.asyncChat(success, 2000)
              }
              // this.asyncChat(survey1, 3000)
            } else {
              this.asyncChat(emailField, 1000)
            }
            break
          }

          // exit flow
          case 80: {
            if (option.value === 'disagree1') {
              let response = {
                type: 'Message',
                data: {
                  isBot: false,
                  message: 'Eu não reconheço essa dívida',
                  input: false,
                  options: null
                }
              }
              this.asyncChat(response, 100)

              var chat81 = {
                type: 'Textarea',
                data: {
                  id: 81,
                  isBot: true,
                  message: `Entendi que você não reconhece a dívida. Use o campo abaixo pra explicar o motivo, pois levarei essa informação para a empresa ${companyName}`,
                  input: true,
                  required: true,
                  options: {
                    show: false,
                    label: '',
                    value: ''
                  }
                }
              }
              this.asyncChat(chat81, 1500)
            }
            if (option.value === 'disagree2') {
              let response = {
                type: 'Message',
                data: {
                  isBot: false,
                  message: 'Eu quero fazer uma contra proposta',
                  input: false,
                  options: null
                }
              }

              let message = {
                type: 'Message',
                data: {
                  isBot: true,
                  message: `Eu ainda não consigo garantir que sua contraproposta seja aceita, mas saiba que enviarei essa informação para avaliação da empresa ${companyName}`,
                  input: false,
                  options: null
                }
              }

              this.asyncChat(response, 100)
              this.asyncChat(message, 1000)
              this.asyncChat(counterProposal, 4000)
            }
            if (option.value === 'disagree3') {
              let response = {
                type: 'Message',
                data: {
                  isBot: false,
                  message: 'Eu tenho outros motivos',
                  input: false,
                  options: null
                }
              }

              let chat83 = {
                type: 'Textarea',
                data: {
                  id: 83,
                  isBot: true,
                  message: 'Por favor preciso que me escreva qual o motivo da recusa?',
                  input: true,
                  required: true,
                  options: {
                    show: false,
                    label: '',
                    value: ''
                  }
                }
              }

              this.asyncChat(response, 100)
              this.asyncChat(chat83, 1000)
            }
            if (option.value === 'backProposal') {
              let response = {
                type: 'Message',
                data: {
                  isBot: false,
                  message: `Quero ver a proposta da empresa ${companyName}`,
                  input: false,
                  options: null
                }
              }
              this.flowRefusal = false

              this.asyncChat(response, 200)
              this.asyncChat(detailsParcels, 1500)
              this.asyncChat(optionsParcels, 3000)
            }
            break
          }

          // disagree1 flow
          case 81: {
            if (option.value === 'prev') {
              this.backToDisagree()
            } else {
              let response = {
                type: 'Message',
                data: {
                  isBot: false,
                  message: option.value,
                  input: false,
                  options: null
                }
              }

              let message = {
                type: 'Message',
                data: {
                  isBot: true,
                  message: `Muito obrigado, enviarei seu comentário pra empresa ${companyName}`,
                  input: false,
                  options: null
                }
              }

              this.asyncChat(response, 100)
              this.asyncChat(message, 1000)
              this.termDisagreeFlow()
            }
            break
          }

          // end message after assign the Term
          case 811: {
            if (option.value) {
              let response = {
                type: 'Message',
                data: {
                  isBot: false,
                  message: 'Eu li e aceito o Termo de Recusa',
                  input: false,
                  options: null
                }
              }

              this.asyncChat(response, 100)
              // this.asyncChat(messageFinalDisagree, 1000)
              // this.asyncChat(survey1, 2000)
              this.asyncChat(emailField, 1000)
            } else {
              let response = {
                type: 'Message',
                data: {
                  isBot: false,
                  message: 'Quero visualizar a proposta',
                  input: false,
                  options: null
                }
              }

              this.flowRefusal = false
              this.asyncChat(response, 100)
              this.asyncChat(detailsParcels, 1500)
              this.asyncChat(optionsParcels, 3500)
            }
            break
          }
          case 82: {
            if (option.value === 'prev') {
              this.backToDisagree()
            } else {
              var conditionProposal = ''

              if (option.value.parcel === 1) {
                conditionProposal = `Eu gostaria de pagar R$ ${option.value.amount} à vista`
              } else {
                conditionProposal = `Eu gostaria de pagar R$ ${option.value.amount} em ${option.value.parcel} vezes`
              }

              let response = {
                type: 'Message',
                data: {
                  isBot: false,
                  message: conditionProposal,
                  input: false,
                  options: null
                }
              }

              let conditionResponse = ''

              if (option.value.parcel === 1) {
                conditionResponse = `Você confirma o envio da contraproposta de R$ ${option.value.amount} com pagamento à vista?`
              } else {
                conditionResponse = `Você confirma o envio da contraproposta de R$ ${option.value.amount} com parcelamento em ${option.value.parcel} vezes?`
              }

              let chat821 = {
                type: 'Options',
                data: {
                  id: 821,
                  isBot: true,
                  message: conditionResponse,
                  input: true,
                  options: [
                    {
                      show: false,
                      label: 'Confirmo',
                      value: true,
                      style: 'channelEmail'
                    },
                    {
                      show: false,
                      label: 'Quero refazer',
                      value: false,
                      style: 'channelSms'
                    }
                  ]
                }
              }

              this.asyncChat(response, 100)
              this.asyncChat(chat821, 1500)
            }
            break
          }
          case 821: {
            if (option.value) {
              let response = {
                type: 'Message',
                data: {
                  isBot: false,
                  message: `Sim eu confirmo o envio dessa contraproposta para a empresa ${companyName}`,
                  input: false,
                  options: null
                }
              }
              var chat822 = {
                type: 'Textarea',
                data: {
                  id: 822,
                  isBot: true,
                  message: 'Caso você tenha alguma observação enviaremos junto da sua contraproposta. Por favor preencha o campo abaixo:',
                  input: true,
                  required: false,
                  hint: 'campo não obrigatório',
                  options: {
                    show: false,
                    label: '',
                    value: ''
                  }
                }
              }
              this.asyncChat(response, 100)
              this.asyncChat(chat822, 1500)
            } else {
              let response = {
                type: 'Message',
                data: {
                  isBot: false,
                  message: 'Quero refazer a contraproposta',
                  input: false,
                  options: null
                }
              }
              // let counterProposal = {
              //   type: 'CounterProposal',
              //   data: {
              //     id: 82,
              //     isBot: true,
              //     message: 'Preencha os campos abaixo com valor total a ser pago e quantidade de parcelas que você gostaria',
              //     input: true,
              //     options: {
              //       value: '',
              //       parcels: ''
              //     }
              //   }
              // }
              this.asyncChat(response, 300)
              this.asyncChat(counterProposal, 1500)
            }
            break
          }
          case 822: {
            if (option.value === '') {
              let response = {
                type: 'Message',
                data: {
                  isBot: false,
                  message: 'Eu não tenho nenhuma sugestão pra enviar',
                  input: false,
                  options: null
                }
              }
              let message = {
                type: 'Message',
                data: {
                  isBot: true,
                  message: 'Sem problemas se você não tem sugestões pra enviar',
                  input: false,
                  options: null
                }
              }
              this.asyncChat(response, 300)
              this.asyncChat(message, 1000)
            } else {
              let response = {
                type: 'Message',
                data: {
                  isBot: false,
                  message: option.value,
                  input: false,
                  options: null
                }
              }

              let message = {
                type: 'Message',
                data: {
                  isBot: true,
                  message: `Muito obrigado, enviarei seu comentário pra empresa ${companyName}`,
                  input: false,
                  options: null
                }
              }
              this.asyncChat(response, 300)
              this.asyncChat(message, 1000)
            }

            this.termDisagreeFlow()
            break
          }
          case 83: {
            if (option.value === 'prev') {
              this.backToDisagree()
            } else {
              let response = {
                type: 'Message',
                data: {
                  isBot: false,
                  message: option.value,
                  input: false,
                  options: null
                }
              }
              let message = {
                type: 'Message',
                data: {
                  isBot: true,
                  message: `Muito obrigado, enviarei seu comentário pra empresa ${companyName}`,
                  input: false,
                  options: null
                }
              }
              this.asyncChat(response, 300)
              this.asyncChat(message, 1000)
              // this.asyncChat(termAgree, 4000)
              // this.asyncChat(optionsRefuseTerm, 6000)
              this.termDisagreeFlow()
            }
            break
          }
          case 100: {
            if (option.value) {
              let response = {
                type: 'Message',
                data: {
                  isBot: false,
                  message: 'Quero responder as perguntas',
                  input: false,
                  options: null
                }
              }

              this.asyncChat(response, 300)
              this.asyncChat(survey1, 1000)
            } else {
              let response = {
                type: 'Message',
                data: {
                  isBot: false,
                  message: 'Eu não quero responder as perguntas',
                  input: false,
                  options: null
                }
              }
              let final = {
                type: 'Message',
                data: {
                  isBot: true,
                  message: 'Entendi, encerramos por aqui nossa conversa. Muito obrigado.',
                  input: false,
                  options: null
                }
              }
              this.asyncChat(response, 300)
              this.asyncChat(final, 1000)
            }
            break
          }
          case 101: {
            let response = {
              type: 'Message',
              data: {
                isBot: false,
                message: option.value,
                input: false,
                options: null
              }
            }

            this.asyncChat(response, 300)
            this.asyncChat(survey2, 1000)
            break
          }
          case 102: {
            let response = {
              type: 'Message',
              data: {
                isBot: false,
                message: option.value,
                input: false,
                options: null
              }
            }

            this.asyncChat(response, 300)
            this.asyncChat(survey3, 1000)
            break
          }
          case 103: {
            let response = {
              type: 'Message',
              data: {
                isBot: false,
                message: option.value,
                input: false,
                options: null
              }
            }
            if (this.flowRefusal) {
              this.asyncChat(response, 300)
              this.asyncChat(messageAfterSurvey, 1000)
            } else {
              this.asyncChat(response, 300)
              this.asyncChat(survey4, 1000)
            }
            break
          }
          case 104: {
            let response = {
              type: 'Message',
              data: {
                isBot: false,
                message: option.value,
                input: false,
                options: null
              }
            }

            this.asyncChat(response, 300)
            this.asyncChat(messageAfterSurvey, 1000)
            break
          }
        }
      },
      asyncChat (obj, delay) {
        return new Promise(() => {
          setTimeout(() => {
            // this.setDataLocalStorage(obj)
            this.components.push(obj)
          }, delay)
        })
      },
      setDataLocalStorage (obj) {
        let result = JSON.stringify(obj)
        let chat = JSON.parse(localStorage.getItem('chat'))
        let chatFiltered = chat.filter((item) => {
          return item !== obj
        })

        chatFiltered.push(result)
        localStorage.setItem('chat', JSON.stringify(chatFiltered))
      },
      startChat () {
        // this.asyncChat(list[0], 1000)
        // this.asyncChat(list[1], 2000)
        // this.asyncChat(list[2], 4000)
      },
      restartChat () {
        this.anime({
          targets: '.refresh-chat',
          rotate: [0, -360],
          duration: 1000,
          easing: 'easeInOutSine'
        })

        localStorage.setItem('chat', JSON.stringify([]))
        this.components = []
        this.startChat()
      },
      checkHasData () {
        if (!localStorage.getItem('chat')) {
          localStorage.setItem('chat', JSON.stringify([]))
        }
        setTimeout(() => {
          // if (JSON.parse(localStorage.getItem('chat')).length === 0) {
          //   this.startChat()
          // } else {
          //   let result = JSON.parse(localStorage.getItem('chat'))
          //   localStorage.setItem('chat', JSON.stringify([]))

          //   let renderList = new Promise((resolve) => {
          //     let list = result.map((item, index) => {
          //       this.asyncChat(JSON.parse(item), 100 * index)
          //     })
          //     resolve(list)
          //   })

          //   renderList.then(() => {
          //     this.showLastMessage = true
          //   })
          // }
          // if (this.lists.length === 0) {
          //   this.startChat()
          // } else {
          //   let renderList = new Promise((resolve) => {
          //   let list = this.lists.map((item, index) => {
          //       this.asyncChat(JSON.parse(item), 100 * index)
          //     })
          //     resolve(list)
          //   })

          //   renderList.then(() => {
          //     this.showLastMessage = true
          //   })
          // }
        }, 1000)
      },
      backToDisagree () {
        let response = {
          type: 'Message',
          data: {
            isBot: false,
            message: 'Quero voltar para os outros motivos da recusa',
            input: false,
            options: null
          }
        }
        this.flowRefusal = true
        this.asyncChat(response, 100)
        this.asyncChat(disagree, 1500)
      },
      hotJar () {
        (function (h, o, t, j, a, r) {
          h.hj = h.hj || function () { (h.hj.q = h.hj.q || []).push(arguments) }
          h._hjSettings = {hjid: 1129192, hjsv: 6}
          a = o.getElementsByTagName('head')[0]
          r = o.createElement('script')
          r.async = 1
          r.src = t + h._hjSettings.hjid + j + h._hjSettings.hjsv
          a.appendChild(r)
        })(window, document, 'https://static.hotjar.com/c/hotjar-', '.js?sv=')
      },
      termDisagreeFlow () {
        this.asyncChat(termDisagree, 4000)
        // this.asyncChat(optionsRefuseTerm, 6000)
      },
      mouseFlow () {
        (function () {
          window._mfq = window._mfq || []
          var mf = document.createElement('script')
          mf.type = 'text/javascript'
          mf.async = true
          mf.src = '//cdn.mouseflow.com/projects/cc0cfdd5-e956-4a2b-8254-4d624efa0bc9.js'
          document.getElementsByTagName('head')[0].appendChild(mf)
        })()
      }
    },
    mounted () {
      this.startChat()
      // this.checkHasData()
      // this.checkLocalstorage()
      // localStorage.setItem('token', 'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJzdHJhd19oYXQiLCJleHAiOjE1NDc0OTUxNzcsImlhdCI6MTU0NTA3NTk3NywiaXNzIjoic3RyYXdfaGF0IiwianRpIjoiMGU4N2UyOWMtZDg5OC00N2I5LTk4ZmItNjRkMmVlMDY2NjI4IiwibmJmIjoxNTQ1MDc1OTc2LCJzdWIiOiJhY2NvdW50OmM2NzY2Y2Q5LWU2ZDUtNGMwOC05YTMxLWE4MjNjODhmNDU2MCIsInR5cCI6ImFjY2VzcyJ9.TFBcCnZelJH6zt-i_Aqoc6GIdir_YvBbJ4L_A2nvI0f_Bvi4whplvZ9quFzS9t3qbUc4liOcwFLplrSHj6weog')
    }
  }
</script>


<style lang="sass">
  @import '../../assets/style/variables'
  // @import '../assets/style/placeholder'

  $spaceTopbar: 50px
  $radius: 10px
  $inputArea: 130px

  .application .theme--dark.btn.btn--disabled:not(.btn--icon):not(.btn--flat),
  .theme--dark .btn.btn--disabled:not(.btn--icon):not(.btn--flat)
    background: rgba(0,0,0,.12)!important
    color: rgba(0,0,0,.26)!important

  .chat
    height: 100vh

    .time-hour
      position: absolute
      top: -20px
      font-size: 11px
      right: 5px
      color: $textColor

    .is-bot .time-hour
      left: 5px
      right: auto

    .input-component
      opacity: 0
      transform: translateY(400px)

      > .card
        width: 100%

      .container
        max-width: 600px

    .table-chat,
    .box-card
      margin: 0 50px 30px
      border-radius: $radius

      .table
        border-radius: $radius

      tbody
        td
          color: $darkGray

        tr
          &:nth-child(odd) td
            background: $bgColor

          &:last-child,
          &:last-child td
            // border-bottom-left-radius: $radius
            // border-bottom-right-radius: $radius


    .input-area
      width: 100%
      height: 100px
      position: fixed
      bottom: 0
      left: 0
      padding: 0
      background: $light


      .container
        padding: 15px

    .logo-topbar
      display: flex
      align-items: center
      color: $light

      h1
        display: flex
        margin-right: 10px

      p
        font-size: 16px

    .logo
        width: 30%

    .btn-big
      height: 70px
      margin: 0 0 0 15px

  .chat-content
    height: calc(100vh - 50px)

    .card:first-child
      // height: calc(100% - 25px)!important
      // overflow: hidden

  .chat-main
    height: 100vh
    width: 100%

    > .container
      margin-top: 0
      height: 100vh
      max-width: 100%

  .chat-scroll
    padding-top: $spaceTopbar * 2

  @media screen and (min-width: $max-mobile + 1)

    .chat-scroll
      // overflow-y: auto
      // -webkit-overflow-scrolling: touch
      // -moz-overflow-scrolling: touch
      // -ms-overflow-scrolling: touch
      // overflow-scrolling: touch
      padding-bottom: ($spaceTopbar * 2) + 20


  @media screen and (max-width: $max-mobile)

    body
      padding-top: $spaceTopbar * 2

    .chat-scroll
      padding-bottom: 100px

    .chat

      .input-area
        // bottom: -10px
        bottom: 0

      .toolbar__content .logo-topbar:not(.btn):not(.menu):first-child:not(:only-child)
        margin: 0 16px

        .logo
          width: 20%

      .ellipsis
        max-width: 100%

      .table-chat,
      .box-card
        margin: 0 5px 30px

      .btn-mobile-prev i
        margin-left: 5px

      .btn-mobile-save
        margin-right: 0
        margin-left: 0

      .btn-mobile-prev
        margin-right: 0

      .btn-big
        // height: 36px
        margin: 0 0 0 15px

</style>
