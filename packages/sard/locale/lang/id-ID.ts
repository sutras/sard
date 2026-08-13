const formTypeTemplate = '{label} bukan {type} yang valid'

export default {
  _sard: {
    actionSheet: {
      cancel: 'Batal',
    },
    calendar: {
      weeks: {
        0: 'Min',
        1: 'Sen',
        2: 'Sel',
        3: 'Rab',
        4: 'Kam',
        5: 'Jum',
        6: 'Sab',
      },
      abbrWeeks: {
        0: 'Min',
        1: 'Sen',
        2: 'Sel',
        3: 'Rab',
        4: 'Kam',
        5: 'Jum',
        6: 'Sab',
      },
      fullWeeks: {
        0: 'Minggu',
        1: 'Senin',
        2: 'Selasa',
        3: 'Rabu',
        4: 'Kamis',
        5: 'Jumat',
        6: 'Sabtu',
      },
      monthTitle: '{month}/{year}',
      start: 'mulai',
      end: 'selesai',
      to: 'sampai',
      multipleOutlet: '{count} tanggal dipilih',
    },
    cascader: {
      pleaseSelect: 'Silakan pilih',
      error: 'Permintaan gagal, klik untuk memuat ulang',
      noData: 'Tidak ada data',
    },
    cropImage: {
      confirm: 'Konfirmasi',
      cancel: 'Batal',
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
      to: 'sampai',
    },
    dialog: {
      confirm: 'Konfirmasi',
      cancel: 'Batal',
    },
    empty: {
      noData: 'Tidak ada data',
    },
    form: {
      defaultValidateMessages: {
        default: 'Kesalahan validasi bidang {label}',
        required: '{label} wajib diisi',
        enum: '{label} harus salah satu dari [{enum}]',
        whitespace: '{label} tidak boleh berupa karakter kosong',
        date: {
          format: 'Format tanggal {label} tidak valid',
          parse: '{label} tidak dapat dikonversi ke tanggal',
          invalid: '{label} adalah tanggal yang tidak valid',
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
          len: '{label} harus {len} karakter',
          min: '{label} minimal {min} karakter',
          max: '{label} maksimal {max} karakter',
          range: '{label} harus antara {min}-{max} karakter',
        },
        number: {
          len: '{label} harus sama dengan {len}',
          min: '{label} minimal {min}',
          max: '{label} maksimal {max}',
          range: '{label} harus antara {min}-{max}',
        },
        array: {
          len: 'Harus {len} {label}',
          min: 'Minimal {min} {label}',
          max: 'Maksimal {max} {label}',
          range: 'Jumlah {label} harus antara {min}-{max}',
        },
        pattern: {
          mismatch: '{label} tidak cocok dengan pola {pattern}',
        },
      },
    },
    loadMore: {
      incompleteText: 'Klik untuk memuat lebih banyak',
      loadingText: 'Memuat...',
      completeText: 'Tidak ada lagi',
      errorText: 'Permintaan gagal, klik untuk memuat ulang',
    },
    pagination: {
      previous: 'Sebelumnya',
      next: 'Berikutnya',
    },
    popout: {
      confirm: 'Konfirmasi',
      cancel: 'Batal',
    },
    pullDownRefresh: {
      unready: 'Tarik ke bawah untuk menyegarkan',
      ready: 'Lepaskan untuk menyegarkan',
      loading: 'Memuat...',
      doneSuccess: 'Penyegaran berhasil',
      doneFail: 'Penyegaran gagal',
    },
    readMore: {
      fold: 'lipat',
      unfold: 'bentangkan',
    },
    select: {
      selected: '{num} item dipilih',
      selectAll: 'Pilih semua',
      clearSelect: 'Hapus pilihan',
    },
    shareSheet: {
      cancel: 'Batal',
    },
    signature: {
      confirm: 'Konfirmasi',
      clear: 'Hapus',
      cancel: 'Batal',
    },
    tree: {
      addSibling: 'Tambah node saudara',
      addChild: 'Tambah node anak',
      addRoot: 'Tambah node akar',
      removeNode: 'Hapus node',
      edit: 'Edit node',
      please: 'Silakan masukkan judul',
      error: 'Permintaan gagal, klik untuk memuat ulang',
      noData: 'Tidak ada data',
    },
  },
}
