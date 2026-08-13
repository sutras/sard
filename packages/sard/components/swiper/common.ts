import { type ExtractPropTypes, type ExtractPublicPropTypes, type Ref } from 'vue'
import { type DefaultProps } from '../config'

export const swiperProps = {
  modelValue: {
    type: Number,
    default: 0,
  },
  showIndicator: {
    type: Boolean,
    default: false,
  },
  vertical: {
    type: Boolean,
    default: false,
  },
  speed: {
    type: Number,
    default: 300,
  },
  autoplay: {
    type: Boolean,
    default: false,
  },
  delay: {
    type: Number,
    default: 3000,
  },
  loop: {
    type: Boolean,
    default: false,
  },
  slidesPerView: {
    type: Number,
    default: 1,
  },
  slidesPerGroup: {
    type: Number,
    default: 1,
  },
  spaceBetween: {
    type: Number,
    default: 0,
  },
  centeredSlides: {
    type: Boolean,
    default: false,
  },
  allowTouchMove: {
    type: Boolean,
    default: true,
  },
  autoHeight: {
    type: Boolean,
    default: false,
  },
}

export type SwiperProps = ExtractPublicPropTypes<typeof swiperProps>
export type SwiperPrivateProps = ExtractPropTypes<typeof swiperProps>

export const defaultSwiperProps: DefaultProps<SwiperProps> = {}

export interface SwiperSlots {
  default?(): any
}

export interface SwiperEmits {
  (e: 'change', value: number): any
  (e: 'transition', event: { dx: number; dy: number }): any
  (e: 'animationfinish', value: number): any
  (e: 'update:modelValue', value: number): any
}

export interface SwiperExpose {}

export type CurrentChangeSource = 'click' | 'touch' | 'autoplay' | ''

/**
 * Symbol keys for provide/inject to support nested swiper instances.
 * Using Symbol instead of string ensures each swiper only communicates
 * with its immediate children, not ancestors or descendants.
 */
export const ADD_SWIPER_CONTEXT_KEY = Symbol('addSwiperContext')
export const REMOVE_SWIPER_CONTEXT_KEY = Symbol('removeSwiperContext')
export const SWIPER_AUTO_HEIGHT_KEY = Symbol('swiperAutoHeight')

export interface SwiperContext {
  rootRef: Ref<HTMLElement | null>
  getItemId(): string
  getBoundingClientRect(): DOMRect
  updatePosition(position: number, vertical: boolean): void
}
export type AddSwiperContext = (context: SwiperContext) => void
export type RemoveSwiperContext = (context: SwiperContext) => void

export const swiperItemProps = {}

export type SwiperItemProps = ExtractPublicPropTypes<typeof swiperItemProps>
export type SwiperItemPrivateProps = ExtractPropTypes<typeof swiperItemProps>

export const defaultSwiperItemProps: DefaultProps<SwiperItemProps> = {}

export interface SwiperItemSlots {
  default?(): any
}

export interface SwiperItemEmits {}

export interface SwiperItemExpose {}
