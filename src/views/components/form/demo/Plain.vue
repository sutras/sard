<template>
  <!-- 工业语境：设备维保验收单，用自定义结构贴合车间大屏｜Plain 用法演示 -->
  <doc-page title="自定义表单样式和结构" padding-bottom="0">
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
        维修工单完工后由设备主管验收：按项判定维保质量，结论决定设备能否恢复生产。
      </div>

      <div class="section">
        <div class="section-title">
          <span class="section-index">1</span>
          <span>基本信息</span>
        </div>
        <div class="section-content">
          <s-form-item-plain name="order_no" class="form-item" #default="{ shouldShowStar }">
            <div class="form-label">
              <span v-if="shouldShowStar" class="form-star">*</span>
              维修工单号：
            </div>
            <div class="form-input">
              <s-input
                v-model="formModel.order_no"
                placeholder="例 WO-20241027-0085"
                clearable
                inlaid
              />
            </div>
          </s-form-item-plain>

          <s-form-item-plain name="accept_date" class="form-item" #default="{ shouldShowStar }">
            <div class="form-label">
              <span v-if="shouldShowStar" class="form-star">*</span>
              验收日期：
            </div>
            <div class="form-input">
              <s-datetime-picker-input
                v-model="formModel.accept_date"
                placeholder="请选择验收日期"
                clearable
              />
            </div>
          </s-form-item-plain>

          <s-form-item-plain name="inspector" class="form-item" #default="{ shouldShowStar }">
            <div class="form-label">
              <span v-if="shouldShowStar" class="form-star">*</span>
              验收人 / 工号：
            </div>
            <div class="form-input">
              <s-input
                v-model="formModel.inspector"
                placeholder="例 王海 A-1042（设备主管）"
                clearable
                inlaid
              />
            </div>
          </s-form-item-plain>
        </div>
      </div>

      <div class="section">
        <div class="section-title">
          <span class="section-index">2</span>
          <span>维保质量判定</span>
        </div>
        <div class="section-content">
          <s-form-item-plain name="fault_locate" class="form-item" #default="{ shouldShowStar }">
            <div class="form-label">
              <span v-if="shouldShowStar" class="form-star">*</span>
              故障定位：是否找到根因并消除，而非仅复位报警？
            </div>
            <RadioList v-model="formModel.fault_locate" :options="qualityOptions" />
          </s-form-item-plain>

          <s-form-item-plain name="parts_replace" class="form-item" #default="{ shouldShowStar }">
            <div class="form-label">
              <span v-if="shouldShowStar" class="form-star">*</span>
              备件更换：型号与批次是否正确、旧件是否回收？
            </div>
            <RadioList v-model="formModel.parts_replace" :options="qualityOptions" />
          </s-form-item-plain>

          <s-form-item-plain
            name="interlock_restore"
            class="form-item"
            #default="{ shouldShowStar }"
          >
            <div class="form-label">
              <span v-if="shouldShowStar" class="form-star">*</span>
              联锁恢复：安全门、光栅、急停回路是否全部复检通过？
            </div>
            <RadioList v-model="formModel.interlock_restore" :options="qualityOptions" />
          </s-form-item-plain>

          <s-form-item-plain name="site_clear" class="form-item" #default="{ shouldShowStar }">
            <div class="form-label">
              <span v-if="shouldShowStar" class="form-star">*</span>
              现场清理：油污、切屑、临时接线是否清除，检修牌是否摘除？
            </div>
            <RadioList v-model="formModel.site_clear" :options="qualityOptions" />
          </s-form-item-plain>

          <s-form-item-plain name="trial_run" class="form-item" #default="{ shouldShowStar }">
            <div class="form-label">
              <span v-if="shouldShowStar" class="form-star">*</span>
              试运行：空运行与首件检验是否合格？
            </div>
            <RadioList v-model="formModel.trial_run" :options="qualityOptions" />
          </s-form-item-plain>
        </div>
      </div>

      <div class="section">
        <div class="section-title">
          <span class="section-index">3</span>
          <span>验收结论</span>
        </div>
        <div class="section-content">
          <s-form-item-plain name="accept_result" class="form-item" #default="{ shouldShowStar }">
            <div class="form-label">
              <span v-if="shouldShowStar" class="form-star">*</span>
              本次维保验收结论
            </div>
            <RadioList v-model="formModel.accept_result" :options="resultOptions" />
          </s-form-item-plain>

          <s-form-item-plain
            name="resume_production"
            class="form-item"
            #default="{ shouldShowStar }"
          >
            <div class="form-label">
              <span v-if="shouldShowStar" class="form-star">*</span>
              设备能否恢复生产
            </div>
            <RadioList v-model="formModel.resume_production" :options="resumeOptions" />
          </s-form-item-plain>
        </div>
      </div>

      <div class="section">
        <div class="section-title">
          <span class="section-index">4</span>
          <span>遗留问题与建议</span>
        </div>
        <div class="section-content">
          <s-form-item-plain name="issues" class="form-item">
            <div class="form-label">遗留问题（可选）</div>
            <div class="form-input">
              <s-input
                v-model="formModel.issues"
                type="textarea"
                placeholder="例 液压单元仍有轻微渗漏，已开单跟踪 WO-20241027-0091"
                clearable
                inlaid
                auto-height
                min-height="24px"
              />
            </div>
          </s-form-item-plain>

          <s-form-item-plain name="actions" class="form-item">
            <div class="form-label">跟踪措施（可选）</div>
            <div class="form-input">
              <s-input
                v-model="formModel.actions"
                type="textarea"
                placeholder="例 C 周保复查安全门开关行程，责任人 王海"
                clearable
                inlaid
                auto-height
                min-height="24px"
              />
            </div>
          </s-form-item-plain>

          <s-form-item-plain name="others" class="form-item">
            <div class="form-label">其他说明（可选）</div>
            <div class="form-input">
              <s-input
                v-model="formModel.others"
                type="textarea"
                placeholder="例 本次停机 46 min，影响产量 320 件"
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
        <s-button block @click="onSubmit">提交验收单</s-button>
      </div>
    </s-form-plain>
  </doc-page>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { toast, type FormExpose, type FieldValidateError, type FormRules } from 'sard'
import RadioList from './RadioList.vue'

const formModel = reactive({
  order_no: '',
  accept_date: '',
  inspector: '',
  fault_locate: '',
  parts_replace: '',
  interlock_restore: '',
  site_clear: '',
  trial_run: '',
  accept_result: '',
  resume_production: '',
  issues: '',
  actions: '',
  others: '',
})

const formRules: FormRules = {
  order_no: {
    required: true,
    message: '请输入维修工单号',
  },
  accept_date: {
    required: true,
    message: '请选择验收日期',
  },
  inspector: {
    required: true,
    message: '请输入验收人工号',
  },
  fault_locate: {
    required: true,
    message: '请判定故障定位',
  },
  parts_replace: {
    required: true,
    message: '请判定备件更换',
  },
  interlock_restore: {
    required: true,
    message: '请判定联锁恢复',
  },
  site_clear: {
    required: true,
    message: '请判定现场清理',
  },
  trial_run: {
    required: true,
    message: '请判定试运行结果',
  },
  accept_result: {
    required: true,
    message: '请选择验收结论',
  },
  resume_production: {
    required: true,
    message: '请选择设备能否恢复生产',
  },
}

const formRef = ref<FormExpose>()

const onSubmit = () => {
  formRef.value
    ?.validate()
    .then(() => {
      toast('验收单已提交，设备状态同步至 MES')
    })
    .catch((error: FieldValidateError[]) => {
      toast(error[0].message)
      console.log('校验未通过', error)
    })
}

const qualityOptions = [
  { value: 'good', label: '优' },
  { value: 'normal', label: '良' },
  { value: 'pass', label: '合格' },
  { value: 'fail', label: '不合格' },
]

const resultOptions = [
  { value: 'accepted', label: '通过' },
  { value: 'conditional', label: '有条件通过' },
  { value: 'rejected', label: '不通过' },
]

const resumeOptions = [
  { value: 'yes', label: '可立即复产' },
  { value: 'watch', label: '观察一班次后复产' },
  { value: 'no', label: '不可复产' },
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
