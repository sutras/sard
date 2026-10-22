import { type Ref } from 'vue'
import { type DefaultProps } from '../config'

export interface TextShrinkProps {
  /** 要渲染的纯文本，不解析 HTML */
  text?: string
  /** 允许渲染的最大行数，1 表示单行不换行 */
  maxLines?: number
  /** 字号上界（px）；不传时在首次适配时读取根元素 computed font-size 并固化 */
  baseFontSize?: number
  /**
   * 缩放下限（px），默认 1。
   * 需要在小于等于该字号时才放得下时，不再继续缩小，停在该字号并显示省略号。
   */
  minFontSize?: number
}

export const defaultTextShrinkProps: DefaultProps<TextShrinkProps> = {
  text: '',
  maxLines: 1,
  minFontSize: 1,
}

export interface TextShrinkSlots {}

export interface TextShrinkEmits {}

export interface TextShrinkExpose {
  /** 当前生效的字号（px），首次适配完成前为 undefined */
  fontSize: Ref<number | undefined>
  /** 是否已停在缩放下限仍溢出（此时按 maxLines 截断） */
  overflow: Ref<boolean>
  /** 手动触发一次重新适配（在下一帧执行） */
  refit: () => void
}
