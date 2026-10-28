<template>
  <!-- 工业语境：工单下挂工艺参数，工单可拖拽排序、每张卡内的参数也可拖拽｜Nested 用法演示 -->
  <s-form-plain ref="formRef" :model="formModel" star-position="end">
    <s-dnd v-model:list="formModel.orders" #default="{ list }">
      <s-dnd-item
        v-for="({ data: order, key, itemInfo }, i) in list"
        :item-info="itemInfo"
        :key="key"
        class="mb-3"
      >
        <s-card>
          <template #title>
            <div class="flex items-center gap-5">
              <s-button variant="filled" color="danger" size="small" @click="removeOrder(i)" #icon>
                <Trash />
              </s-button>
              <s-form-item
                label="工单名称"
                :name="['orders', i, 'name']"
                inlaid
                required
                class="flex-1"
              >
                <s-input
                  v-model="order.name"
                  inlaid
                  placeholder="例 WO-20241027-0090 精车外圆"
                  clearable
                />
              </s-form-item>
              <s-dnd-handle>
                <s-text color="tertiary" size="large">
                  <List />
                </s-text>
              </s-dnd-handle>
            </div>
          </template>
          <s-form-item
            inlaid
            direction="vertical"
            label="工艺参数"
            :name="['orders', i, 'params']"
            :rules="{
              type: 'array',
              required: true,
            }"
          >
            <s-dnd v-if="order.params.length > 0" v-model:list="order.params" #default="{ list }">
              <s-dnd-item
                v-for="({ itemInfo, key, data: param }, j) in list"
                :key="key"
                :item-info="itemInfo"
              >
                <div class="flex items-center gap-3 py-1">
                  <s-button
                    variant="text"
                    color="danger"
                    size="small"
                    @click="removeParam(order.params, j)"
                    #icon
                  >
                    <Trash />
                  </s-button>
                  <s-form-item
                    :name="['orders', i, 'params', j, 'name']"
                    :rules="{
                      required: true,
                      message: '选择工艺参数',
                    }"
                    inlaid
                    class="flex-1"
                  >
                    <s-picker-input
                      v-model="param.name"
                      :columns="paramList"
                      clearable
                      placeholder="参数项"
                    />
                  </s-form-item>
                  <s-form-item
                    :name="['orders', i, 'params', j, 'value']"
                    :rules="{
                      required: true,
                      message: '输入参数值',
                    }"
                    inlaid
                  >
                    <s-stepper
                      v-model="param.value"
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
          <s-button
            class="mt-3"
            block
            variant="outlined"
            size="small"
            @click="addParam(order.params)"
          >
            新增参数
          </s-button>
        </s-card>
      </s-dnd-item>
    </s-dnd>

    <s-list card>
      <s-list-item>
        <s-empty v-if="formModel.orders.length === 0" size="small" />
      </s-list-item>
      <s-list-item>
        <s-button block variant="outlined" class="mb-2" @click="addOrder">新增工单</s-button>
        <s-button block class="mb-2" @click="submitForm()">提交</s-button>
        <s-button block variant="outlined" color="secondary" @click="resetForm()">重置</s-button>
      </s-list-item>
    </s-list>
  </s-form-plain>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { toast, type FormExpose } from 'sard'
import { List, Trash } from '@sard/icons'

interface Param {
  name: string
  value: number | null
}

interface Order {
  name: string
  params: Param[]
}

const paramList = ['主轴转速', '进给速度', '冷却压力', '模温', '保压时间']

const formRef = ref<FormExpose>()

const formModel = reactive<{
  orders: Order[]
}>({
  orders: [
    {
      name: 'WO-20241027-0090 精车外圆',
      params: [
        { name: '主轴转速', value: 1200 },
        { name: '进给速度', value: 120 },
      ],
    },
    {
      name: 'WO-20241027-0091 换模调试',
      params: [{ name: '模温', value: 60 }],
    },
  ],
})

const addOrder = () => {
  formModel.orders.push(
    reactive({
      name: '',
      params: [],
    }),
  )
}

const removeOrder = (index: number) => {
  formModel.orders.splice(index, 1)
}

const addParam = (params: Param[]) => {
  params.push(
    reactive({
      name: '',
      value: null,
    }),
  )
}

const removeParam = (params: Param[], index: number) => {
  params.splice(index, 1)
}

const submitForm = () => {
  formRef.value
    ?.validate()
    .then(() => {
      console.log(formModel)
      toast('提交已完成')
    })
    .catch(() => {
      toast('提交未完成')
    })
}

const resetForm = () => {
  formRef.value?.reset()
}
</script>
