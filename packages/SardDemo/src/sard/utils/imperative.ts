import {
  createElement,
  useState,
  useRef,
  useEffect,
  MutableRefObject,
} from 'react'

import { PopupProps } from '../popup'

export type AgentProps<
  ComponentProps extends {
    onVisible?: (visible: boolean) => void
    popupProps?: PopupProps
  },
> = {
  id?: string
  $$afterRender?: () => void
  popupProps?: PopupProps
} & ComponentProps

export interface AgentRef<ComponentProps> {
  show(props: ComponentProps): void
  hide(): void
}

export interface MapIdAgent<ComponentProps, ComponentRef> {
  [id: string]: MutableRefObject<
    (AgentRef<ComponentProps> & ComponentRef) | undefined
  >
}

export function useAgent<
  ComponentProps extends { onVisible?(visible: boolean): void },
  ComponentRef,
>(
  component,
  agentProps: AgentProps<ComponentProps>,
  mapIdAgent: MapIdAgent<ComponentProps, ComponentRef>,
  defaultId: string,
) {
  const { id = defaultId, $$afterRender, ...restProps } = agentProps

  const [visible, setVisible] = useState(false)
  const [props, setProps] = useState<ComponentProps>()

  const componentRef = useRef<ComponentRef>(null)

  const ref = useRef<ComponentRef & AgentRef<ComponentProps>>()

  useEffect(() => {
    mapIdAgent[id] = ref

    return () => {
      delete mapIdAgent[id]
    }
  }, [id])

  useEffect(() => {
    ref.current = {
      show(props) {
        setProps(props)
        setVisible(true)
      },
      hide() {
        setVisible(false)
      },
      ...componentRef.current,
    } as any

    $$afterRender?.()
  }, [])

  return createElement(component, {
    ...restProps,
    ...props,
    visible,
    onVisible(visible) {
      setVisible(visible)
      agentProps.onVisible?.(visible)
    },
    ref: componentRef,
  } as any)
}
