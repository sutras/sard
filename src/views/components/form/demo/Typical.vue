<template>
  <doc-page gray title="典型表单">
    <s-form :model="form" label-width="120px">
      <s-form-item label="工单编号">
        <s-input inlaid v-model="form.orderNo" placeholder="例 WO-20241027-0083" />
      </s-form-item>
      <s-form-item label="产线">
        <s-picker-input
          v-model="form.line"
          placeholder="请选择产线"
          title="请选择产线"
          :columns="[
            { label: '机加工一线', value: 'line-machining-1' },
            { label: '注塑二线', value: 'line-injection-2' },
            { label: '压铸四线', value: 'line-casting-4' },
          ]"
        />
      </s-form-item>
      <s-form-item label="计划开工日">
        <s-datetime-picker-input v-model="form.date1" type="yMd" placeholder="选择开工日期" />
      </s-form-item>
      <s-form-item label="">
        <s-datetime-picker-input v-model="form.date2" type="hms" placeholder="选择开工时刻" />
      </s-form-item>
      <s-form-item label="生产时段">
        <s-datetime-range-picker-input
          v-model="form.date3"
          type="hms"
          :tabs="['start', 'end']"
          placeholder="选择生产时段"
        />
      </s-form-item>
      <s-form-item label="开工前预热">
        <s-switch v-model="form.preheat" />
      </s-form-item>
      <s-form-item label="变更项">
        <s-checkbox-input
          v-model="form.scopes"
          placeholder="选择变更项"
          :options="[
            { label: '工艺参数', value: 'process' },
            { label: '工装夹具', value: 'fixture' },
            { label: '程序版本', value: 'program' },
            { label: '检验标准', value: 'inspection' },
          ]"
        />
      </s-form-item>
      <s-form-item label="优先级">
        <s-radio-input
          v-model="form.priority"
          placeholder="选择优先级"
          :options="[
            { label: '正常排产', value: 'normal' },
            { label: 'L2 加急', value: 'urgent' },
          ]"
        />
      </s-form-item>
      <s-form-item label="工艺说明" label-valign="start">
        <s-input
          inlaid
          v-model="form.desc"
          type="textarea"
          placeholder="例：模温 92 °C / 保压 45 MPa / 冷却 18 s"
          show-count
        />
      </s-form-item>
      <s-form-item>
        <s-button @click="onSubmit">提交工单</s-button>
        <s-button style="margin-top: 10px" variant="outlined">取消</s-button>
      </s-form-item>
    </s-form>
  </doc-page>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { toast } from 'sard'

const form = reactive({
  orderNo: '',
  line: '',
  date1: undefined,
  date2: undefined,
  date3: undefined,
  preheat: false,
  scopes: [],
  priority: '',
  desc: '',
})

const onSubmit = () => {
  toast('工单已提交，等待班组长授权后下发至产线')
}
</script>
