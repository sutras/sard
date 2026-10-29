<template>
  <doc-page gray title="自定义校验规则">
    <s-form ref="ruleFormRef" :model="ruleForm" :rules="rules">
      <s-form-item label="班组长授权码" name="pass">
        <s-input v-model="ruleForm.pass" type="password" />
      </s-form-item>
      <s-form-item label="确认授权码" name="checkPass">
        <s-input v-model="ruleForm.checkPass" type="password" />
      </s-form-item>
      <s-form-item label="操作工年龄" name="age">
        <template #validate="{ state }">
          <s-input v-model="ruleForm.age">
            <template #append>
              <s-loading v-if="state === 'validating'" color="var(--s-text-color-tertiary)" />
            </template>
          </s-input>
        </template>
      </s-form-item>
      <s-form-item>
        <s-button @click="submitForm(ruleFormRef)">提交</s-button>
        <s-button variant="outlined" style="margin-top: 10px" @click="resetForm(ruleFormRef)">
          重置
        </s-button>
      </s-form-item>
    </s-form>
  </doc-page>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { toast, type FormRules, type FormExpose } from 'sard'

const ruleFormRef = ref<FormExpose>()

const checkAge = ({ value }: { value: any }) => {
  return new Promise<void>((resolve, reject) => {
    if (!value) {
      return reject('请输入操作工年龄')
    }
    setTimeout(() => {
      if (!Number.isInteger(Number(value))) {
        reject('年龄需为整数')
      } else {
        if (value < 18) {
          reject('未满 18 周岁不得上岗')
        } else {
          resolve()
        }
      }
    }, 1000)
  })
}

const validatePass = ({ value }: { value: any }) => {
  if (value === '') {
    return '请输入班组长授权码'
  } else {
    if (ruleForm.checkPass !== '') {
      if (!ruleFormRef.value) {
        return true
      }
      ruleFormRef.value.validate(['checkPass']).catch(() => void 0)
    }
    return true
  }
}
const validatePass2 = ({ value }: { value: any }) => {
  if (value === '') {
    return '请再次输入授权码'
  } else if (value !== ruleForm.pass) {
    return '两次输入的授权码不一致'
  } else {
    return true
  }
}

const ruleForm = reactive({
  pass: '',
  checkPass: '',
  age: '',
})

const rules = reactive<FormRules>({
  pass: [{ validator: validatePass, trigger: 'blur' }],
  checkPass: [{ validator: validatePass2, trigger: 'blur' }],
  age: [{ validator: checkAge, trigger: 'blur' }],
})

const submitForm = (formEl?: FormExpose) => {
  if (!formEl) return
  formEl
    .validate()
    .then(() => {
      toast('授权码已更新')
      console.log('授权码已更新')
    })
    .catch(() => {
      console.log('error submit!')
    })
}

const resetForm = (formEl: any) => {
  if (!formEl) return
  formEl.reset()
}
</script>
