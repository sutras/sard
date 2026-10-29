<template>
  <s-list card>
    <s-list-item arrow hover title="班组长授权（进入受控操作）" @click="visible = true" />
  </s-list>

  <s-dialog
    v-model:visible="visible"
    title="班组长授权"
    :overlay-closable="false"
    :before-close="beforeClose"
  >
    <s-form ref="formRef" :model="formState">
      <s-form-item
        name="employeeNo"
        label="工号"
        :rules="[{ required: true, message: '请刷工牌或输入工号' }]"
      >
        <s-input inlaid placeholder="例 A-1042" v-model="formState.employeeNo" />
      </s-form-item>
      <s-form-item
        name="password"
        label="授权码"
        :rules="[{ required: true, message: '请输入 6 位授权码' }]"
      >
        <s-input type="password" inlaid placeholder="6 位动态授权码" v-model="formState.password" />
      </s-form-item>
      <s-form-item label="授权范围">
        <s-text size="small">仅本次会话有效：设备停机、参数变更、联锁旁路</s-text>
      </s-form-item>
    </s-form>
  </s-dialog>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { toast } from 'sard'

const visible = ref(false)

const formRef = ref()

const formState = reactive({
  employeeNo: '',
  password: '',
})

const beforeClose = (type: string) => {
  if (type === 'confirm') {
    return formRef.value?.validate().then(() => {
      toast(`已授权：工号 ${formState.employeeNo}，授权范围 3 项，有效期至本班次结束`)
      formRef.value?.reset()
    })
  }
}
</script>
