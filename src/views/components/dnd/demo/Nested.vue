<template>
  <s-form-plain ref="formRef" :model="formModel" star-position="end">
    <s-dnd v-model:list="formModel.activities" #default="{ list }">
      <s-dnd-item
        v-for="({ data: activity, key, itemInfo }, i) in list"
        :item-info="itemInfo"
        :key="key"
        class="mb-3"
      >
        <s-card>
          <template #title>
            <div class="flex items-center gap-5">
              <s-button
                variant="filled"
                color="danger"
                size="small"
                @click="removeActivity(i)"
                #icon
              >
                <Trash />
              </s-button>
              <s-form-item label="活动名称" :name="['activities', i, 'name']" inlaid required>
                <s-input v-model="activity.name" inlaid placeholder="请输入活动名称" clearable />
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
            label="活动奖品"
            :name="['activities', i, 'awards']"
            :rules="{
              type: 'array',
              required: true,
            }"
          >
            <s-dnd
              v-if="activity.awards.length > 0"
              v-model:list="activity.awards"
              #default="{ list }"
            >
              <s-dnd-item
                v-for="({ itemInfo, key, data: award }, j) in list"
                :key="key"
                :item-info="itemInfo"
              >
                <div class="flex items-center gap-3 py-1">
                  <s-button
                    variant="text"
                    color="danger"
                    size="small"
                    @click="removeAward(activity.awards, j)"
                    #icon
                  >
                    <Trash />
                  </s-button>
                  <s-form-item
                    :name="['activities', i, 'awards', j, 'name']"
                    :rules="{
                      required: true,
                      message: '请选择奖品',
                    }"
                    inlaid
                  >
                    <s-picker-input
                      v-model="award.name"
                      :columns="awardList"
                      clearable
                      placeholder="奖品"
                    />
                  </s-form-item>
                  <s-form-item
                    :name="['activities', i, 'awards', j, 'num']"
                    :rules="{
                      required: true,
                      message: '请输入数量',
                    }"
                    inlaid
                  >
                    <s-stepper v-model="award.num" :min="1" size="small" placeholder="数量" />
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
            @click="addAward(activity.awards)"
          >
            新增奖品
          </s-button>
        </s-card>
      </s-dnd-item>
    </s-dnd>

    <s-list card>
      <s-list-item>
        <s-empty v-if="formModel.activities.length === 0" size="small" />
      </s-list-item>
      <s-list-item>
        <s-button block variant="outlined" class="mb-2" @click="addActivity">新增活动</s-button>
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

interface Award {
  name: string
  num: number | null
}

interface Activity {
  name: string
  awards: Award[]
}

const awardList = ['台式机', '笔记本', '平板', '手机', '耳机']

const formRef = ref<FormExpose>()

const formModel = reactive<{
  activities: Activity[]
}>({
  activities: [],
})

const addActivity = () => {
  formModel.activities.push(
    reactive({
      name: '',
      awards: [],
    }),
  )
}

const removeActivity = (index: number) => {
  formModel.activities.splice(index, 1)
}

const addAward = (awards: Award[]) => {
  awards.push(
    reactive({
      name: '',
      num: null,
    }),
  )
}

const removeAward = (awards: Award[], index: number) => {
  awards.splice(index, 1)
}

const submitForm = () => {
  formRef.value
    ?.validate()
    .then(() => {
      console.log(formModel)
      toast('提交成功')
    })
    .catch(() => {
      toast('提交失败')
    })
}

const resetForm = () => {
  formRef.value?.reset()
}
</script>
