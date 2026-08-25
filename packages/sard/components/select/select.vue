<template>
  <div :class="bem.b()">
    <div v-if="filterable" :class="bem.e('search')">
      <Input v-model="searchValue" :placeholder="filterPlaceholder" clearable>
        <template #prepend>
          <Search />
        </template>
        <template #append>
          <Loading v-if="isLoading" :class="bem.e('loading')" />
        </template>
      </Input>
    </div>
    <div :class="containerClass">
      <div ref="scroll" :class="scrollClass">
        <slot>
          <template v-if="isGroupable">
            <SelectOptionGroup
              v-for="group in options"
              :key="getKey(getValue(group))"
              :label="getLabel(group)"
              :value="getValue(group)"
            >
              <SelectOption
                v-for="item in getChildren(group)"
                :key="getKey(getValue(item))"
                :label="getLabel(item)"
                :value="getValue(item)"
              >
                <template v-if="slots['option']" #default="optionProps">
                  <slot name="option" v-bind="optionProps"></slot>
                </template>
                <template v-if="slots['option-label']" #label="labelProps">
                  <slot name="option-label" v-bind="labelProps"></slot>
                </template>
              </SelectOption>
            </SelectOptionGroup>
          </template>
          <template v-else>
            <SelectOption
              v-for="item in options"
              :key="getKey(getValue(item))"
              :label="getLabel(item)"
              :value="getValue(item)"
            >
              <template v-if="slots['option']" #default="optionProps">
                <slot name="option" v-bind="optionProps"></slot>
              </template>
              <template v-if="slots['option-label']" #label="labelProps">
                <slot name="option-label" v-bind="labelProps"></slot>
              </template>
            </SelectOption>
          </template>
        </slot>
        <div v-if="isEmpty" :class="bem.e('empty')">
          <Empty size="small" />
        </div>
        <div v-if="remote && !isEmpty" ref="load-more">
          <LoadMore :status="status" @load-more="onLoadMore" @reload="onReload" />
        </div>
      </div>
    </div>
    <div v-if="multiple && showToolbar" :class="bem.e('toolbar')">
      <div :class="bem.e('num')">
        {{
          t('selected', {
            num: innerValue.length,
          })
        }}
      </div>
      <Button variant="link" color="secondary" @click="onClear">
        {{ t('clearSelect') }}
      </Button>
      <Button v-if="showSelectAll" variant="link" @click="onSelectAll">
        {{ t('selectAll') }}
      </Button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, ref, useTemplateRef, watch } from 'vue'
import { createBem, debounce, scrollToTarget } from '../../utils'
import {
  type SelectProps,
  type SelectSlots,
  type SelectEmits,
  type SelectExpose,
  defaultSelectProps,
} from './common'
import { useOptionKeys, useScrollSide } from '../../use'
import { useTranslateWithPrefix } from '../../locale'
import Input from '../input/input.vue'
import Button from '../button/button.vue'
import SelectOptionGroup from './select-option-group.vue'
import SelectOption from './select-option.vue'
import LoadMore from '../load-more/load-more.vue'
import Empty from '../empty/empty.vue'
import { useSelect } from './useSelect'
import { usePopupEnter } from '../popup'
import { Search } from '@sard/icons'
import { useLoadMore } from '../load-more/useLoadMore'
import Loading from '../loading/loading.vue'

const props = withDefaults(defineProps<SelectProps>(), defaultSelectProps)

const slots = defineSlots<SelectSlots>()

const emit = defineEmits<SelectEmits>()

const bem = createBem('select')

const { t } = useTranslateWithPrefix('select')

const { getLabel, getValue, getChildren, getKey } = useOptionKeys(props)

const isGroupable = computed(() => {
  const first = props.options[0]
  return first && Array.isArray(getChildren(first))
})

const { innerValue, members, getEnabledValue } = useSelect(props, {
  onToggle(value) {
    triggerChange(value)
  },
  onSelect(value) {
    emit('select', value)
  },
})

watch(
  () => props.modelValue,
  (value) => {
    innerValue.value = props.multiple ? (Array.isArray(value) ? value : []) : value
  },
  {
    immediate: true,
  },
)

const triggerChange = (nextValue: any) => {
  innerValue.value = nextValue
  emit('update:modelValue', nextValue)
  emit('change', nextValue)
}

const scrollRef = useTemplateRef('scroll')
const scrollSide = useScrollSide(scrollRef, {
  direction: 'vertical',
})

// ============================ search ============================
const searchValue = ref('')

watch(
  () => props.filterValue,
  () => {
    searchValue.value = String(props.filterValue ?? '')
  },
)

watch(searchValue, () => {
  props.filterMethod?.(searchValue.value)
  debouncedRefresh()

  if (searchValue.value !== props.filterValue) {
    emit('update:filter-value', searchValue.value)
  }
})

// ============================ remote ============================
const loadMoreRef = useTemplateRef('load-more')

const { status, isLoading, onLoadMore, onReload, refresh } = useLoadMore({
  root: scrollRef,
  target: loadMoreRef,
  disabled: () => !props.remote || !props.remoteMethod,
  request: async (page, isRefresh) => {
    return props.remoteMethod(searchValue.value, page, isRefresh).then((loaded) => {
      if (isRefresh && scrollRef.value) {
        scrollRef.value.scrollTop = 0
      }
      return loaded
    })
  },
})

const debouncedRefresh = debounce(refresh, props.threshold)

onBeforeUnmount(() => {
  debouncedRefresh.cancel()
})

const isEmpty = computed(() => {
  return members.length === 0 && (props.remote ? status.value === 'complete' : true)
})

// ============================ toolbar ============================
const onClear = () => {
  if (innerValue.value.length > 0) {
    triggerChange([])
  }
}

const onSelectAll = () => {
  triggerChange(getEnabledValue())
}

const showSelectAll = computed(() => {
  return props.multiple && props.multipleLimit <= 0
})

// ============================ scroll into view ============================
function scrollIntoView() {
  const member = members.find((member) => member.isSelected)
  if (member && member.el) {
    scrollToTarget(scrollRef.value!, member.el, {
      vertical: true,
    })
  }
}

watch(
  innerValue,
  () => {
    if (!props.multiple) {
      scrollIntoView()
    }
  },
  {
    flush: 'post',
    immediate: true,
  },
)

usePopupEnter(() => {
  scrollIntoView()
})

// ============================ style ============================

const containerClass = computed(() => {
  return [bem.e('container'), bem.em('container', scrollSide.vertical)]
})

const scrollClass = computed(() => {
  return [bem.e('scroll'), bem.em('scroll', 'filterable', props.filterable)]
})

defineExpose<SelectExpose>({})
</script>
