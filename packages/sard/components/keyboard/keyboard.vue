<template>
  <div :class="keyboardClass">
    <template v-if="type === 'number'">
      <div v-for="key in numberKeys" :key="key" :class="getKeyClass(key)" @click="onKeyClick(key)">
        {{ key }}
      </div>
    </template>

    <template v-else-if="type === 'digit'">
      <div v-for="key in digitKeys" :key="key" :class="getKeyClass(key)" @click="onKeyClick(key)">
        {{ key }}
      </div>
    </template>

    <template v-else-if="type === 'idcard'">
      <div v-for="key in idcardKeys" :key="key" :class="getKeyClass(key)" @click="onKeyClick(key)">
        {{ key }}
      </div>
    </template>

    <template v-else-if="type === 'random'">
      <div v-for="key in randomKeys" :key="key" :class="getKeyClass(key)" @click="onKeyClick(key)">
        {{ key }}
      </div>
    </template>

    <template v-else-if="type === 'plate'">
      <template v-if="innerMode === 'chinese'">
        <div
          v-for="(key, i) in chineseKeys"
          :key="key"
          :class="getKeyClass(key)"
          :style="`order: ${i}`"
          @click="onKeyClick(key)"
        >
          {{ key }}
        </div>
      </template>
      <template v-if="innerMode === 'english'">
        <div
          v-for="(key, i) in englishKeys"
          :key="key"
          :style="`order: ${i}`"
          :class="getKeyClass(key)"
          @click="onKeyClick(key)"
        >
          {{ key }}
        </div>
      </template>
      <div :class="getKeyClass('toggle')" :style="`order: ${interceptOrder}`" @click="toggle()">
        {{ toggleKey }}
      </div>
    </template>

    <div :class="backspaceClass" style="order: 100" @click="onBackspace">
      <Backspace :class="bem.e('delete-icon')" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, useModel, watch } from 'vue'
import { createBem } from '../../utils'
import {
  type KeyboardProps,
  type KeyboardSlots,
  type KeyboardEmits,
  type KeyBoardExpose,
  type KeyboardPlateMode,
  numberKeys,
  digitKeys,
  idcardKeys,
  chineseKeys,
  englishKeys,
  getRandomKeys,
  defaultKeyboardProps,
} from './common'
import { Backspace } from '@sard/icons'

const props = withDefaults(defineProps<KeyboardProps>(), defaultKeyboardProps)

defineSlots<KeyboardSlots>()

const emit = defineEmits<KeyboardEmits>()

const bem = createBem('keyboard')

const onKeyClick = (key: string) => {
  if (props.type === 'plate') {
    if (key === 'I' || key === 'O') {
      return
    }
    if (chineseKeys.includes(key)) {
      toggle()
    }
  }
  emit('input', key)
}

const onBackspace = () => {
  emit('delete')
}

// ============================ random ============================
const randomKeys = ref<string[]>([])
watch(
  () => props.type,
  () => {
    if (props.type === 'random') {
      randomKeys.value = getRandomKeys()
    }
  },
  {
    immediate: true,
  },
)

// ============================ 车牌号 ============================
const innerMode = useModel(props, 'mode')

const toggleKey = computed(() => {
  return {
    chinese: 'ABC',
    english: '省份',
  }[innerMode.value]
})

const interceptOrder = computed(() => {
  if (innerMode.value === 'english') {
    return englishKeys.length - 8
  }
  const overflow = chineseKeys.length % 10
  return chineseKeys.length - (overflow > 7 ? 0 : overflow + 1)
})

const toggle = () => {
  const nextMode = innerMode.value === 'chinese' ? 'english' : 'chinese'
  innerMode.value = nextMode
}

// ============================ style ============================

const getKeyClass = (key: string) => {
  return [bem.e('key'), bem.em('key', key), bem.is('disabled', props.disabledKey?.(key))]
}

const keyboardClass = computed(() => {
  return [bem.b(), bem.m(props.type)]
})

const backspaceClass = computed(() => {
  return [bem.e('key'), bem.em('key', 'backspace')]
})

defineExpose<KeyBoardExpose>({
  shuffle() {
    randomKeys.value = getRandomKeys()
  },
})
</script>
