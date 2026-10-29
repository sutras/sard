<template>
  <s-list card>
    <s-list-item>
      <s-picker
        v-model="value"
        :columns="columns"
        :option-keys="{ label: 'name', value: 'name' }"
        @change="onChange"
      >
        <template #option="{ option }">
          <div class="line-option" :data-status="option.status">
            <span class="line-option__dot" :style="{ backgroundColor: option.color }"></span>
            <span class="line-option__name">{{ option.name }}</span>
            <span class="line-option__status" :style="{ color: option.color }">
              {{ option.status }}
            </span>
          </div>
        </template>
      </s-picker>
    </s-list-item>
    <s-list-item title="当前值：" :value="JSON.stringify(value) ?? 'undefined'" />
    <s-list-item title="设置为: 包装五线" arrow hover @click="value = '包装五线'" />
    <s-list-item title="清空" arrow hover @click="value = undefined" />
  </s-list>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const columns = [
  { name: '机加工一线', status: '运行中', color: 'var(--s-color-success)' },
  { name: '注塑二线', status: '报警', color: 'var(--s-color-danger)' },
  { name: '压铸四线', status: '停机', color: 'var(--s-text-color-secondary)' },
  { name: '包装五线', status: '待机', color: 'var(--s-color-warning)' },
]

const value = ref<string | undefined>('注塑二线')

const onChange = (value: any) => {
  console.log('产线切换到', value)
}
</script>

<style lang="scss" scoped>
.line-option {
  display: flex;
  align-items: center;
  width: 100%;
  height: var(--s-picker-view-indicator-height);
  padding: 0 var(--s-size);
  font-size: var(--s-picker-view-font-size);
  line-height: 1.2;
  text-align: start;
}

.line-option__dot {
  flex: none;
  width: 8px;
  height: 8px;
  border-radius: 50%;
}

.line-option__name {
  margin-inline-start: 8px;
  font-weight: 500;
  color: var(--s-text-color);
}

.line-option__status {
  margin-inline-start: auto;
  font-size: var(--s-font-size-sm);
}
</style>
