import type { Component } from 'vue'
import ImperativeAgent from './imperative/imperative-agent.vue'
import { mountAgent } from './imperative/agent-runtime'

interface ImperativeExpose<T> {
  show: (options?: T) => void
  hide: () => void
}

interface ImperativeConfig<Expose> {
  onShow?: (expose: Expose) => void
  onHide?: (expose: Expose) => void
}

/**
 * 创建一个命令式组件：挂载到 body 上的独立容器里，通过 `show` / `hide` 控制。
 *
 * 具体渲染由 `./imperative/imperative-agent.vue` 负责，挂载方式（vdom / vapor）
 * 由 `./imperative/agent-runtime` 隔离，因此这里不含任何 vdom 专有 API。
 */
export function createImperativeComponent<Options, Expose>(
  component: Component,
  defaultOptions?: Options,
  config?: ImperativeConfig<Expose>,
): ImperativeExpose<Options> {
  const container = document.createElement('div')
  document.body.appendChild(container)

  const instance = mountAgent(ImperativeAgent, container, {
    component,
    defaultOptions,
    config,
  }) as ImperativeExpose<Options>

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
