<template>
  <doc-page title="服务人员满意度评分表" padding-bottom="0">
    <s-form-plain
      ref="formRef"
      :model="formModel"
      :rules="formRules"
      scroll-to-first-error
      :scroll-into-view-options="{
        block: 'start',
        behavior: 'smooth',
      }"
    >
      <div class="form-description">
        尊敬的客户：感谢您对我们服务的支持！请根据您的真实体验为服务人员评分。
      </div>

      <div class="section">
        <div class="section-title">
          <span class="section-index">1</span>
          <span>基本信息</span>
        </div>
        <div class="section-content">
          <s-form-item-plain name="staff_name" class="form-item" #default="{ shouldShowStar }">
            <div class="form-label">
              <span v-if="shouldShowStar" class="form-star">*</span>
              服务人员姓名/工号：
            </div>
            <div class="form-input">
              <s-input
                v-model="formModel.staff_name"
                placeholder="请输入服务人员姓名/工号"
                clearable
                inlaid
              />
            </div>
          </s-form-item-plain>

          <s-form-item-plain name="service_date" class="form-item" #default="{ shouldShowStar }">
            <div class="form-label">
              <span v-if="shouldShowStar" class="form-star">*</span>
              服务日期：
            </div>
            <div class="form-input">
              <s-datetime-picker-input
                v-model="formModel.service_date"
                placeholder="请选择服务日期"
                clearable
              />
            </div>
          </s-form-item-plain>

          <s-form-item-plain name="contact" class="form-item" #default="{ shouldShowStar }">
            <div class="form-label">
              <span v-if="shouldShowStar" class="form-star">*</span>
              您的联系方式（可选）
            </div>
            <div class="form-input">
              <s-input
                type="textarea"
                v-model="formModel.contact"
                placeholder="请输入联系方式"
                clearable
                inlaid
                auto-height
                min-height="24px"
              />
            </div>
          </s-form-item-plain>
        </div>
      </div>

      <div class="section">
        <div class="section-title">
          <span class="section-index">2</span>
          <span>服务人员评分</span>
        </div>
        <div class="section-content">
          <s-form-item-plain name="professionalism" class="form-item" #default="{ shouldShowStar }">
            <div class="form-label">
              <span v-if="shouldShowStar" class="form-star">*</span>
              专业能力：是否具备足够的知识和技能？
            </div>
            <RadioList v-model="formModel.professionalism" :options="ratingOptions" />
          </s-form-item-plain>

          <s-form-item-plain name="attitude" class="form-item" #default="{ shouldShowStar }">
            <div class="form-label">
              <span v-if="shouldShowStar" class="form-star">*</span>
              服务态度：是否礼貌、耐心、热情？
            </div>
            <RadioList v-model="formModel.attitude" :options="ratingOptions" />
          </s-form-item-plain>

          <s-form-item-plain name="response_speed" class="form-item" #default="{ shouldShowStar }">
            <div class="form-label">
              <span v-if="shouldShowStar" class="form-star">*</span>
              响应速度：问题处理是否及时？
            </div>
            <RadioList v-model="formModel.response_speed" :options="ratingOptions" />
          </s-form-item-plain>

          <s-form-item-plain name="communication" class="form-item" #default="{ shouldShowStar }">
            <div class="form-label">
              <span v-if="shouldShowStar" class="form-star">*</span>
              沟通能力：表达是否清晰、易于理解？
            </div>
            <RadioList v-model="formModel.communication" :options="ratingOptions" />
          </s-form-item-plain>

          <s-form-item-plain name="problem_solving" class="form-item" #default="{ shouldShowStar }">
            <div class="form-label">
              <span v-if="shouldShowStar" class="form-star">*</span>
              问题解决：是否有效解决您的需求？
            </div>
            <RadioList v-model="formModel.problem_solving" :options="ratingOptions" />
          </s-form-item-plain>
        </div>
      </div>

      <div class="section">
        <div class="section-title">
          <span class="section-index">3</span>
          <span>整体评价</span>
        </div>
        <div class="section-content">
          <s-form-item-plain
            name="overall_satisfaction"
            class="form-item"
            #default="{ shouldShowStar }"
          >
            <div class="form-label">
              <span v-if="shouldShowStar" class="form-star">*</span>
              本次服务的整体满意度
            </div>
            <RadioList v-model="formModel.overall_satisfaction" :options="ratingOptions" />
          </s-form-item-plain>

          <s-form-item-plain name="would_return" class="form-item" #default="{ shouldShowStar }">
            <div class="form-label">
              <span v-if="shouldShowStar" class="form-star">*</span>
              您是否会再次选择该服务人员？
            </div>
            <RadioList v-model="formModel.would_return" :options="returnOptions" />
          </s-form-item-plain>
        </div>
      </div>

      <div class="section">
        <div class="section-title">
          <span class="section-index">4</span>
          <span>开放式反馈</span>
        </div>
        <div class="section-content">
          <s-form-item-plain name="strengths" class="form-item">
            <div class="form-label">服务人员的优点（可选）</div>
            <div class="form-input">
              <s-input
                v-model="formModel.strengths"
                type="textarea"
                placeholder="请输入服务人员的优点"
                clearable
                inlaid
                auto-height
                min-height="24px"
              />
            </div>
          </s-form-item-plain>

          <s-form-item-plain name="improvements" class="form-item">
            <div class="form-label">需要改进的方面（可选）</div>
            <div class="form-input">
              <s-input
                v-model="formModel.improvements"
                type="textarea"
                placeholder="请输入需要改进的方面"
                clearable
                inlaid
                auto-height
                min-height="24px"
              />
            </div>
          </s-form-item-plain>

          <s-form-item-plain name="suggestions" class="form-item">
            <div class="form-label">其他建议（可选）</div>
            <div class="form-input">
              <s-input
                v-model="formModel.suggestions"
                type="textarea"
                placeholder="请输入其他建议"
                clearable
                inlaid
                auto-height
                min-height="24px"
              />
            </div>
          </s-form-item-plain>
        </div>
      </div>

      <div class="footer">
        <s-button block @click="onSubmit">提交评价</s-button>
      </div>
    </s-form-plain>
  </doc-page>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { toast, type FormExpose, type FieldValidateError, type FormRules } from 'sard'
import RadioList from './RadioList.vue'

const formModel = reactive({
  staff_name: '',
  service_date: '',
  contact: '',
  professionalism: '',
  attitude: '',
  response_speed: '',
  communication: '',
  problem_solving: '',
  overall_satisfaction: '',
  would_return: '',
  strengths: '',
  improvements: '',
  suggestions: '',
})

const formRules: FormRules = {
  staff_name: {
    required: true,
    message: '请输入服务人员姓名/工号',
  },
  service_date: {
    required: true,
    message: '请选择服务日期',
  },
  professionalism: {
    required: true,
    message: '请打分',
  },
  attitude: {
    required: true,
    message: '请打分',
  },
  response_speed: {
    required: true,
    message: '请打分',
  },
  communication: {
    required: true,
    message: '请打分',
  },
  problem_solving: {
    required: true,
    message: '请打分',
  },
  overall_satisfaction: {
    required: true,
    message: '请选择整体满意度',
  },
  would_return: {
    required: true,
    message: '请选择',
  },
}

const formRef = ref<FormExpose>()

const onSubmit = () => {
  formRef.value
    ?.validate()
    .then(() => {
      toast('提交成功!')
    })
    .catch((error: FieldValidateError[]) => {
      toast(error[0].message)
      console.log('error submit!', error)
    })
}

const ratingOptions = [
  { value: '1', label: '不满意' },
  { value: '2', label: '一般' },
  { value: '3', label: '基本满意' },
  { value: '4', label: '非常满意' },
]

const returnOptions = [
  { value: 'yes', label: '是' },
  { value: 'no', label: '否' },
  { value: 'unsure', label: '不确定' },
]
</script>

<style lang="scss" scoped>
.form-description {
  padding: 10px 32px;
  font-size: var(--s-font-size-sm);
  color: var(--s-text-color-secondary);
  text-align: center;
}
.section {
  margin-top: 16px;
}
.section-title {
  display: flex;
  align-items: center;
  font-size: var(--s-font-size-lg);
}
.section-index {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 16px;
  height: 16px;
  margin-inline-end: 4px;
  font-size: var(--s-font-size-xs);
  color: #fff;
  background-color: var(--s-color-primary);
}
.section-content {
  margin: 0 16px;
}
.form-item {
  scroll-margin-top: 60px;
}
.form-label {
  margin: 20px 0 5px;
}
.form-star {
  color: var(--s-color-danger);
}
.form-input {
  margin-top: 10px;
  &::after {
    display: block;
    content: '';
    margin-top: 10px;
    border-top: 1px solid var(--s-border-color);
    transform: scaleY(0.5);
  }
}
.footer {
  position: sticky;
  bottom: 0;
  margin-top: 20px;
  padding: 10px 16px calc(10px + var(--s-safe-bottom));
  border-top: 1px solid var(--s-border-color);
  background-color: var(--s-bg-color-elevated);
}
</style>
