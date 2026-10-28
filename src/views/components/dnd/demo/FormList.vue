<template>
  <!-- 工业语境：工单工艺参数录入，参数行可拖拽排序｜FormList 用法演示 -->
  <s-form ref="formRef" :model="formModel" star-position="end" direction="vertical">
    <s-form-item label="工单名称" name="orderNo" required>
      <s-input
        v-model="formModel.orderNo"
        inlaid
        placeholder="例 WO-20241027-0090 精车外圆"
        clearable
      />
    </s-form-item>
    <s-form-item
      label="工艺参数"
      name="params"
      :rules="{
        type: 'array',
        required: true,
      }"
    >
      <s-dnd v-if="formModel.params.length > 0" v-model:list="formModel.params" #default="{ list }">
        <s-dnd-item v-for="({ key, itemInfo, data }, i) in list" :key="key" :item-info="itemInfo">
          <div class="flex items-center gap-3 py-1">
            <s-button variant="text" color="danger" size="small" @click="removeParam(i)" #icon>
              <Trash />
            </s-button>
            <s-form-item
              :name="['params', i, 'name']"
              :rules="{
                required: true,
                message: '选择工艺参数',
              }"
              class="flex-1"
              inlaid
            >
              <s-picker-input
                v-model="data.name"
                :columns="paramList"
                clearable
                placeholder="参数项"
              />
            </s-form-item>
            <s-form-item
              :name="['params', i, 'value']"
              :rules="{
                required: true,
                message: '输入参数值',
              }"
              inlaid
            >
              <s-stepper
                v-model="data.value"
                :min="0"
                :step="10"
                :input-width="64"
                size="small"
                placeholder="数值"
              />
            </s-form-item>
            <s-dnd-handle>
              <s-text color="tertiary" size="large">
                <List />
              </s-text>
            </s-dnd-handle>
          </div>
        </s-dnd-item>
      </s-dnd>
      <div v-else>无</div>
    </s-form-item>
    <s-form-item>
      <s-button variant="outlined" class="mb-2" @click="addParam">新增参数</s-button>
      <s-button class="mb-2" @click="submitForm(formRef)">提交</s-button>
      <s-button variant="outlined" color="secondary" @click="resetForm(formRef)">重置</s-button>
    </s-form-item>
  </s-form>
</template>

<script setup lang="ts">
import { List, Trash } from '@sard/icons'
import { type FormExpose, toast } from 'sard'
import { reactive, ref } from 'vue'

const paramList = ['主轴转速', '进给速度', '冷却压力', '模温', '保压时间']

const formRef = ref<FormExpose>()

interface Param {
  name: string
  value: number | null
}

const formModel = reactive<{
  orderNo: string
  params: Param[]
}>({
  orderNo: 'WO-20241027-0090 精车外圆',
  params: [
    { name: '主轴转速', value: 1200 },
    { name: '进给速度', value: 120 },
  ],
})

const addParam = () => {
  formModel.params.push(
    reactive({
      name: '',
      value: null,
    }),
  )
}

const removeParam = (index: number) => {
  formModel.params.splice(index, 1)
}

const submitForm = (formEl?: FormExpose) => {
  formEl
    ?.validate()
    .then(() => {
      console.log(formModel)
      toast('提交已完成')
    })
    .catch(() => {
      toast('提交未完成')
    })
}

const resetForm = (formEl?: FormExpose) => {
  formEl?.reset()
}
</script>
