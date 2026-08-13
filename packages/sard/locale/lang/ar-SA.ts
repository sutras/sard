const formTypeTemplate = '{label} ليس {type} صالحاً'

export default {
  _sard: {
    actionSheet: {
      cancel: 'إلغاء',
    },
    calendar: {
      weeks: {
        0: 'الأحد',
        1: 'الاثنين',
        2: 'الثلاثاء',
        3: 'الأربعاء',
        4: 'الخميس',
        5: 'الجمعة',
        6: 'السبت',
      },
      monthTitle: '{year}/{month}',
      start: 'بداية',
      end: 'نهاية',
      to: 'إلى',
      multipleOutlet: 'تم اختيار {count} تاريخ',
    },
    cascader: {
      pleaseSelect: 'الرجاء الاختيار',
      error: 'الطلب فشل، انقر لإعادة التحميل',
      noData: 'لا توجد بيانات',
    },
    cropImage: {
      confirm: 'موافق',
      cancel: 'إلغاء',
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
      to: 'إلى',
    },
    dialog: {
      confirm: 'موافق',
      cancel: 'إلغاء',
    },
    empty: {
      noData: 'لا توجد بيانات',
    },
    form: {
      defaultValidateMessages: {
        default: 'خطأ في التحقق من حقل {label}',
        required: '{label} مطلوب',
        enum: '{label} يجب أن يكون واحداً من [{enum}]',
        whitespace: '{label} لا يمكن أن يكون حرفاً فارغاً',
        date: {
          format: 'تنسيق تاريخ {label} غير صالح',
          parse: '{label} لا يمكن تحويله إلى تاريخ',
          invalid: '{label} تاريخ غير صالح',
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
          len: '{label} يجب أن يكون {len} حرفاً',
          min: '{label} يجب أن يكون على الأقل {min} حرفاً',
          max: '{label} يجب أن يكون على الأكثر {max} حرفاً',
          range: '{label} يجب أن يكون بين {min}-{max} حرفاً',
        },
        number: {
          len: '{label} يجب أن يساوي {len}',
          min: '{label} يجب أن يكون الحد الأدنى {min}',
          max: '{label} يجب أن يكون الحد الأقصى {max}',
          range: '{label} يجب أن يكون بين {min}-{max}',
        },
        array: {
          len: 'يجب أن يكون {len} {label}',
          min: 'على الأقل {min} {label}',
          max: 'على الأكثر {max} {label}',
          range: 'يجب أن تكون كمية {label} بين {min}-{max}',
        },
        pattern: {
          mismatch: '{label} لا يتطابق مع النمط {pattern}',
        },
      },
    },
    loadMore: {
      incompleteText: 'انقر لتحميل المزيد',
      loadingText: 'جار التحميل...',
      completeText: 'لا يوجد المزيد',
      errorText: 'الطلب فشل، انقر لإعادة التحميل',
    },
    pagination: {
      previous: 'السابق',
      next: 'التالي',
    },
    popout: {
      confirm: 'موافق',
      cancel: 'إلغاء',
    },
    pullDownRefresh: {
      unready: 'اسحب للأسفل للتحديث',
      ready: 'حرر للتحديث',
      loading: 'جار التحميل...',
      doneSuccess: 'تم التحديث بنجاح',
      doneFail: 'فشل التحديث',
    },
    readMore: {
      fold: 'طي',
      unfold: 'توسيع',
    },
    select: {
      selected: 'تم اختيار {num} عناصر',
      selectAll: 'اختيار الكل',
      clearSelect: 'مسح الاختيار',
    },
    shareSheet: {
      cancel: 'إلغاء',
    },
    signature: {
      confirm: 'موافق',
      clear: 'مسح',
      cancel: 'إلغاء',
    },
    tree: {
      addSibling: 'إضافة عقدة شقيقة',
      addChild: 'إضافة عقدة فرعية',
      addRoot: 'إضافة عقدة جذرية',
      removeNode: 'إزالة العقدة',
      edit: 'تحرير العقدة',
      please: 'الرجاء إدخال العنوان',
      error: 'الطلب فشل، انقر لإعادة التحميل',
      noData: 'لا توجد بيانات',
    },
  },
}
