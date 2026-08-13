const formTypeTemplate = '{label} não é um {type} válido'

export default {
  _sard: {
    actionSheet: {
      cancel: 'Cancelar',
    },
    calendar: {
      weeks: {
        0: 'Dom',
        1: 'Seg',
        2: 'Ter',
        3: 'Qua',
        4: 'Qui',
        5: 'Sex',
        6: 'Sáb',
      },
      abbrWeeks: {
        0: 'Dom',
        1: 'Seg',
        2: 'Ter',
        3: 'Qua',
        4: 'Qui',
        5: 'Sex',
        6: 'Sáb',
      },
      fullWeeks: {
        0: 'Domingo',
        1: 'Segunda-feira',
        2: 'Terça-feira',
        3: 'Quarta-feira',
        4: 'Quinta-feira',
        5: 'Sexta-feira',
        6: 'Sábado',
      },
      monthTitle: '{month}/{year}',
      start: 'início',
      end: 'fim',
      to: 'a',
      multipleOutlet: '{count} datas selecionadas',
    },
    cascader: {
      pleaseSelect: 'Selecionar',
      error: 'Falha na solicitação, clique para recarregar',
      noData: 'Sem dados',
    },
    cropImage: {
      confirm: 'Confirmar',
      cancel: 'Cancelar',
    },
    datetimePicker: {
      y: '',
      M: '',
      d: '',
      h: '',
      m: '',
      s: '',
    },
    datetimeRangePickerInput: {
      to: 'a',
    },
    dialog: {
      confirm: 'Confirmar',
      cancel: 'Cancelar',
    },
    empty: {
      noData: 'Sem dados',
    },
    form: {
      defaultValidateMessages: {
        default: 'Erro de validação do campo {label}',
        required: '{label} é obrigatório',
        enum: '{label} deve ser um de [{enum}]',
        whitespace: '{label} não pode ser um caractere em branco',
        date: {
          format: 'O formato da data de {label} é inválido',
          parse: '{label} não pode ser convertido em data',
          invalid: '{label} é uma data inválida',
        },
        types: {
          string: formTypeTemplate,
          function: formTypeTemplate,
          array: formTypeTemplate,
          object: formTypeTemplate,
          number: formTypeTemplate,
          date: formTypeTemplate,
          boolean: formTypeTemplate,
          integer: formTypeTemplate,
          float: formTypeTemplate,
          regexp: formTypeTemplate,
          email: formTypeTemplate,
          url: formTypeTemplate,
          hex: formTypeTemplate,
        },
        string: {
          len: '{label} deve ter {len} caracteres',
          min: '{label} deve ter pelo menos {min} caracteres',
          max: '{label} deve ter no máximo {max} caracteres',
          range: '{label} deve ter entre {min}-{max} caracteres',
        },
        number: {
          len: '{label} deve ser igual a {len}',
          min: '{label} deve ser no mínimo {min}',
          max: '{label} deve ser no máximo {max}',
          range: '{label} deve estar entre {min}-{max}',
        },
        array: {
          len: 'Deve haver {len} {label}',
          min: 'Pelo menos {min} {label}',
          max: 'No máximo {max} {label}',
          range: 'A quantidade de {label} deve estar entre {min}-{max}',
        },
        pattern: {
          mismatch: '{label} não corresponde ao padrão {pattern}',
        },
      },
    },
    loadMore: {
      incompleteText: 'Clique para carregar mais',
      loadingText: 'Carregando...',
      completeText: 'Não há mais',
      errorText: 'Falha na solicitação, clique para recarregar',
    },
    pagination: {
      previous: 'Anterior',
      next: 'Próximo',
    },
    popout: {
      confirm: 'Confirmar',
      cancel: 'Cancelar',
    },
    pullDownRefresh: {
      unready: 'Puxe para baixo para atualizar',
      ready: 'Solte para atualizar',
      loading: 'Carregando...',
      doneSuccess: 'Atualização bem-sucedida',
      doneFail: 'Falha na atualização',
    },
    readMore: {
      fold: 'recolher',
      unfold: 'expandir',
    },
    select: {
      selected: '{num} itens selecionados',
      selectAll: 'Selecionar tudo',
      clearSelect: 'Limpar seleção',
    },
    shareSheet: {
      cancel: 'Cancelar',
    },
    signature: {
      confirm: 'Confirmar',
      clear: 'Limpar',
      cancel: 'Cancelar',
    },
    tree: {
      addSibling: 'Adicionar nó irmão',
      addChild: 'Adicionar nó filho',
      addRoot: 'Adicionar nó raiz',
      removeNode: 'Remover nó',
      edit: 'Editar nó',
      please: 'Digite o título',
      error: 'Falha na solicitação, clique para recarregar',
      noData: 'Sem dados',
    },
  },
}
