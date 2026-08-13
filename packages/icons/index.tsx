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

const SvgIcon = defineComponent({
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

export const Backspace = defineComponent({
  render: () => <SvgIcon body={backspace} />,
})

export const Backtop = defineComponent({
  render: () => <SvgIcon body={backtop} />,
})

export const CaretDown = defineComponent({
  render: () => <SvgIcon body={caretdown} />,
})

export const CaretLeft = defineComponent({
  render: () => <SvgIcon body={caretleft} />,
})

export const CaretRight = defineComponent({
  render: () => <SvgIcon body={caretright} />,
})

export const CaretUp = defineComponent({
  render: () => <SvgIcon body={caretup} />,
})

export const CheckCircleFill = defineComponent({
  render: () => <SvgIcon body={checkcirclefill} />,
})

export const CheckSquareFill = defineComponent({
  render: () => <SvgIcon body={checksquarefill} />,
})

export const Check = defineComponent({
  render: () => <SvgIcon body={check} />,
})

export const Circle = defineComponent({
  render: () => <SvgIcon body={circle} />,
})

export const Close = defineComponent({
  render: () => <SvgIcon body={close} />,
})

export const DashCircleFill = defineComponent({
  render: () => <SvgIcon body={dashcirclefill} />,
})

export const DashSquareFill = defineComponent({
  render: () => <SvgIcon body={dashsquarefill} />,
})

export const Dash = defineComponent({
  render: () => <SvgIcon body={dash} />,
})

export const DoubleDown = defineComponent({
  render: () => <SvgIcon body={doubledown} />,
})

export const DoubleLeft = defineComponent({
  render: () => <SvgIcon body={doubleleft} />,
})

export const DoubleRight = defineComponent({
  render: () => <SvgIcon body={doubleright} />,
})

export const DoubleUp = defineComponent({
  render: () => <SvgIcon body={doubleup} />,
})

export const Down = defineComponent({
  render: () => <SvgIcon body={down} />,
})

export const Empty = defineComponent({
  render: () => <SvgIcon body={empty} />,
})

export const EyeSlash = defineComponent({
  render: () => <SvgIcon body={eyeslash} />,
})

export const Eye = defineComponent({
  render: () => <SvgIcon body={eye} />,
})

export const Fail = defineComponent({
  render: () => <SvgIcon body={fail} />,
})

export const File = defineComponent({
  render: () => <SvgIcon body={file} />,
})

export const ImageError = defineComponent({
  render: () => <SvgIcon body={imageerror} />,
})

export const Image = defineComponent({
  render: () => <SvgIcon body={image} />,
})

export const InfoCircleFill = defineComponent({
  render: () => <SvgIcon body={infocirclefill} />,
})

export const Info = defineComponent({
  render: () => <SvgIcon body={info} />,
})

export const Left = defineComponent({
  render: () => <SvgIcon body={left} />,
})

export const List = defineComponent({
  render: () => <SvgIcon body={list} />,
})

export const Loading = defineComponent({
  render: () => <SvgIcon body={loading} />,
})

export const Minus = defineComponent({
  render: () => <SvgIcon body={minus} />,
})

export const PencilSquare = defineComponent({
  render: () => <SvgIcon body={pencilsquare} />,
})

export const Person = defineComponent({
  render: () => <SvgIcon body={person} />,
})

export const Play = defineComponent({
  render: () => <SvgIcon body={play} />,
})

export const PlusCircleFill = defineComponent({
  render: () => <SvgIcon body={pluscirclefill} />,
})

export const Plus = defineComponent({
  render: () => <SvgIcon body={plus} />,
})

export const QuestionCircleFill = defineComponent({
  render: () => <SvgIcon body={questioncirclefill} />,
})

export const Question = defineComponent({
  render: () => <SvgIcon body={question} />,
})

export const RecordCircle = defineComponent({
  render: () => <SvgIcon body={recordcircle} />,
})

export const Right = defineComponent({
  render: () => <SvgIcon body={right} />,
})

export const RotateLeft = defineComponent({
  render: () => <SvgIcon body={rotateleft} />,
})

export const Search = defineComponent({
  render: () => <SvgIcon body={search} />,
})

export const Square = defineComponent({
  render: () => <SvgIcon body={square} />,
})

export const StarFill = defineComponent({
  render: () => <SvgIcon body={starfill} />,
})

export const Star = defineComponent({
  render: () => <SvgIcon body={star} />,
})

export const Success = defineComponent({
  render: () => <SvgIcon body={success} />,
})

export const Trash = defineComponent({
  render: () => <SvgIcon body={trash} />,
})

export const Undo = defineComponent({
  render: () => <SvgIcon body={undo} />,
})

export const Up = defineComponent({
  render: () => <SvgIcon body={up} />,
})

export const VolumeUp = defineComponent({
  render: () => <SvgIcon body={volumeup} />,
})

export const WarningFill = defineComponent({
  render: () => <SvgIcon body={warningfill} />,
})

export const XCircleFill = defineComponent({
  render: () => <SvgIcon body={xcirclefill} />,
})

export const XCircle = defineComponent({
  render: () => <SvgIcon body={xcircle} />,
})

export const XOctagonFill = defineComponent({
  render: () => <SvgIcon body={xoctagonfill} />,
})
