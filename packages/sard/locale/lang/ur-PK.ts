const formTypeTemplate = '{label} ایک درست {type} نہیں ہے'

export default {
  _sard: {
    actionSheet: {
      cancel: 'منسوخ کریں',
    },
    calendar: {
      weeks: {
        0: 'اتوار',
        1: 'پیر',
        2: 'منگل',
        3: 'بدھ',
        4: 'جمعرات',
        5: 'جمعہ',
        6: 'ہفتہ',
      },
      abbrWeeks: {
        0: 'اتوار',
        1: 'پیر',
        2: 'منگل',
        3: 'بدھ',
        4: 'جمعرات',
        5: 'جمعہ',
        6: 'ہفتہ',
      },
      fullWeeks: {
        0: 'اتوار',
        1: 'پیر',
        2: 'منگل',
        3: 'بدھ',
        4: 'جمعرات',
        5: 'جمعہ',
        6: 'ہفتہ',
      },
      monthTitle: '{month}/{year}',
      start: 'شروع',
      end: 'اختتام',
      to: 'سے',
      multipleOutlet: '{count} تاریخیں منتخب',
    },
    cascader: {
      pleaseSelect: 'براہ کرم منتخب کریں',
      error: 'درخواست ناکام، دوبارہ لوڈ کرنے کے لیے کلک کریں',
      noData: 'کوئی ڈیٹا نہیں',
    },
    cropImage: {
      confirm: 'تصدیق کریں',
      cancel: 'منسوخ کریں',
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
      to: 'سے',
    },
    dialog: {
      confirm: 'تصدیق کریں',
      cancel: 'منسوخ کریں',
    },
    empty: {
      noData: 'کوئی ڈیٹا نہیں',
    },
    form: {
      defaultValidateMessages: {
        default: '{label} فیلڈ کی توثیق میں خرابی',
        required: '{label} ضروری ہے',
        enum: '{label} [{enum}] میں سے ایک ہونا چاہیے',
        whitespace: '{label} خالی حرف نہیں ہو سکتا',
        date: {
          format: '{label} تاریخ کا فارمیٹ غلط ہے',
          parse: '{label} کو تاریخ میں تبدیل نہیں کیا جا سکتا',
          invalid: '{label} ایک غلط تاریخ ہے',
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
          len: '{label} {len} حروف کا ہونا چاہیے',
          min: '{label} کم از کم {min} حروف کا ہونا چاہیے',
          max: '{label} زیادہ سے زیادہ {max} حروف کا ہونا چاہیے',
          range: '{label} {min}-{max} حروف کے درمیان ہونا چاہیے',
        },
        number: {
          len: '{label} {len} کے برابر ہونا چاہیے',
          min: '{label} کم از کم {min} ہونا چاہیے',
          max: '{label} زیادہ سے زیادہ {max} ہونا چاہیے',
          range: '{label} {min}-{max} کے درمیان ہونا چاہیے',
        },
        array: {
          len: '{len} {label} ہونے چاہئیں',
          min: 'کم از کم {min} {label}',
          max: 'زیادہ سے زیادہ {max} {label}',
          range: '{label} کی تعداد {min}-{max} کے درمیان ہونی چاہیے',
        },
        pattern: {
          mismatch: '{label} پیٹرن {pattern} سے مطابقت نہیں رکھتا',
        },
      },
    },
    loadMore: {
      incompleteText: 'مزید لوڈ کرنے کے لیے کلک کریں',
      loadingText: 'لوڈ ہو رہا ہے...',
      completeText: 'مزید نہیں ہے',
      errorText: 'درخواست ناکام، دوبارہ لوڈ کرنے کے لیے کلک کریں',
    },
    pagination: {
      previous: 'پچھلا',
      next: 'اگلا',
    },
    popout: {
      confirm: 'تصدیق کریں',
      cancel: 'منسوخ کریں',
    },
    pullDownRefresh: {
      unready: 'ریفریش کرنے کے لیے نیچے کھینچیں',
      ready: 'ریفریش کرنے کے لیے چھوڑ دیں',
      loading: 'لوڈ ہو رہا ہے...',
      doneSuccess: 'ریفریش کامیاب',
      doneFail: 'ریفریش ناکام',
    },
    readMore: {
      fold: 'سکیڑیں',
      unfold: 'پھیلائیں',
    },
    select: {
      selected: '{num} آئٹمز منتخب',
      selectAll: 'سب منتخب کریں',
      clearSelect: 'انتخاب صاف کریں',
    },
    shareSheet: {
      cancel: 'منسوخ کریں',
    },
    signature: {
      confirm: 'تصدیق کریں',
      clear: 'صاف کریں',
      cancel: 'منسوخ کریں',
    },
    tree: {
      addSibling: 'ہم سطح نوڈ شامل کریں',
      addChild: 'ذیلی نوڈ شامل کریں',
      addRoot: 'بنیادی نوڈ شامل کریں',
      removeNode: 'نوڈ حذف کریں',
      edit: 'نوڈ میں ترمیم کریں',
      please: 'براہ کرم عنوان درج کریں',
      error: 'درخواست ناکام، دوبارہ لوڈ کرنے کے لیے کلک کریں',
      noData: 'کوئی ڈیٹا نہیں',
    },
  },
}
