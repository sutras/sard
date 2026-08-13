<template>
  <s-list card>
    <s-list-item title="当前值" :value="value || '暂无输入'" />
    <s-list-item title="打开车牌号键盘" arrow hover @click="visible = true" />
    <s-keyboard-popout
      v-model:visible="visible"
      v-model:mode="mode"
      title="请输入车牌号"
      type="plate"
      :disabled-key="disabledKey"
      @input="onInput"
      @delete="onDelete"
    >
      <div class="input-wrapper">
        <template v-for="(_, index) in maxLength" :key="index">
          <div :class="getItemClass(index)">
            {{ value[index] || '' }}
          </div>
          <div v-if="index === 1" class="dot"></div>
        </template>
      </div>
    </s-keyboard-popout>
  </s-list>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { plateEnglishLetterKeys, plateSuffixKeys, type KeyboardPlateMode } from 'sard'

const visible = ref(false)
const mode = ref<KeyboardPlateMode>()
const value = ref('')

const disabledKey = (key: string) => {
  const val = value.value

  if (val.length === maxLength.value) {
    return true
  }

  switch (val.length) {
    case 0:
      return key === 'toggle' || plateSuffixKeys.includes(key)
    case 1:
      return !plateEnglishLetterKeys.includes(key)
    case 2:
    case 3:
    case 4:
    case 5:
      return key === 'toggle' || plateSuffixKeys.includes(key)
    case 6:
      return mode.value === 'chinese' && !plateSuffixKeys.includes(key)
    case 7:
      return key === 'toggle'
  }

  return false
}

const getItemClass = (index: number) => {
  const classes = ['input-item']
  if (
    value.value.length === index ||
    (index === maxLength.value - 1 && value.value.length === maxLength.value)
  ) {
    classes.push('active')
  }
  if (index === 7) {
    classes.push('optional')
  }
  if (!value.value[index]) {
    classes.push('empty')
  }
  return classes.join(' ')
}

watch(value, (val) => {
  if (val.length === 0) {
    mode.value = 'chinese'
  } else {
    mode.value = 'english'
  }
})

const maxLength = computed(() => {
  return value.value.length === 7 && plateSuffixKeys.includes(value.value[6]) ? 7 : 8
})

const onInput = (key: string) => {
  value.value += key
}

const onDelete = () => {
  value.value = value.value.slice(0, -1)
}
</script>

<style lang="scss" scoped>
.input-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
  padding: 16px;
}
.input-item {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 30px;
  height: 40px;
  font-size: 16px;
  border-radius: 4px;
  border: 1px solid var(--s-border-color);

  &.active {
    border-color: var(--s-color-primary);
    background: rgba(var(--s-color-primary-rgb), 0.08);

    &.empty {
      &::after {
        content: '';
        position: absolute;
        width: 1px;
        height: 40%;
        background: currentColor;
        animation: blink 2s infinite;
      }
    }
  }

  &.optional {
    border-style: dashed;
  }
}
.dot {
  width: 4px;
  height: 4px;
  background: currentColor;
  border-radius: 50%;
}

@keyframes blink {
  0%,
  50%,
  100% {
    opacity: 1;
  }
  25%,
  75% {
    opacity: 0;
  }
}
</style>
