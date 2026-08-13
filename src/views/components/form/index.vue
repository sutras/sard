<template>
  <doc-page gray title="Form 表单">
    <doc-demo>
      <s-list card>
        <s-list-item title="典型表单" arrow hover @click="navigateTo('Typical')" />
        <s-list-item title="方向与对齐" arrow hover @click="navigateTo('DirectionAlign')" />
        <s-list-item title="表单校验" arrow hover @click="navigateTo('Validate')" />
        <s-list-item title="弹出框中的表单" arrow hover @click="navigateTo('Popup')" />
        <s-list-item title="自定义校验规则" arrow hover @click="navigateTo('CustomValidate')" />
        <s-list-item title="添加/删除表单项" arrow hover @click="navigateTo('DynamicFormItem')" />
        <s-list-item title="简单登录框" arrow hover @click="navigateTo('BasicLogin')" />
        <s-list-item title="Label 宽度" arrow hover @click="navigateTo('LabelWidth')" />
        <s-list-item title="表单只读和禁用" arrow hover @click="navigateTo('DisabledReadOnly')" />
        <s-list-item title="登录框" arrow hover @click="navigateTo('Login')" />
        <s-list-item title="嵌套结构与校验信息" arrow hover @click="navigateTo('Nested')" />
        <s-list-item title="自定义表单控件" arrow hover @click="navigateTo('CustomControl')" />
        <s-list-item
          title="复杂的动态增减表单项"
          arrow
          hover
          @click="navigateTo('ComplexDynamicFormItem')"
        />
        <s-list-item title="动态增减嵌套字段" arrow hover @click="navigateTo('DynamicNested')" />
        <s-list-item title="动态校验规则" arrow hover @click="navigateTo('DynamicValidate')" />
        <s-list-item title="多表单联动" arrow hover @click="navigateTo('MultiFormLinkage')" />
        <s-list-item title="弹出层中的新建表单" arrow hover @click="navigateTo('DialogForm')" />
        <s-list-item
          title="滚动到第一个错误字段"
          arrow
          hover
          @click="navigateTo('ScrollToFirstError')"
        />
        <s-list-item
          title="toast显示验证错误信息"
          arrow
          hover
          @click="navigateTo('ToastValidateError')"
        />
        <s-list-item title="手机号登录" arrow hover @click="navigateTo('MobileLogin')" />
        <s-list-item title="修改密码" arrow hover @click="navigateTo('ChangePassword')" />
        <s-list-item title="忘记密码" arrow hover @click="navigateTo('ForgetPassword')" />
        <s-list-item title="自定义表单样式和结构" arrow hover @click="navigateTo('Plain')" />
      </s-list>
    </doc-demo>
  </doc-page>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

const navigateTo = (url: string) => {
  router.push(`/components/form/demo/${url}`)
}
</script>
