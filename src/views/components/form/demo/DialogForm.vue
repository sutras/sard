<template>
  <!-- 演示弹窗内新建工单：弹窗不可点遮罩关闭，未通过校验时保持打开并阻断下发 -->
  <doc-page gray title="弹出层中的新建表单">
    <div class="mx-4">
      <s-button block aria-label="新建生产工单" @click="visible = true">新建生产工单</s-button>
    </div>
    <s-dialog
      v-model:visible="visible"
      title="新建生产工单"
      :headed="false"
      :overlay-closable="false"
      confirm-text="提交并授权"
      cancel-text="取消"
      :before-close="beforeClose"
    >
      <s-form ref="formRef" :model="formState">
        <s-form-item
          name="orderNo"
          label="工单编号"
          :rules="[
            {
              required: true,
              message: '工单编号必填，例 WO-20241027-0090',
            },
          ]"
        >
          <s-input v-model="formState.orderNo" placeholder="WO-20241027-0090" />
        </s-form-item>
        <s-form-item name="description" label="工艺说明">
          <s-input
            type="textarea"
            v-model="formState.description"
            placeholder="例：模温 92 °C / 保压 45 MPa / 冷却 18 s"
          />
        </s-form-item>
        <s-form-item name="visibility">
          <s-radio-group v-model="formState.visibility" direction="horizontal" class="ms-auto">
            <s-radio value="public">全厂可见</s-radio>
            <s-radio value="controlled">受控（仅工艺与班组）</s-radio>
          </s-radio-group>
        </s-form-item>
      </s-form>
      <div style="margin-bottom: 10px"></div>
    </s-dialog>
  </doc-page>
</template>
<script setup lang="ts">
import { reactive, ref, toRaw } from 'vue'
import { toast, type FormExpose, type FieldValidateError } from 'sard'

interface Values {
  orderNo: string
  description: string
  visibility: string
}

const formRef = ref<FormExpose>()
const visible = ref(false)

const formState = reactive<Values>({
  orderNo: '',
  description: '',
  visibility: 'controlled',
})

const beforeClose = (type: string) => {
  if (type === 'confirm') {
    return formRef.value
      ?.validate()
      .then(() => {
        toast(`工单 ${formState.orderNo} 已创建，等待班组长授权后下发`)
        console.log('工单数据: ', toRaw(formState))
        formRef.value?.reset()
      })
      .catch((error: FieldValidateError[]) => {
        console.log('校验未通过，已阻断提交: ', error)
        throw error
      })
  }
}
</script>
