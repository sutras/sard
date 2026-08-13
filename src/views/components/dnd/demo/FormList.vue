<template>
  <s-form ref="formRef" :model="formModel" star-position="end" direction="vertical">
    <s-form-item label="活动名称" name="activity" required>
      <s-input v-model="formModel.activity" inlaid placeholder="请输入活动名称" clearable />
    </s-form-item>
    <s-form-item
      label="活动奖品"
      name="awards"
      :rules="{
        type: 'array',
        required: true,
      }"
    >
      <s-dnd v-if="formModel.awards.length > 0" v-model:list="formModel.awards" #default="{ list }">
        <s-dnd-item v-for="({ key, itemInfo, data }, i) in list" :key="key" :item-info="itemInfo">
          <div class="flex items-center gap-3 py-1">
            <s-button variant="text" color="danger" size="small" @click="removeAward(i)" #icon>
              <Trash />
            </s-button>
            <s-form-item
              :name="['awards', i, 'name']"
              :rules="{
                required: true,
                message: '请选择奖品',
              }"
              class="flex-1"
              inlaid
            >
              <s-picker-input
                v-model="data.name"
                :columns="awardList"
                clearable
                placeholder="奖品"
              />
            </s-form-item>
            <s-form-item
              :name="['awards', i, 'num']"
              :rules="{
                required: true,
                message: '请输入数量',
              }"
              inlaid
            >
              <s-stepper v-model="data.num" :min="1" size="small" placeholder="数量" />
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
      <s-button variant="outlined" class="mb-2" @click="addAward">新增奖品</s-button>
      <s-button class="mb-2" @click="submitForm(formRef)">提交</s-button>
      <s-button variant="outlined" color="secondary" @click="resetForm(formRef)">重置</s-button>
    </s-form-item>
  </s-form>
</template>

<script setup lang="ts">
import { List, Trash } from '@sard/icons'
import { type FormExpose, toast } from 'sard'
import { reactive, ref } from 'vue'

const awardList = ['台式机', '笔记本', '平板', '手机', '耳机']

const formRef = ref<FormExpose>()

interface Award {
  name: string
  num: number | null
}

const formModel = reactive<{
  activity: string
  awards: Award[]
}>({
  activity: '',
  awards: [],
})

const addAward = () => {
  formModel.awards.push(
    reactive({
      name: '',
      num: null,
    }),
  )
}

const removeAward = (index: number) => {
  formModel.awards.splice(index, 1)
}

const submitForm = (formEl?: FormExpose) => {
  formEl
    ?.validate()
    .then(() => {
      console.log(formModel)
      toast('提交成功')
    })
    .catch(() => {
      toast('提交失败')
    })
}

const resetForm = (formEl?: FormExpose) => {
  formEl?.reset()
}
</script>
