<template>
  <!-- 工业语境：参数锁定（审批中）与联锁状态只读 -->
  <doc-page gray title="表单只读和禁用">
    <s-list>
      <s-list-item title="只读">
        <template #value>
          <s-switch v-model="formReadonly" />
        </template>
      </s-list-item>
      <s-list-item title="禁用">
        <template #value>
          <s-switch v-model="formDisabled" />
        </template>
      </s-list-item>
    </s-list>

    <s-form :disabled="formDisabled" :readonly="formReadonly" label-width="100px">
      <s-form-item label="点检项">
        <s-checkbox-group v-model="checkboxValue">
          <s-checkbox value="apple">导轨油位</s-checkbox>
          <s-checkbox value="pear">主轴温度</s-checkbox>
        </s-checkbox-group>
      </s-form-item>
      <s-form-item label="班次">
        <s-radio-group v-model="radioValue">
          <s-radio value="apple">早班</s-radio>
          <s-radio value="pear">中班</s-radio>
        </s-radio-group>
      </s-form-item>
      <s-form-item label="设备位号">
        <s-input />
      </s-form-item>
      <s-form-item label="产线">
        <s-picker-input
          placeholder="选择产线"
          :columns="[
            {
              label: '机加工一线',
              value: 'line-1',
            },
          ]"
        />
      </s-form-item>
      <s-form-item label="所属厂区">
        <s-cascader-input placeholder="选择厂区 / 车间" :options="options" />
      </s-form-item>
      <s-form-item label="点检日期">
        <s-datetime-picker-input placeholder="选择点检日期" />
      </s-form-item>
      <s-form-item label="点检区间">
        <s-calendar-input placeholder="选择点检区间" type="range" />
      </s-form-item>
      <s-form-item label="申领数量">
        <s-stepper />
      </s-form-item>
      <s-form-item label="点检备注">
        <s-input type="textarea" />
      </s-form-item>
      <s-form-item label="授权码输入">
        <s-password-input gap="0" model-value="123" style="height: 40px" />
      </s-form-item>
      <s-form-item label="联锁使能">
        <s-switch :model-value="true" />
      </s-form-item>
      <s-form-item label="班组评分">
        <s-rate :model-value="3" />
      </s-form-item>
      <s-form-item label="负载率">
        <s-slider :model-value="50" />
      </s-form-item>
      <s-form-item label="现场照片">
        <s-upload />
      </s-form-item>
      <s-form-item label="提交">
        <s-button>提交点检</s-button>
      </s-form-item>
    </s-form>
  </doc-page>
</template>
<script setup lang="ts">
import { ref, reactive } from 'vue'

const formDisabled = ref(true)
const formReadonly = ref(false)

const checkboxValue = ref(['apple'])
const radioValue = ref('apple')
const options = reactive([
  {
    value: 'east',
    label: '华东厂区',
    children: [
      {
        value: 'machining',
        label: '机加车间',
      },
    ],
  },
])
</script>
