<template>
  <doc-page title="Indexes 索引">
    <s-indexes
      :style="{
        height: indexesHeight,
      }"
    >
      <div v-for="section in sectionList" :key="section.anchor">
        <s-indexes-anchor :name="section.anchor" style="height: 0; overflow: hidden" />
        <s-indexes-anchor>
          {{ section.anchor }}
        </s-indexes-anchor>
        <s-list inlaid>
          <s-list-item
            v-for="item in section.children"
            :key="item.code"
            :title="item.title"
            hover
            @click="onSelect(item.code)"
          />
        </s-list>
      </div>
    </s-indexes>
  </doc-page>
</template>

<script setup lang="ts">
import { toast } from 'sard'
import areaCode from 'tel-area-code'
import { ref } from 'vue'

const indexesHeight = `calc(100vh - var(--s-status-bar-height) - var(--s-navbar-height) - var(--s-safe-bottom) - 20px)`

interface SectionItem {
  title: string
  code: string
}

interface Section {
  anchor: string
  children: SectionItem[]
}

const getSectionList = () => {
  const list: Section[] = []
  const map: Record<string, Section> = {}
  areaCode.forEach((item) => {
    const firstLetter = item.pinyin[0]
    let section = map[firstLetter]
    if (!section) {
      section = map[firstLetter] = {
        anchor: firstLetter.toUpperCase(),
        children: [],
      }
      list.push(section)
    }
    section.children.push({
      title: `${item.name} +${item.code}`,
      code: item.code,
    })
  })
  list.sort((a, b) => a.anchor.charCodeAt(0) - b.anchor.charCodeAt(0))

  return list
}

const sectionList = ref<Section[]>([])

toast.loading('加载中')

setTimeout(() => {
  sectionList.value = getSectionList()

  toast.hide()
}, 1000)

const onSelect = (code: string) => {
  toast(code)
}
</script>
