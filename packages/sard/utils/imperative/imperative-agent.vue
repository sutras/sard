<template>
  <component :is="component" ref="compRef" v-bind="boundProps" />
</template>

<script setup lang="ts">
import { computed, ref, useTemplateRef } from 'vue'

// 命令式组件的通用 Agent。
//
// 为了让这份代码在 vdom / vapor 两种编译产物下都能工作，这里刻意只用
// 「模板 + 组件 ref」：
//   - 不使用 createVNode / h（vapor 没有）
//   - 两种运行时的「组件模板 ref」都会解析为子组件 expose 出的对象
//     （vdom 取 exposeProxy；vapor 取 getExposed(instance) || instance），
//     所以 config.onShow / onHide 拿到的依旧是子组件的 expose。
//
// 挂载方式的差异（createApp vs createVaporApp）隔离在 ./agent-runtime 里。
const props = defineProps({
  component: { type: null, required: true },
  defaultOptions: { type: null, default: undefined },
  config: { type: null, default: undefined },
})

const compRef = useTemplateRef<unknown>('compRef')

const innerProps = ref<Record<string, any>>({})

// NOTE: `onUpdate:visible` 必须与 innerProps 一起合并成同一个对象后再 v-bind。
// 若写成 `v-bind="innerProps"` + 单独的 `@update:visible`，Vue 会把两个同名
// handler 串成数组，导致用户传入的 onUpdate:visible 被调用两次。
const boundProps = computed(() => {
  return {
    ...innerProps.value,
    'onUpdate:visible': (value: boolean) => {
      innerProps.value.visible = value
      innerProps.value['onUpdate:visible']?.(value)
    },
  }
})

const show = (options?: Record<string, any>) => {
  innerProps.value = {
    ...props.defaultOptions,
    ...options,
    visible: true,
  }
  props.config?.onShow?.(compRef.value)
}

const hide = () => {
  innerProps.value = {
    ...innerProps.value,
    visible: false,
  }
  props.config?.onHide?.(compRef.value)
}

defineExpose({ show, hide })
</script>
