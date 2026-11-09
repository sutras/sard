const formTypeTemplate = '{label} не является допустимым {type}'

export default {
  _sard: {
    actionSheet: {
      cancel: 'Отмена',
    },
    calendar: {
      weeks: {
        0: 'Вс',
        1: 'Пн',
        2: 'Вт',
        3: 'Ср',
        4: 'Чт',
        5: 'Пт',
        6: 'Сб',
      },
      monthTitle: '{month}.{year}',
      start: 'начало',
      end: 'конец',
      to: 'по',
      multipleOutlet: 'Выбрано дат: {count}',
    },
    cascader: {
      pleaseSelect: 'Пожалуйста, выберите',
      error: 'Ошибка запроса, нажмите для перезагрузки',
      noData: 'Нет данных',
    },
    cropImage: {
      confirm: 'ОК',
      cancel: 'Отмена',
    },
    datetimePicker: {
      y: 'г',
      M: 'мес',
      d: 'д',
      h: 'ч',
      m: 'мин',
      s: 'с',
    },
    datetimeRangePickerInput: {
      to: 'по',
    },
    dialog: {
      confirm: 'ОК',
      cancel: 'Отмена',
    },
    empty: {
      noData: 'Нет данных',
    },
    form: {
      defaultValidateMessages: {
        default: 'Ошибка проверки поля {label}',
        required: 'Поле {label} обязательно',
        enum: '{label} должно быть одним из [{enum}]',
        whitespace: '{label} не может быть пустым',
        date: {
          format: 'Неверный формат даты {label}',
          parse: '{label} не может быть преобразовано в дату',
          invalid: '{label} является недопустимой датой',
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
          len: '{label} должно содержать {len} символов',
          min: '{label} должно содержать не менее {min} символов',
          max: '{label} должно содержать не более {max} символов',
          range: '{label} должно содержать от {min} до {max} символов',
        },
        number: {
          len: '{label} должно быть равно {len}',
          min: '{label} должно быть не меньше {min}',
          max: '{label} должно быть не больше {max}',
          range: '{label} должно быть в диапазоне {min}-{max}',
        },
        array: {
          len: 'Количество {label} должно быть равно {len}',
          min: 'Количество {label} должно быть не менее {min}',
          max: 'Количество {label} должно быть не более {max}',
          range: 'Количество {label} должно быть от {min} до {max}',
        },
        pattern: {
          mismatch: '{label} не соответствует шаблону {pattern}',
        },
      },
    },
    loadMore: {
      incompleteText: 'Нажмите, чтобы загрузить ещё',
      loadingText: 'Загрузка...',
      errorText: 'Ошибка запроса, нажмите для перезагрузки',
      completeText: 'Больше нет данных',
    },
    pagination: {
      previous: 'Назад',
      next: 'Вперёд',
    },
    popout: {
      confirm: 'ОК',
      cancel: 'Отмена',
    },
    pullDownRefresh: {
      unready: 'Потяните вниз для обновления',
      ready: 'Отпустите для обновления',
      loading: 'Загрузка...',
      doneSuccess: 'Обновление выполнено',
      doneFail: 'Не удалось обновить',
    },
    readMore: {
      fold: 'Свернуть',
      unfold: 'Развернуть',
    },
    select: {
      selected: 'Выбрано: {num}',
      selectAll: 'Выбрать все',
      clearSelect: 'Очистить выбор',
    },
    shareSheet: {
      cancel: 'Отмена',
    },
    signature: {
      confirm: 'ОК',
      clear: 'Очистить',
      cancel: 'Отмена',
    },
    tree: {
      addSibling: 'Добавить соседний узел',
      addChild: 'Добавить дочерний узел',
      addRoot: 'Добавить корневой узел',
      removeNode: 'Удалить узел',
      edit: 'Редактировать узел',
      please: 'Введите заголовок',
      error: 'Ошибка запроса, нажмите для перезагрузки',
      noData: 'Нет данных',
    },
  },
}
