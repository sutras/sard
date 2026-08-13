const formTypeTemplate = '{label} একটি বৈধ {type} নয়'

export default {
  _sard: {
    actionSheet: {
      cancel: 'বাতিল',
    },
    calendar: {
      weeks: {
        0: 'রবি',
        1: 'সোম',
        2: 'মঙ্গল',
        3: 'বুধ',
        4: 'বৃহঃ',
        5: 'শুক্র',
        6: 'শনি',
      },
      abbrWeeks: {
        0: 'রবি',
        1: 'সোম',
        2: 'মঙ্গল',
        3: 'বুধ',
        4: 'বৃহঃ',
        5: 'শুক্র',
        6: 'শনি',
      },
      fullWeeks: {
        0: 'রবিবার',
        1: 'সোমবার',
        2: 'মঙ্গলবার',
        3: 'বুধবার',
        4: 'বৃহস্পতিবার',
        5: 'শুক্রবার',
        6: 'শনিবার',
      },
      monthTitle: '{month}/{year}',
      start: 'শুরু',
      end: 'শেষ',
      to: 'থেকে',
      multipleOutlet: '{count}টি তারিখ নির্বাচিত',
    },
    cascader: {
      pleaseSelect: 'নির্বাচন করুন',
      error: 'অনুরোধ ব্যর্থ হয়েছে, পুনরায় লোড করতে ক্লিক করুন',
      noData: 'কোনো তথ্য নেই',
    },
    cropImage: {
      confirm: 'নিশ্চিত',
      cancel: 'বাতিল',
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
      to: 'থেকে',
    },
    dialog: {
      confirm: 'নিশ্চিত',
      cancel: 'বাতিল',
    },
    empty: {
      noData: 'কোনো তথ্য নেই',
    },
    form: {
      defaultValidateMessages: {
        default: '{label} ক্ষেত্র যাচাই ত্রুটি',
        required: '{label} আবশ্যক',
        enum: '{label} অবশ্যই [{enum}] এর একটি হতে হবে',
        whitespace: '{label} ফাঁকা অক্ষর হতে পারে না',
        date: {
          format: '{label} তারিখের ফরম্যাট অবৈধ',
          parse: '{label} তারিখে রূপান্তর করা যাবে না',
          invalid: '{label} একটি অবৈধ তারিখ',
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
          len: '{label} {len}টি অক্ষর হতে হবে',
          min: '{label} কমপক্ষে {min}টি অক্ষর হতে হবে',
          max: '{label} সর্বাধিক {max}টি অক্ষর হতে হবে',
          range: '{label} {min}-{max}টি অক্ষরের মধ্যে হতে হবে',
        },
        number: {
          len: '{label} অবশ্যই {len} এর সমান হতে হবে',
          min: '{label} সর্বনিম্ন {min} হতে হবে',
          max: '{label} সর্বাধিক {max} হতে হবে',
          range: '{label} {min}-{max} এর মধ্যে হতে হবে',
        },
        array: {
          len: '{len}টি {label} হতে হবে',
          min: 'কমপক্ষে {min}টি {label}',
          max: 'সর্বাধিক {max}টি {label}',
          range: '{label} এর সংখ্যা {min}-{max} এর মধ্যে হতে হবে',
        },
        pattern: {
          mismatch: '{label} প্যাটার্ন {pattern} এর সাথে মেলে না',
        },
      },
    },
    loadMore: {
      incompleteText: 'আরও লোড করতে ক্লিক করুন',
      loadingText: 'লোড হচ্ছে...',
      completeText: 'আর নেই',
      errorText: 'অনুরোধ ব্যর্থ হয়েছে, পুনরায় লোড করতে ক্লিক করুন',
    },
    pagination: {
      previous: 'পূর্ববর্তী',
      next: 'পরবর্তী',
    },
    popout: {
      confirm: 'নিশ্চিত',
      cancel: 'বাতিল',
    },
    pullDownRefresh: {
      unready: 'রিফ্রেশ করতে নিচে টানুন',
      ready: 'রিফ্রেশ করতে ছেড়ে দিন',
      loading: 'লোড হচ্ছে...',
      doneSuccess: 'রিফ্রেশ সফল হয়েছে',
      doneFail: 'রিফ্রেশ ব্যর্থ হয়েছে',
    },
    readMore: {
      fold: 'সংকুচিত করুন',
      unfold: 'প্রসারিত করুন',
    },
    select: {
      selected: '{num}টি আইটেম নির্বাচিত',
      selectAll: 'সব নির্বাচন করুন',
      clearSelect: 'নির্বাচন মুছুন',
    },
    shareSheet: {
      cancel: 'বাতিল',
    },
    signature: {
      confirm: 'নিশ্চিত',
      clear: 'মুছুন',
      cancel: 'বাতিল',
    },
    tree: {
      addSibling: 'সহোদর নোড যোগ করুন',
      addChild: 'চাইল্ড নোড যোগ করুন',
      addRoot: 'রুট নোড যোগ করুন',
      removeNode: 'নোড সরান',
      edit: 'নোড সম্পাদনা করুন',
      please: 'শিরোনাম লিখুন',
      error: 'অনুরোধ ব্যর্থ হয়েছে, পুনরায় লোড করতে ক্লিক করুন',
      noData: 'কোনো তথ্য নেই',
    },
  },
}
