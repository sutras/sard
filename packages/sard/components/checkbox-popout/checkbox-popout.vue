<template>
  <Popout
    v-model:visible="innerVisible"
    :title="title"
    @confirm="onConfirm"
    @visible-hook="onVisibleHook"
  >
    <div v-if="searchable || showCheckAll" :class="bem.e('toolbar')">
      <Input v-if="searchable" v-model="searchValue" :placeholder="filterPlaceholder" clearable>
        <template #prepend>
          <Search />
        </template>
      </Input>
      <Checkbox
        v-if="showCheckAll"
        v-model:checked="allChecked"
        :class="bem.e('check-all')"
        :indeterminate="isIndeterminate"
        @change="onAllChange"
      >
        {{ count }}
      </Checkbox>
    </div>
    <div :class="containerClass">
      <div ref="scroll" :class="scrollClass">
        <CheckboxGroup
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
                <Checkbox
                  readonly
                  :disabled="option.disabled"
                  :value="option.value"
                  :validate-event="false"
                />
              </template>
              <template v-if="iconPosition === 'right'" #value>
                <Checkbox
                  readonly
                  :disabled="option.disabled"
                  :value="option.value"
                  :validate-event="false"
                />
              </template>
            </ListItem>
          </List>
        </CheckboxGroup>
      </div>
    </div>
  </Popout>
</template>

<script setup lang="ts">
import { computed, ref, useTemplateRef } from 'vue'
import Popout from '../popout/popout.vue'
import CheckboxGroup from '../checkbox/checkbox-group.vue'
import Checkbox from '../checkbox/checkbox.vue'
import List from '../list/list.vue'
import ListItem from '../list/list-item.vue'
import Input from '../input/input.vue'
import { createBem } from '../../utils'
import {
  type CheckboxPopoutProps,
  type CheckboxPopoutSlots,
  type CheckboxPopoutEmits,
  defaultCheckboxPopoutProps,
} from './common'
import { useScrollSide, useIndeterminate, useOptionKeys } from '../../use'
import { Search } from '@sard/icons'
import { useFormPopout } from '../popout/useFormPopout'

const props = withDefaults(defineProps<CheckboxPopoutProps>(), defaultCheckboxPopoutProps)

defineSlots<CheckboxPopoutSlots>()

const emit = defineEmits<CheckboxPopoutEmits>()

const bem = createBem('checkbox-popout')

const { getValue, getLabel, getDisabled } = useOptionKeys(props)

const { innerVisible, draftValue, onChange, onConfirm, onVisibleHook } = useFormPopout(props, emit)

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

const { allChecked, isIndeterminate, onAllChange } = useIndeterminate(draftValue, objectOptions)

// ============================ search ============================
const searchValue = ref('')

const filteredOptions = computed(() => {
  const searchString = searchValue.value
  if (!searchString) return objectOptions.value

  return objectOptions.value.filter((option) => {
    return option.label.includes(searchString)
  })
})

// ============================ count ============================
const count = computed(() => {
  return (draftValue.value?.length || 0) + ' / ' + props.options.length
})

// ============================ scroll ============================
const scrollRef = useTemplateRef('scroll')
const scrollSide = useScrollSide(scrollRef, {
  direction: 'vertical',
})

// ============================ style ============================
const containerClass = computed(() => {
  return [bem.e('container'), bem.em('container', scrollSide.vertical)]
})

const scrollClass = computed(() => {
  return [bem.e('scroll'), bem.em('scroll', 'searchable', props.searchable)]
})
</script>
