<template>
  <doc-page gray title="CountDown 倒计时">
    <doc-demo title="基础使用">
      <Basic />
    </doc-demo>

    <doc-demo title="自定义格式">
      <Format />
    </doc-demo>

    <doc-demo title="毫秒级别的渲染">
      <Millisecond />
    </doc-demo>

    <doc-demo title="自定义样式">
      <Style />
    </doc-demo>

    <doc-demo title="手动控制">
      <Control />
    </doc-demo>

    <doc-demo title="验证码倒计时">
      <Captcha />
    </doc-demo>

    <doc-demo title="更新倒计时">
      <Update />
    </doc-demo>
  </doc-page>
</template>

<script setup lang="ts">
import Basic from './demo/Basic.vue'
import Format from './demo/Format.vue'
import Millisecond from './demo/Millisecond.vue'
import Style from './demo/Style.vue'
import Control from './demo/Control.vue'
import Captcha from './demo/Captcha.vue'
import Update from './demo/Update.vue'
</script>
