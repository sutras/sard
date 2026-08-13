<template>
  <doc-page title="PasswordInput 密码输入框">
    <doc-demo title="基础使用">
      <Basic />
    </doc-demo>

    <doc-demo title="下划线类型">
      <Underline />
    </doc-demo>

    <doc-demo title="间距">
      <Gap />
    </doc-demo>

    <doc-demo title="明文显示">
      <PlainText />
    </doc-demo>

    <doc-demo title="只读和禁用">
      <DisabledReadOnly />
    </doc-demo>

    <doc-demo title="使用自定义键盘">
      <CustomKeyboard />
    </doc-demo>
  </doc-page>
</template>

<script setup lang="ts">
import Basic from './demo/Basic.vue'
import Underline from './demo/Underline.vue'
import Gap from './demo/Gap.vue'
import PlainText from './demo/PlainText.vue'
import DisabledReadOnly from './demo/DisabledReadOnly.vue'
import CustomKeyboard from './demo/CustomKeyboard.vue'
</script>
