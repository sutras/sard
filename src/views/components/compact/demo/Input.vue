<template>
  <s-flex vertical gap="medium">
    <!-- 批次号区间：两段拼成一行，合并边框 -->
    <s-compact block>
      <s-input v-model="batchStart" placeholder="起始批次" />
      <s-input v-model="batchEnd" placeholder="截止批次" />
    </s-compact>

    <!-- 固定前缀 + 序号：窄框只放固定段 -->
    <s-compact block>
      <s-input v-model="unitPrefix" placeholder="EQ-2024-" style="width: 80px" />
      <s-input v-model="unitSerial" placeholder="序号 例 017" />
    </s-compact>

    <!-- 参数 + 编辑：直接修改当前设备的设定值 -->
    <s-compact block>
      <s-input v-model="setpoint" placeholder="设定温度 例 92（°C）" />
      <s-button>
        <PencilSquare />
      </s-button>
    </s-compact>

    <!-- 检索 + 位号 + 批次：两个条件一起提交 -->
    <s-compact block>
      <s-button>
        <Search />
      </s-button>
      <s-input v-model="unitCode" placeholder="设备位号" />
      <s-input v-model="batchNo" placeholder="批次号" />
    </s-compact>

    <!-- 检索 + 位号 + 编辑 + 批次：滤条件与编辑入口共用一行 -->
    <s-compact block>
      <s-button>
        <Search />
      </s-button>
      <s-input v-model="unitCodeEdit" placeholder="设备位号" />
      <s-button>
        <PencilSquare />
      </s-button>
      <s-input v-model="batchNoEdit" placeholder="批次号" />
    </s-compact>

    <!-- 点检月份区间：两端是年月选择器，中间限定设备 -->
    <s-compact block>
      <s-datetime-picker-input type="yM" :input-props="{ inlaid: false }" placeholder="起始月份">
        <template #arrow>
          <Down />
        </template>
      </s-datetime-picker-input>

      <s-input v-model="unitCodeMonth" placeholder="设备位号" />

      <s-datetime-picker-input type="yM" :input-props="{ inlaid: false }" placeholder="截止月份">
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
