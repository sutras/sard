<template>
  <s-form :model="model" direction="vertical">
    <s-form-item>
      <s-input v-model="model.phone" inlaid placeholder="请输入手机号">
        <template #prepend>
          <s-button
            variant="link"
            color="secondary"
            style="padding-inline-start: 0"
            @click="areaVisible = true"
          >
            +{{ model.areaCode }}
            <CaretDown class="ms-1 mt-1" />
          </s-button>
        </template>
      </s-input>
    </s-form-item>
  </s-form>

  <AreaCode v-model:visible="areaVisible" @select="onSelect" />
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import AreaCode from './AreaCode.vue'
import { CaretDown } from '@sard/icons'

const model = reactive({
  areaCode: '86',
  phone: '',
})

const areaVisible = ref(false)

const onSelect = (code: string) => {
  model.areaCode = code
}
</script>
