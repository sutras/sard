const formTypeTemplate = '{label} یک {type} معتبر نیست'

export default {
  _sard: {
    actionSheet: {
      cancel: 'انصراف',
    },
    calendar: {
      weeks: {
        0: 'یک‌شنبه',
        1: 'دوشنبه',
        2: 'سه‌شنبه',
        3: 'چهارشنبه',
        4: 'پنجشنبه',
        5: 'جمعه',
        6: 'شنبه',
      },
      abbrWeeks: {
        0: 'یک',
        1: 'دو',
        2: 'سه',
        3: 'چهار',
        4: 'پنج',
        5: 'جمعه',
        6: 'شنبه',
      },
      fullWeeks: {
        0: 'یک‌شنبه',
        1: 'دوشنبه',
        2: 'سه‌شنبه',
        3: 'چهارشنبه',
        4: 'پنجشنبه',
        5: 'جمعه',
        6: 'شنبه',
      },
      monthTitle: '{year}/{month}',
      start: 'شروع',
      end: 'پایان',
      to: 'تا',
      multipleOutlet: '{count} تاریخ انتخاب شده',
    },
    cascader: {
      pleaseSelect: 'لطفاً انتخاب کنید',
      error: 'درخواست ناموفق بود، برای بارگذاری مجدد کلیک کنید',
      noData: 'داده‌ای وجود ندارد',
    },
    cropImage: {
      confirm: 'تأیید',
      cancel: 'انصراف',
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
      to: 'تا',
    },
    dialog: {
      confirm: 'تأیید',
      cancel: 'انصراف',
    },
    empty: {
      noData: 'داده‌ای وجود ندارد',
    },
    form: {
      defaultValidateMessages: {
        default: 'خطای اعتبارسنجی فیلد {label}',
        required: '{label} الزامی است',
        enum: '{label} باید یکی از [{enum}] باشد',
        whitespace: '{label} نمی‌تواند خالی باشد',
        date: {
          format: 'فرمت تاریخ {label} نامعتبر است',
          parse: '{label} نمی‌تواند به تاریخ تبدیل شود',
          invalid: '{label} تاریخ نامعتبر است',
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
          len: '{label} باید {len} کاراکتر باشد',
          min: '{label} باید حداقل {min} کاراکتر باشد',
          max: '{label} باید حداکثر {max} کاراکتر باشد',
          range: '{label} باید بین {min}-{max} کاراکتر باشد',
        },
        number: {
          len: '{label} باید برابر {len} باشد',
          min: '{label} باید حداقل {min} باشد',
          max: '{label} باید حداکثر {max} باشد',
          range: '{label} باید بین {min}-{max} باشد',
        },
        array: {
          len: 'باید {len} {label} باشد',
          min: 'حداقل {min} {label}',
          max: 'حداکثر {max} {label}',
          range: 'تعداد {label} باید بین {min}-{max} باشد',
        },
        pattern: {
          mismatch: '{label} با الگوی {pattern} مطابقت ندارد',
        },
      },
    },
    loadMore: {
      incompleteText: 'برای نمایش موارد بیشتر کلیک کنید',
      loadingText: 'در حال بارگذاری...',
      completeText: 'مورد دیگری وجود ندارد',
      errorText: 'درخواست ناموفق بود، برای بارگذاری مجدد کلیک کنید',
    },
    pagination: {
      previous: 'قبلی',
      next: 'بعدی',
    },
    popout: {
      confirm: 'تأیید',
      cancel: 'انصراف',
    },
    pullDownRefresh: {
      unready: 'برای تازه‌سازی به پایین بکشید',
      ready: 'برای تازه‌سازی رها کنید',
      loading: 'در حال بارگذاری...',
      doneSuccess: 'تازه‌سازی با موفقیت انجام شد',
      doneFail: 'تازه‌سازی ناموفق بود',
    },
    readMore: {
      fold: 'جمع‌کردن',
      unfold: 'بازکردن',
    },
    select: {
      selected: '{num} مورد انتخاب شده',
      selectAll: 'انتخاب همه',
      clearSelect: 'پاک‌کردن انتخاب',
    },
    shareSheet: {
      cancel: 'انصراف',
    },
    signature: {
      confirm: 'تأیید',
      clear: 'پاک‌کردن',
      cancel: 'انصراف',
    },
    tree: {
      addSibling: 'افزودن گره هم‌سطح',
      addChild: 'افزودن گره فرزند',
      addRoot: 'افزودن گره ریشه',
      removeNode: 'حذف گره',
      edit: 'ویرایش گره',
      please: 'لطفاً عنوان را وارد کنید',
      error: 'درخواست ناموفق بود، برای بارگذاری مجدد کلیک کنید',
      noData: 'داده‌ای وجود ندارد',
    },
  },
}
