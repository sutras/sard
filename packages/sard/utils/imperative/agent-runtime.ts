import { createApp, type Component } from 'vue'

/**
 * 挂载命令式组件的 Agent，并返回它 expose 出来的对象（`{ show, hide }`）。
 *
 * 这里是整个命令式体系里**唯一**依赖 vdom 运行时的点。vapor 变体（P0-2 双产物
 * 时新增 `./agent-runtime.vapor.ts`，由构建把 `./agent-runtime` 指过去）只需换
 * 一行 import，函数体完全相同：
 *
 * ```ts
 * import { createVaporApp } from '@vue/runtime-vapor'
 *
 * export const mountAgent = (Agent, container, rootProps) =>
 *   createVaporApp(Agent, rootProps).mount(container)
 * ```
 *
 * 依据（已核对 vue 3.6 源码 + 官方测试）：
 * - `createVaporApp` 内部是 `createAppAPI(mountApp, unmountApp, getExposed)`，
 *   所以 `mount()` 返回的同样是 expose 代理，与 vdom 一致
 *   （`runtime-vapor/__tests__/apiExpose.spec.ts` 的「with mount」用例：
 *   `app.mount(host).foo === 1`）。
 * - 根 props 同样支持：`createVaporApp(Comp, { count: () => 1 })`
 *   （`apiCreateVaporApp.spec.ts` 的「mount with props」用例）。
 *
 * ⚠️ 唯一语义差异：vapor 把根 props 里的**函数值当作 getter**（动态 props）。
 * 我们传的 `component` 若被传成「函数式组件」会被当成 getter —— 实际用法都是
 * SFC / defineComponent 对象，不受影响，P0-2 时留意即可。
 */
export function mountAgent(
  Agent: Component,
  container: HTMLElement,
  rootProps: Record<string, any>,
): any {
  const app = createApp(Agent, rootProps)
  // vdom: 根组件调用了 expose 时，mount() 返回的就是 expose 代理
  return app.mount(container)
}
