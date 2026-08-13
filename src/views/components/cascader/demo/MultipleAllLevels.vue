<template>
  <s-list card>
    <s-list-item>
      <s-cascader
        v-model="value"
        :options="regionData"
        :field-keys="{ label: 'name', value: 'code' }"
        multiple
        all-levels
        @change="onChange"
      />
    </s-list-item>
    <s-list-item title="当前值：">
      <template #value>
        <div class="line-clamp-3">
          {{ JSON.stringify(value) ?? 'undefined' }}
        </div>
      </template>
    </s-list-item>
    <s-list-item
      title="设置为：[[440000, 440100, 440106], [440000, 440100, 440111]] ([天河区, 白云区])"
      arrow
      hover
      @click="
        value = [
          [440000, 440100, 440106],
          [440000, 440100, 440111],
        ]
      "
    />
    <s-list-item title="清空" arrow hover @click="value = undefined" />
  </s-list>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { getRegionData } from 'region-data'
import { type CascaderOption, type CascaderValue } from 'sard'

const regionData = getRegionData()
const value = ref<CascaderValue | undefined>([
  [440000, 440100, 440106],
  [440000, 440100, 440111],
])

const onChange = (value: any, selectedOptions: CascaderOption[]) => {
  console.log('change', value, selectedOptions)
}
</script>
