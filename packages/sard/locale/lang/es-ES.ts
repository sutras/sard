const formTypeTemplate = '{label} no es un {type} válido'

export default {
  _sard: {
    actionSheet: {
      cancel: 'Cancelar',
    },
    calendar: {
      weeks: {
        0: 'Dom',
        1: 'Lun',
        2: 'Mar',
        3: 'Mié',
        4: 'Jue',
        5: 'Vie',
        6: 'Sáb',
      },
      abbrWeeks: {
        0: 'Dom',
        1: 'Lun',
        2: 'Mar',
        3: 'Mié',
        4: 'Jue',
        5: 'Vie',
        6: 'Sáb',
      },
      fullWeeks: {
        0: 'Domingo',
        1: 'Lunes',
        2: 'Martes',
        3: 'Miércoles',
        4: 'Jueves',
        5: 'Viernes',
        6: 'Sábado',
      },
      monthTitle: '{month}/{year}',
      start: 'inicio',
      end: 'fin',
      to: 'a',
      multipleOutlet: 'Se seleccionaron {count} fechas',
    },
    cascader: {
      pleaseSelect: 'Seleccionar',
      error: 'Error en la solicitud, haga clic para recargar',
      noData: 'Sin datos',
    },
    cropImage: {
      confirm: 'Aceptar',
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
      confirm: 'Aceptar',
      cancel: 'Cancelar',
    },
    empty: {
      noData: 'Sin datos',
    },
    form: {
      defaultValidateMessages: {
        default: 'Error de validación del campo {label}',
        required: '{label} es obligatorio',
        enum: '{label} debe ser uno de [{enum}]',
        whitespace: '{label} no puede ser un carácter en blanco',
        date: {
          format: 'El formato de fecha de {label} no es válido',
          parse: '{label} no se puede convertir a fecha',
          invalid: '{label} es una fecha no válida',
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
          len: '{label} debe tener {len} caracteres',
          min: '{label} debe tener al menos {min} caracteres',
          max: '{label} debe tener como máximo {max} caracteres',
          range: '{label} debe tener entre {min}-{max} caracteres',
        },
        number: {
          len: '{label} debe ser igual a {len}',
          min: '{label} debe ser como mínimo {min}',
          max: '{label} debe ser como máximo {max}',
          range: '{label} debe estar entre {min}-{max}',
        },
        array: {
          len: 'Debe haber {len} {label}',
          min: 'Al menos {min} {label}',
          max: 'Como máximo {max} {label}',
          range: 'La cantidad de {label} debe estar entre {min}-{max}',
        },
        pattern: {
          mismatch: '{label} no coincide con el patrón {pattern}',
        },
      },
    },
    loadMore: {
      incompleteText: 'Haga clic para cargar más',
      loadingText: 'Cargando...',
      completeText: 'No hay más',
      errorText: 'Error en la solicitud, haga clic para recargar',
    },
    pagination: {
      previous: 'Anterior',
      next: 'Siguiente',
    },
    popout: {
      confirm: 'Aceptar',
      cancel: 'Cancelar',
    },
    pullDownRefresh: {
      unready: 'Desliza hacia abajo para actualizar',
      ready: 'Suelta para actualizar',
      loading: 'Cargando...',
      doneSuccess: 'Actualización correcta',
      doneFail: 'Error al actualizar',
    },
    readMore: {
      fold: 'plegar',
      unfold: 'desplegar',
    },
    select: {
      selected: '{num} elementos seleccionados',
      selectAll: 'Seleccionar todo',
      clearSelect: 'Limpiar selección',
    },
    shareSheet: {
      cancel: 'Cancelar',
    },
    signature: {
      confirm: 'Aceptar',
      clear: 'Limpiar',
      cancel: 'Cancelar',
    },
    tree: {
      addSibling: 'Agregar nodo hermano',
      addChild: 'Agregar nodo hijo',
      addRoot: 'Agregar nodo raíz',
      removeNode: 'Eliminar nodo',
      edit: 'Editar nodo',
      please: 'Ingrese el título',
      error: 'Error en la solicitud, haga clic para recargar',
      noData: 'Sin datos',
    },
  },
}
