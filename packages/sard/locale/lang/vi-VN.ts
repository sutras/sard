const formTypeTemplate = '{label}không phải là một {type} hợp lệ'

export default {
  _sard: {
    actionSheet: {
      cancel: 'Hủy',
    },
    calendar: {
      weeks: {
        0: 'CN',
        1: 'T2',
        2: 'T3',
        3: 'T4',
        4: 'T5',
        5: 'T6',
        6: 'T7',
      },
      monthTitle: '{month}/{year}',
      start: 'bắt đầu',
      end: 'kết thúc',
      to: 'đến',
      multipleOutlet: 'Đã chọn {count} ngày',
    },
    cascader: {
      pleaseSelect: 'Vui lòng chọn',
      error: 'Yêu cầu thất bại, nhấp để tải lại',
      noData: 'Không có dữ liệu',
    },
    cropImage: {
      confirm: 'Xác nhận',
      cancel: 'Hủy',
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
      to: 'đến',
    },
    dialog: {
      confirm: 'Xác nhận',
      cancel: 'Hủy',
    },
    empty: {
      noData: 'Không có dữ liệu',
    },
    form: {
      defaultValidateMessages: {
        default: 'Lỗi xác thực trường {label}',
        required: '{label} là bắt buộc',
        enum: '{label} phải là một trong [{enum}]',
        whitespace: '{label} không thể là ký tự trống',
        date: {
          format: 'Định dạng ngày {label} không hợp lệ',
          parse: '{label} không thể chuyển đổi thành ngày',
          invalid: '{label} là ngày không hợp lệ',
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
          len: '{label} phải có {len} ký tự',
          min: '{label} phải có ít nhất {min} ký tự',
          max: '{label} phải có tối đa {max} ký tự',
          range: '{label} phải có từ {min}-{max} ký tự',
        },
        number: {
          len: '{label} phải bằng {len}',
          min: '{label} tối thiểu là {min}',
          max: '{label} tối đa là {max}',
          range: '{label} phải nằm trong khoảng {min}-{max}',
        },
        array: {
          len: 'Phải có {len} {label}',
          min: 'Ít nhất {min} {label}',
          max: 'Tối đa {max} {label}',
          range: 'Số lượng {label} phải nằm trong khoảng {min}-{max}',
        },
        pattern: {
          mismatch: '{label} không khớp với mẫu {pattern}',
        },
      },
    },
    loadMore: {
      incompleteText: 'Nhấp để tải thêm',
      loadingText: 'Đang tải...',
      completeText: 'Không còn nữa',
      errorText: 'Yêu cầu thất bại, nhấp để tải lại',
    },
    pagination: {
      previous: 'Trước',
      next: 'Sau',
    },
    popout: {
      confirm: 'Xác nhận',
      cancel: 'Hủy',
    },
    pullDownRefresh: {
      unready: 'Kéo xuống để làm mới',
      ready: 'Thả để làm mới',
      loading: 'Đang tải...',
      doneSuccess: 'Làm mới thành công',
      doneFail: 'Làm mới thất bại',
    },
    readMore: {
      fold: 'thu gọn',
      unfold: 'mở rộng',
    },
    select: {
      selected: 'Đã chọn {num} mục',
      selectAll: 'Chọn tất cả',
      clearSelect: 'Xóa lựa chọn',
    },
    shareSheet: {
      cancel: 'Hủy',
    },
    signature: {
      confirm: 'Xác nhận',
      clear: 'Xóa',
      cancel: 'Hủy',
    },
    tree: {
      addSibling: 'Thêm nút cùng cấp',
      addChild: 'Thêm nút con',
      addRoot: 'Thêm nút gốc',
      removeNode: 'Xóa nút',
      edit: 'Chỉnh sửa nút',
      please: 'Vui lòng nhập tiêu đề',
      error: 'Yêu cầu thất bại, nhấp để tải lại',
      noData: 'Không có dữ liệu',
    },
  },
}
