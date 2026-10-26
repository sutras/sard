import { defineComponent } from 'vue'

import backspace from './icons/backspace'
import backtop from './icons/backtop'
import caretdown from './icons/caret-down'
import caretleft from './icons/caret-left'
import caretright from './icons/caret-right'
import caretup from './icons/caret-up'
import checkcirclefill from './icons/check-circle-fill'
import checksquarefill from './icons/check-square-fill'
import check from './icons/check'
import circle from './icons/circle'
import close from './icons/close'
import dashcirclefill from './icons/dash-circle-fill'
import dashsquarefill from './icons/dash-square-fill'
import dash from './icons/dash'
import doubledown from './icons/double-down'
import doubleleft from './icons/double-left'
import doubleright from './icons/double-right'
import doubleup from './icons/double-up'
import down from './icons/down'
import empty from './icons/empty'
import eyeslash from './icons/eye-slash'
import eye from './icons/eye'
import fail from './icons/fail'
import file from './icons/file'
import imageerror from './icons/image-error'
import image from './icons/image'
import infocirclefill from './icons/info-circle-fill'
import info from './icons/info'
import left from './icons/left'
import list from './icons/list'
import loading from './icons/loading'
import minus from './icons/minus'
import pencilsquare from './icons/pencil-square'
import person from './icons/person'
import play from './icons/play'
import pluscirclefill from './icons/plus-circle-fill'
import plus from './icons/plus'
import questioncirclefill from './icons/question-circle-fill'
import question from './icons/question'
import recordcircle from './icons/record-circle'
import right from './icons/right'
import rotateleft from './icons/rotate-left'
import search from './icons/search'
import square from './icons/square'
import starfill from './icons/star-fill'
import star from './icons/star'
import success from './icons/success'
import trash from './icons/trash'
import undo from './icons/undo'
import up from './icons/up'
import volumeup from './icons/volume-up'
import warningfill from './icons/warning-fill'
import xcirclefill from './icons/x-circle-fill'
import xcircle from './icons/x-circle'
import xoctagonfill from './icons/x-octagon-fill'

const SvgIcon = /*#__PURE__*/ defineComponent({
  props: {
    body: String,
  },
  setup: (props) => () => (
    <svg
      viewBox="0 0 1024 1024"
      width="1em"
      height="1em"
      fill="currentColor"
      innerHTML={props.body}
    ></svg>
  ),
})

export const Backspace = /*#__PURE__*/ defineComponent({
  render: () => <SvgIcon body={backspace} />,
})

export const Backtop = /*#__PURE__*/ defineComponent({
  render: () => <SvgIcon body={backtop} />,
})

export const CaretDown = /*#__PURE__*/ defineComponent({
  render: () => <SvgIcon body={caretdown} />,
})

export const CaretLeft = /*#__PURE__*/ defineComponent({
  render: () => <SvgIcon body={caretleft} />,
})

export const CaretRight = /*#__PURE__*/ defineComponent({
  render: () => <SvgIcon body={caretright} />,
})

export const CaretUp = /*#__PURE__*/ defineComponent({
  render: () => <SvgIcon body={caretup} />,
})

export const CheckCircleFill = /*#__PURE__*/ defineComponent({
  render: () => <SvgIcon body={checkcirclefill} />,
})

export const CheckSquareFill = /*#__PURE__*/ defineComponent({
  render: () => <SvgIcon body={checksquarefill} />,
})

export const Check = /*#__PURE__*/ defineComponent({
  render: () => <SvgIcon body={check} />,
})

export const Circle = /*#__PURE__*/ defineComponent({
  render: () => <SvgIcon body={circle} />,
})

export const Close = /*#__PURE__*/ defineComponent({
  render: () => <SvgIcon body={close} />,
})

export const DashCircleFill = /*#__PURE__*/ defineComponent({
  render: () => <SvgIcon body={dashcirclefill} />,
})

export const DashSquareFill = /*#__PURE__*/ defineComponent({
  render: () => <SvgIcon body={dashsquarefill} />,
})

export const Dash = /*#__PURE__*/ defineComponent({
  render: () => <SvgIcon body={dash} />,
})

export const DoubleDown = /*#__PURE__*/ defineComponent({
  render: () => <SvgIcon body={doubledown} />,
})

export const DoubleLeft = /*#__PURE__*/ defineComponent({
  render: () => <SvgIcon body={doubleleft} />,
})

export const DoubleRight = /*#__PURE__*/ defineComponent({
  render: () => <SvgIcon body={doubleright} />,
})

export const DoubleUp = /*#__PURE__*/ defineComponent({
  render: () => <SvgIcon body={doubleup} />,
})

export const Down = /*#__PURE__*/ defineComponent({
  render: () => <SvgIcon body={down} />,
})

export const Empty = /*#__PURE__*/ defineComponent({
  render: () => <SvgIcon body={empty} />,
})

export const EyeSlash = /*#__PURE__*/ defineComponent({
  render: () => <SvgIcon body={eyeslash} />,
})

export const Eye = /*#__PURE__*/ defineComponent({
  render: () => <SvgIcon body={eye} />,
})

export const Fail = /*#__PURE__*/ defineComponent({
  render: () => <SvgIcon body={fail} />,
})

export const File = /*#__PURE__*/ defineComponent({
  render: () => <SvgIcon body={file} />,
})

export const ImageError = /*#__PURE__*/ defineComponent({
  render: () => <SvgIcon body={imageerror} />,
})

export const Image = /*#__PURE__*/ defineComponent({
  render: () => <SvgIcon body={image} />,
})

export const InfoCircleFill = /*#__PURE__*/ defineComponent({
  render: () => <SvgIcon body={infocirclefill} />,
})

export const Info = /*#__PURE__*/ defineComponent({
  render: () => <SvgIcon body={info} />,
})

export const Left = /*#__PURE__*/ defineComponent({
  render: () => <SvgIcon body={left} />,
})

export const List = /*#__PURE__*/ defineComponent({
  render: () => <SvgIcon body={list} />,
})

export const Loading = /*#__PURE__*/ defineComponent({
  render: () => <SvgIcon body={loading} />,
})

export const Minus = /*#__PURE__*/ defineComponent({
  render: () => <SvgIcon body={minus} />,
})

export const PencilSquare = /*#__PURE__*/ defineComponent({
  render: () => <SvgIcon body={pencilsquare} />,
})

export const Person = /*#__PURE__*/ defineComponent({
  render: () => <SvgIcon body={person} />,
})

export const Play = /*#__PURE__*/ defineComponent({
  render: () => <SvgIcon body={play} />,
})

export const PlusCircleFill = /*#__PURE__*/ defineComponent({
  render: () => <SvgIcon body={pluscirclefill} />,
})

export const Plus = /*#__PURE__*/ defineComponent({
  render: () => <SvgIcon body={plus} />,
})

export const QuestionCircleFill = /*#__PURE__*/ defineComponent({
  render: () => <SvgIcon body={questioncirclefill} />,
})

export const Question = /*#__PURE__*/ defineComponent({
  render: () => <SvgIcon body={question} />,
})

export const RecordCircle = /*#__PURE__*/ defineComponent({
  render: () => <SvgIcon body={recordcircle} />,
})

export const Right = /*#__PURE__*/ defineComponent({
  render: () => <SvgIcon body={right} />,
})

export const RotateLeft = /*#__PURE__*/ defineComponent({
  render: () => <SvgIcon body={rotateleft} />,
})

export const Search = /*#__PURE__*/ defineComponent({
  render: () => <SvgIcon body={search} />,
})

export const Square = /*#__PURE__*/ defineComponent({
  render: () => <SvgIcon body={square} />,
})

export const StarFill = /*#__PURE__*/ defineComponent({
  render: () => <SvgIcon body={starfill} />,
})

export const Star = /*#__PURE__*/ defineComponent({
  render: () => <SvgIcon body={star} />,
})

export const Success = /*#__PURE__*/ defineComponent({
  render: () => <SvgIcon body={success} />,
})

export const Trash = /*#__PURE__*/ defineComponent({
  render: () => <SvgIcon body={trash} />,
})

export const Undo = /*#__PURE__*/ defineComponent({
  render: () => <SvgIcon body={undo} />,
})

export const Up = /*#__PURE__*/ defineComponent({
  render: () => <SvgIcon body={up} />,
})

export const VolumeUp = /*#__PURE__*/ defineComponent({
  render: () => <SvgIcon body={volumeup} />,
})

export const WarningFill = /*#__PURE__*/ defineComponent({
  render: () => <SvgIcon body={warningfill} />,
})

export const XCircleFill = /*#__PURE__*/ defineComponent({
  render: () => <SvgIcon body={xcirclefill} />,
})

export const XCircle = /*#__PURE__*/ defineComponent({
  render: () => <SvgIcon body={xcircle} />,
})

export const XOctagonFill = /*#__PURE__*/ defineComponent({
  render: () => <SvgIcon body={xoctagonfill} />,
})
