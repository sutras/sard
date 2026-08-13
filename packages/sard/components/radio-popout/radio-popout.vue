<template>
  <Popout
    v-model:visible="innerVisible"
    :title="title"
    @confirm="onConfirm"
    @visible-hook="onVisibleHook"
  >
    <div v-if="searchable" :class="bem.e('toolbar')">
      <Input v-model="searchValue" :placeholder="filterPlaceholder" clearable>
        <template #prepend>
          <Search />
        </template>
      </Input>
    </div>

    <div :class="containerClass">
      <div ref="scroll" :class="scrollClass">
        <RadioGroup
          :size="size"
          :type="type"
          :checkedColor="checkedColor"
          :direction="direction"
          :validate-event="false"
          :model-value="draftValue"
          @change="onChange"
          #default="{ toggle }"
        >
          <List inlaid>
            <ListItem
              v-for="option in filteredOptions"
              :key="option.value"
              :title="option.label"
              :hover="!option.disabled"
              @click="select(option, toggle)"
            >
              <template v-if="iconPosition === 'left'" #icon>
                <Radio readonly :disabled="option.disabled" :value="option.value" />
              </template>
              <template v-if="iconPosition === 'right'" #value>
                <Radio readonly :disabled="option.disabled" :value="option.value" />
              </template>
            </ListItem>
          </List>
        </RadioGroup>
      </div>
    </div>
  </Popout>
</template>

<script setup lang="ts">
import { computed, ref, useTemplateRef } from 'vue'
import Popout from '../popout/popout.vue'
import RadioGroup from '../radio/radio-group.vue'
import Radio from '../radio/radio.vue'
import List from '../list/list.vue'
import ListItem from '../list/list-item.vue'
import Input from '../input/input.vue'
import { createBem } from '../../utils'
import {
  type RadioPopoutProps,
  type RadioPopoutSlots,
  type RadioPopoutEmits,
  defaultRadioPopoutProps,
} from './common'
import { useScrollSide, useOptionKeys } from '../../use'
import { Search } from '@sard/icons'
import { useFormPopout } from '../popout/useFormPopout'

const props = withDefaults(defineProps<RadioPopoutProps>(), defaultRadioPopoutProps)

defineSlots<RadioPopoutSlots>()

const emit = defineEmits<RadioPopoutEmits>()

const bem = createBem('radio-popout')

// main
const { innerVisible, draftValue, onChange, onConfirm, onVisibleHook } = useFormPopout(props, emit)

const { getLabel, getValue, getDisabled } = useOptionKeys(props)

const objectOptions = computed(() => {
  return props.options.map((option) => {
    return {
      label: getLabel(option),
      value: getValue(option),
      disabled: getDisabled(option) === true,
    }
  })
})

const select = (option: any, toggle: (value: any) => void) => {
  if (!option.disabled) {
    toggle(option.value)
  }
}

// search
const searchValue = ref('')

const filteredOptions = computed(() => {
  const searchString = searchValue.value
  if (!searchString) return objectOptions.value

  return objectOptions.value.filter((option) => {
    return option.label.includes(searchString)
  })
})

// scroll
const scrollRef = useTemplateRef('scroll')
const scrollSide = useScrollSide(scrollRef, {
  direction: 'vertical',
})

const containerClass = computed(() => {
  return [bem.e('container'), bem.em('container', scrollSide.vertical)]
})

const scrollClass = computed(() => {
  return [bem.e('scroll'), bem.em('scroll', 'searchable', props.searchable)]
})
</script>
