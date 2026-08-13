<template>
  <doc-page gray title="自定义校验规则">
    <s-form ref="ruleFormRef" :model="ruleForm" :rules="rules">
      <s-form-item label="Password" name="pass">
        <s-input v-model="ruleForm.pass" type="password" />
      </s-form-item>
      <s-form-item label="Confirm" name="checkPass">
        <s-input v-model="ruleForm.checkPass" type="password" />
      </s-form-item>
      <s-form-item label="Age" name="age">
        <template #validate="{ state }">
          <s-input v-model="ruleForm.age">
            <template #append>
              <s-loading v-if="state === 'validating'" color="var(--s-text-color-tertiary)" />
            </template>
          </s-input>
        </template>
      </s-form-item>
      <s-form-item>
        <s-button @click="submitForm(ruleFormRef)">Submit</s-button>
        <s-button variant="outlined" style="margin-top: 10px" @click="resetForm(ruleFormRef)">
          Reset
        </s-button>
      </s-form-item>
    </s-form>
  </doc-page>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { toast, type FormRules, type FormExpose } from 'sard'

const ruleFormRef = ref<FormExpose>()

const checkAge = (value: any) => {
  return new Promise<void>((resolve, reject) => {
    if (!value) {
      return reject('Please input the age')
    }
    setTimeout(() => {
      if (!Number.isInteger(Number(value))) {
        reject('Please input digits')
      } else {
        if (value < 18) {
          reject('Age must be greater than 18')
        } else {
          resolve()
        }
      }
    }, 1000)
  })
}

const validatePass = (value: any) => {
  if (value === '') {
    return 'Please input the password'
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
const validatePass2 = (value: any) => {
  if (value === '') {
    return 'Please input the password again'
  } else if (value !== ruleForm.pass) {
    return "Two inputs don't match!"
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
      toast('Success!')
      console.log('Success!')
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
