const formTypeTemplate = '{label} geçerli bir {type} değil'

export default {
  _sard: {
    actionSheet: {
      cancel: 'İptal',
    },
    calendar: {
      weeks: {
        0: 'Paz',
        1: 'Pzt',
        2: 'Sal',
        3: 'Çar',
        4: 'Per',
        5: 'Cum',
        6: 'Cmt',
      },
      abbrWeeks: {
        0: 'Paz',
        1: 'Pzt',
        2: 'Sal',
        3: 'Çar',
        4: 'Per',
        5: 'Cum',
        6: 'Cmt',
      },
      fullWeeks: {
        0: 'Pazar',
        1: 'Pazartesi',
        2: 'Salı',
        3: 'Çarşamba',
        4: 'Perşembe',
        5: 'Cuma',
        6: 'Cumartesi',
      },
      monthTitle: '{month}/{year}',
      start: 'başlangıç',
      end: 'bitiş',
      to: '-',
      multipleOutlet: '{count} tarih seçildi',
    },
    cascader: {
      pleaseSelect: 'Lütfen seçin',
      error: 'İstek başarısız oldu, yeniden yüklemek için tıklayın',
      noData: 'Veri yok',
    },
    cropImage: {
      confirm: 'Tamam',
      cancel: 'İptal',
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
      to: '-',
    },
    dialog: {
      confirm: 'Tamam',
      cancel: 'İptal',
    },
    empty: {
      noData: 'Veri yok',
    },
    form: {
      defaultValidateMessages: {
        default: '{label} alan doğrulama hatası',
        required: '{label} zorunludur',
        enum: '{label} şunlardan biri olmalıdır [{enum}]',
        whitespace: '{label} boş karakter olamaz',
        date: {
          format: '{label} tarih formatı geçersiz',
          parse: '{label} tarihe dönüştürülemez',
          invalid: '{label} geçersiz bir tarih',
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
          len: '{label} {len} karakter olmalıdır',
          min: '{label} en az {min} karakter olmalıdır',
          max: '{label} en fazla {max} karakter olmalıdır',
          range: '{label} {min}-{max} karakter arasında olmalıdır',
        },
        number: {
          len: '{label} {len} değerine eşit olmalıdır',
          min: '{label} minimum {min} olmalıdır',
          max: '{label} maksimum {max} olmalıdır',
          range: '{label} {min}-{max} arasında olmalıdır',
        },
        array: {
          len: '{len} adet {label} olmalıdır',
          min: 'En az {min} {label}',
          max: 'En fazla {max} {label}',
          range: '{label} sayısı {min}-{max} arasında olmalıdır',
        },
        pattern: {
          mismatch: '{label} {pattern} deseniyle eşleşmiyor',
        },
      },
    },
    loadMore: {
      incompleteText: 'Daha fazla yüklemek için tıklayın',
      loadingText: 'Yükleniyor...',
      completeText: 'Daha fazla yok',
      errorText: 'İstek başarısız oldu, yeniden yüklemek için tıklayın',
    },
    pagination: {
      previous: 'Önceki',
      next: 'Sonraki',
    },
    popout: {
      confirm: 'Tamam',
      cancel: 'İptal',
    },
    pullDownRefresh: {
      unready: 'Yenilemek için aşağı çekin',
      ready: 'Yenilemek için bırakın',
      loading: 'Yükleniyor...',
      doneSuccess: 'Yenileme başarılı',
      doneFail: 'Yenileme başarısız',
    },
    readMore: {
      fold: 'kapat',
      unfold: 'aç',
    },
    select: {
      selected: '{num} öğe seçildi',
      selectAll: 'Tümünü seç',
      clearSelect: 'Seçimi temizle',
    },
    shareSheet: {
      cancel: 'İptal',
    },
    signature: {
      confirm: 'Tamam',
      clear: 'Temizle',
      cancel: 'İptal',
    },
    tree: {
      addSibling: 'Kardeş düğüm ekle',
      addChild: 'Alt düğüm ekle',
      addRoot: 'Kök düğüm ekle',
      removeNode: 'Düğümü sil',
      edit: 'Düğümü düzenle',
      please: 'Lütfen başlık girin',
      error: 'İstek başarısız oldu, yeniden yüklemek için tıklayın',
      noData: 'Veri yok',
    },
  },
}
