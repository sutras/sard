<template>
  <!-- 工业语境：紧凑排布用来表达「同一行的区间/组合条件」，每段占位写清自己那一段的含义｜Input 用法演示 -->
  <s-flex vertical gap="medium">
    <!-- 批次号区间：两段拼成一行，合并边框 -->
    <s-compact block>
      <s-input v-model="batchStart" placeholder="起始批次" aria-label="起始批次号" />
      <s-input v-model="batchEnd" placeholder="截止批次" aria-label="截止批次号" />
    </s-compact>

    <!-- 固定前缀 + 序号：窄框只放固定段 -->
    <s-compact block>
      <s-input
        v-model="unitPrefix"
        placeholder="EQ-2024-"
        aria-label="设备编号前缀"
        style="width: 80px"
      />
      <s-input v-model="unitSerial" placeholder="序号 例 017" aria-label="设备编号序号" />
    </s-compact>

    <!-- 参数 + 编辑：直接修改当前设备的设定值 -->
    <s-compact block>
      <s-input
        v-model="setpoint"
        placeholder="设定温度 例 92（°C）"
        aria-label="设定温度，单位摄氏度"
      />
      <s-button aria-label="编辑工艺参数">
        <PencilSquare />
      </s-button>
    </s-compact>

    <!-- 检索 + 位号 + 批次：两个条件一起提交 -->
    <s-compact block>
      <s-button aria-label="按位号与批次检索设备">
        <Search />
      </s-button>
      <s-input v-model="unitCode" placeholder="设备位号" aria-label="设备位号" />
      <s-input v-model="batchNo" placeholder="批次号" aria-label="批次号" />
    </s-compact>

    <!-- 检索 + 位号 + 编辑 + 批次：滤条件与编辑入口共用一行 -->
    <s-compact block>
      <s-button aria-label="检索设备">
        <Search />
      </s-button>
      <s-input v-model="unitCodeEdit" placeholder="设备位号" aria-label="设备位号" />
      <s-button aria-label="编辑设备档案">
        <PencilSquare />
      </s-button>
      <s-input v-model="batchNoEdit" placeholder="批次号" aria-label="批次号" />
    </s-compact>

    <!-- 点检月份区间：两端是年月选择器，中间限定设备 -->
    <s-compact block>
      <s-datetime-picker-input
        type="yM"
        :input-props="{ inlaid: false }"
        placeholder="起始月份"
        aria-label="点检记录起始月份"
      >
        <template #arrow>
          <Down />
        </template>
      </s-datetime-picker-input>

      <s-input v-model="unitCodeMonth" placeholder="设备位号" aria-label="设备位号" />

      <s-datetime-picker-input
        type="yM"
        :input-props="{ inlaid: false }"
        placeholder="截止月份"
        aria-label="点检记录截止月份"
      >
        <template #arrow>
          <Down />
        </template>
      </s-datetime-picker-input>
    </s-compact>
  </s-flex>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Down, PencilSquare, Search } from '@sard/icons'

const batchStart = ref('')
const batchEnd = ref('')
const unitPrefix = ref('')
const unitSerial = ref('')
const setpoint = ref('')
const unitCode = ref('')
const batchNo = ref('')
const unitCodeEdit = ref('')
const batchNoEdit = ref('')
const unitCodeMonth = ref('')
</script>
