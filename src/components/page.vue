<template>
  <div
    :class="[bem.b(), bem.m('gray', gray)]"
    :style="{
      padding: padding || '',
      height: height || '',
      paddingBottom: paddingBottom || '',
    }"
  >
    <s-navbar
      :title="title"
      fixed
      status-bar
      show-divider
      show-back
      style="--s-navbar-title-max-width: 50%"
      @back="onBack"
    >
      <template #end>
        <!-- color scheme -->
        <s-popover v-model:visible="themeVisible">
          <template #reference>
            <s-navbar-item>
              {{ themeLabel }}
            </s-navbar-item>
          </template>
          <s-menu @select="onThemeSelect">
            <s-menu-item v-for="item in themeOptions" :value="item.value" :label="item.label" />
          </s-menu>
        </s-popover>

        <!-- i18n -->
        <s-popover v-model:visible="langVisible">
          <template #reference>
            <s-navbar-item>
              {{ localeLabel }}
            </s-navbar-item>
          </template>
          <s-menu @select="onLangSelect">
            <s-menu-item v-for="item in langOptions" :value="item.value" :label="item.label" />
          </s-menu>
        </s-popover>
      </template>
    </s-navbar>
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { createBem } from '@/utils'
import { useColorScheme, useLocale, type ColorScheme } from 'sard'
import { onMounted, onUnmounted, ref, watch } from 'vue'
import { computed } from 'vue'
import { useRouter } from 'vue-router'

withDefaults(
  defineProps<{
    title?: string
    navbarBg?: string
    padding?: string
    paddingBottom?: string
    height?: string
    gray?: boolean
  }>(),
  {},
)

const bem = createBem('page')

const router = useRouter()

const onBack = () => {
  if (window.history.state && window.history.state.back) {
    router.back()
  } else {
    router.replace('/')
  }
}

// ============================ theme ============================
const themeVisible = ref(false)

const { colorScheme } = useColorScheme()

const themeOptions: { label: string; value: ColorScheme }[] = [
  { label: '浅色', value: 'light' },
  { label: '深色', value: 'dark' },
  { label: '自动', value: 'auto' },
]

const themeLabel = computed(
  () => themeOptions.find((item) => item.value === colorScheme.value)!.label,
)

const onThemeSelect = (option: any) => {
  colorScheme.value = option.value
  themeVisible.value = false
}

const onDocThemeChange = (event: any) => {
  colorScheme.value = event.detail
}

onMounted(() => {
  document.addEventListener('theme-change', onDocThemeChange)
})

onUnmounted(() => {
  document.removeEventListener('theme-change', onDocThemeChange)
})

// ============================ lang ============================
const langVisible = ref(false)

const locale = useLocale()!

const langOptions = [
  { label: '中文', value: 'zhCN' },
  { label: 'English', value: 'enUS' },
  { label: 'العربية', value: 'arSA' },
]

const localeLabel = computed(() => langOptions.find((item) => item.value === locale.value)!.label)

const onLangSelect = (option: any) => {
  locale.value = option.value
  langVisible.value = false
}

watch(
  locale,
  () => {
    document.documentElement.setAttribute('dir', locale.value === 'arSA' ? 'rtl' : 'lrt')
  },
  {
    immediate: true,
  },
)
</script>

<style lang="scss">
@use '@/style/base.scss' as *;

@include b(page) {
  display: flex;
  flex-direction: column;
  padding: 10px 0 calc(10px + var(--s-safe-bottom));
  min-height: 100vh;

  @include m(gray) {
    &::before {
      content: '';
      position: fixed;
      inset: 0;
      z-index: -1;
      background-color: var(--s-bg-color-layout);
    }
  }
}
</style>
