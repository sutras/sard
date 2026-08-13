<template>
  <s-popout
    v-model:visible="innerVisible"
    title="搜索区号"
    :show-footer="false"
    @visible-hook="onVisibleHook"
  >
    <s-search ref="searchRef" v-model="searchValue" placeholder="搜索" shape="round" />
    <div class="overflow-y-auto" style="height: 70vh">
      <s-list inlaid>
        <s-list-item v-for="item in searchResult" :key="item.title" hover @click="onSelect(item)">
          <template #title>
            <div>
              <template v-for="(frag, i) in item.titleFrag" :key="i">
                <span :style="`color: ${i % 2 !== 0 ? 'var(--s-color-primary)' : ''}`">
                  {{ frag }}
                </span>
              </template>
            </div>
          </template>
        </s-list-item>
      </s-list>
      <div style="height: var(--s-safe-bottom)"></div>
    </div>
  </s-popout>
</template>

<script setup lang="ts">
import { throttle, type MotionHookName } from 'sard'
import areaCode from 'tel-area-code'
import { computed, ref, useTemplateRef, watch } from 'vue'

const props = defineProps<{
  visible?: boolean
}>()

const emit = defineEmits<{
  (e: 'update:visible', visible: boolean): void
  (e: 'select', code: string): void
}>()

// search
interface SearchItem {
  title: string
  code: string
  pinyin: string
}

interface SearchResultItem extends SearchItem {
  titleFrag: string[]
}

const searchList = computed(() => {
  const list: SearchItem[] = []
  areaCode.forEach((item) => {
    list.push({
      title: `${item.name} +${item.code}`,
      code: item.code,
      pinyin: item.pinyin,
    })
  })
  list.sort((a, b) => a.pinyin[0].charCodeAt(0) - b.pinyin[0].charCodeAt(0))

  return list
})

const searchValue = ref('')
const searchResult = ref<SearchResultItem[]>([])

const search = throttle(() => {
  searchResult.value = searchValue.value
    ? searchList.value
        .filter((item) => item.title.includes(searchValue.value))
        .map((item) => ({
          ...item,
          titleFrag: item.title.split(new RegExp(`((?:${searchValue.value})+)`)),
        }))
    : []
}, 350)

watch(searchValue, () => {
  search()
})

// visible
const innerVisible = computed({
  get() {
    return props.visible
  },
  set(value) {
    emit('update:visible', value)
  },
})

const searchRef = useTemplateRef('searchRef')

const onVisibleHook = (hook: MotionHookName) => {
  if (hook === 'enter') {
    searchValue.value = ''
  }

  if (hook === 'after-enter') {
    searchRef.value?.focus()
  }
}

const onSelect = (item: SearchItem) => {
  innerVisible.value = false
  emit('select', item.code)
}
</script>
