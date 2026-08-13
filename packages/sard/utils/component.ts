import {
  defineComponent,
  type Component,
  type ComponentOptions,
  type DefineSetupFnComponent,
  type ExtractPropTypes,
  type ExtractPublicPropTypes,
  type RenderFunction,
} from 'vue'
import { isPlainObject } from './is'
import type { ComponentProps } from '../type-helpers'

type Data = Record<string, unknown>

type SatisfyEmitsOptions<T> = {} & T

type SatisfySlotsType<T> = {} & T

export function defineSetupFnComponent<P, E, S, Expose>(
  setup: (
    props: ExtractPropTypes<P>,
    ctx: {
      attrs: Data
      slots: S
      emit: E
      expose: (exposed?: Expose) => void
    },
  ) => RenderFunction | Promise<RenderFunction>,
  options?: Pick<ComponentOptions, 'name' | 'inheritAttrs'> & {
    props?: P
    emits?: E
    slots?: S
    expose?: Expose
  },
): DefineSetupFnComponent<ExtractPublicPropTypes<P>, SatisfyEmitsOptions<E>, SatisfySlotsType<S>> {
  return defineComponent(setup as any, options as any) as any
}

export type EnhancedComponent<T extends Component> = T & {
  setPropsDefaults: (defaults: ComponentProps<T>) => void
}

export function enhanceComponent<T extends Component>(component: T): EnhancedComponent<T> {
  let props = (component as any)?.props

  props = Array.isArray(props) ? props.reduce((obj, key) => ((obj[key] = {}), obj), {}) : props

  return Object.assign(component, {
    setPropsDefaults(defaults: Record<string, any>) {
      if (!props) return

      for (const [key, value] of Object.entries(defaults)) {
        if (!props.hasOwnProperty(key)) {
          continue
        }

        const prop = props[key]

        if (isPlainObject(prop)) {
          props[key] = {
            ...prop,
            default: value,
          }
          continue
        }

        props[key] = {
          type: prop,
          default: value,
        }
      }

      ;(component as any).props = props
    },
  })
}
