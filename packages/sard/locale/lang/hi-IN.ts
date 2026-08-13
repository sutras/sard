const formTypeTemplate = '{label} एक मान्य {type} नहीं है'

export default {
  _sard: {
    actionSheet: {
      cancel: 'रद्द करें',
    },
    calendar: {
      weeks: {
        0: 'रवि',
        1: 'सोम',
        2: 'मंगल',
        3: 'बुध',
        4: 'गुरु',
        5: 'शुक्र',
        6: 'शनि',
      },
      abbrWeeks: {
        0: 'रवि',
        1: 'सोम',
        2: 'मंगल',
        3: 'बुध',
        4: 'गुरु',
        5: 'शुक्र',
        6: 'शनि',
      },
      fullWeeks: {
        0: 'रविवार',
        1: 'सोमवार',
        2: 'मंगलवार',
        3: 'बुधवार',
        4: 'गुरुवार',
        5: 'शुक्रवार',
        6: 'शनिवार',
      },
      monthTitle: '{month}/{year}',
      start: 'शुरू',
      end: 'समाप्त',
      to: 'से',
      multipleOutlet: '{count} तारीखें चयनित',
    },
    cascader: {
      pleaseSelect: 'कृपया चुनें',
      error: 'अनुरोध विफल, पुनः लोड करने के लिए क्लिक करें',
      noData: 'कोई डेटा नहीं',
    },
    cropImage: {
      confirm: 'पुष्टि करें',
      cancel: 'रद्द करें',
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
      to: 'से',
    },
    dialog: {
      confirm: 'पुष्टि करें',
      cancel: 'रद्द करें',
    },
    empty: {
      noData: 'कोई डेटा नहीं',
    },
    form: {
      defaultValidateMessages: {
        default: '{label} फ़ील्ड सत्यापन त्रुटि',
        required: '{label} आवश्यक है',
        enum: '{label} [{enum}] में से एक होना चाहिए',
        whitespace: '{label} रिक्त अक्षर नहीं हो सकता',
        date: {
          format: '{label} दिनांक प्रारूप अमान्य है',
          parse: '{label} को दिनांक में परिवर्तित नहीं किया जा सकता',
          invalid: '{label} एक अमान्य दिनांक है',
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
          len: '{label} {len} अक्षर का होना चाहिए',
          min: '{label} कम से कम {min} अक्षर का होना चाहिए',
          max: '{label} अधिकतम {max} अक्षर का होना चाहिए',
          range: '{label} {min}-{max} अक्षरों के बीच होना चाहिए',
        },
        number: {
          len: '{label} {len} के बराबर होना चाहिए',
          min: '{label} न्यूनतम {min} होना चाहिए',
          max: '{label} अधिकतम {max} होना चाहिए',
          range: '{label} {min}-{max} के बीच होना चाहिए',
        },
        array: {
          len: '{len} {label} होने चाहिए',
          min: 'कम से कम {min} {label}',
          max: 'अधिकतम {max} {label}',
          range: '{label} की संख्या {min}-{max} के बीच होनी चाहिए',
        },
        pattern: {
          mismatch: '{label} पैटर्न {pattern} से मेल नहीं खाता',
        },
      },
    },
    loadMore: {
      incompleteText: 'और लोड करने के लिए क्लिक करें',
      loadingText: 'लोड हो रहा है...',
      completeText: 'और नहीं है',
      errorText: 'अनुरोध विफल, पुनः लोड करने के लिए क्लिक करें',
    },
    pagination: {
      previous: 'पिछला',
      next: 'अगला',
    },
    popout: {
      confirm: 'पुष्टि करें',
      cancel: 'रद्द करें',
    },
    pullDownRefresh: {
      unready: 'रीफ़्रेश करने के लिए नीचे खींचें',
      ready: 'रीफ़्रेश करने के लिए छोड़ें',
      loading: 'लोड हो रहा है...',
      doneSuccess: 'रीफ़्रेश सफल',
      doneFail: 'रीफ़्रेश विफल',
    },
    readMore: {
      fold: 'समेटें',
      unfold: 'विस्तार करें',
    },
    select: {
      selected: '{num} आइटम चयनित',
      selectAll: 'सभी चुनें',
      clearSelect: 'चयन साफ़ करें',
    },
    shareSheet: {
      cancel: 'रद्द करें',
    },
    signature: {
      confirm: 'पुष्टि करें',
      clear: 'साफ़ करें',
      cancel: 'रद्द करें',
    },
    tree: {
      addSibling: 'समान स्तर का नोड जोड़ें',
      addChild: 'चाइल्ड नोड जोड़ें',
      addRoot: 'रूट नोड जोड़ें',
      removeNode: 'नोड हटाएं',
      edit: 'नोड संपादित करें',
      please: 'कृपया शीर्षक दर्ज करें',
      error: 'अनुरोध विफल, पुनः लोड करने के लिए क्लिक करें',
      noData: 'कोई डेटा नहीं',
    },
  },
}
