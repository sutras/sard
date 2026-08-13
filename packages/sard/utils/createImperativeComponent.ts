import { type Component, createApp, createVNode, defineComponent, ref } from 'vue'

interface ImperativeExpose<T> {
  show: (options?: T) => void
  hide: () => void
}

interface ImperativeConfig<Expose> {
  onShow?: (expose: Expose) => void
  onHide?: (expose: Expose) => void
}

function createAgent<Options, Expose>(
  component: Component,
  defaultOptions?: Options,
  config?: ImperativeConfig<Expose>,
) {
  return defineComponent({
    setup(_, { expose }) {
      const compRef = ref<Expose>()

      const innerProps = ref<Options>({} as Options)

      const show = (options: Options) => {
        innerProps.value = {
          ...defaultOptions,
          ...options,
          visible: true,
        }
        config?.onShow?.(compRef.value!)
      }

      const hide = () => {
        innerProps.value = {
          ...innerProps.value,
          visible: false,
        }
        config?.onHide?.(compRef.value!)
      }

      expose({
        show,
        hide,
      })

      return () => {
        return createVNode(component, {
          ref: compRef,
          ...innerProps.value,
          'onUpdate:visible': (value: boolean) => {
            innerProps.value.visible = value
            innerProps.value['onUpdate:visible']?.(value)
          },
        })
      }
    },
  })
}

export function createImperativeComponent<Options, Expose>(
  component: Component,
  defaultOptions?: Options,
  config?: ImperativeConfig<Expose>,
) {
  const container = document.createElement('div')
  document.body.appendChild(container)

  const Agent = createAgent(component, defaultOptions, config)

  const app = createApp(Agent)
  const instance = app.mount(container) as unknown as ImperativeExpose<Options>

  function show(options?: Options) {
    instance.show(options)
  }

  function hide() {
    instance.hide()
  }

  return {
    show,
    hide,
  }
}
