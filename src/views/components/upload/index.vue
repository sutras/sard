<template>
  <doc-page gray title="Upload 上传">
    <doc-demo title="基础使用">
      <Basic />
    </doc-demo>

    <doc-demo title="上传视频">
      <Video />
    </doc-demo>

    <doc-demo title="同时上传图片和视频">
      <Mix />
    </doc-demo>

    <doc-demo title="限定上传数量">
      <MaxCount />
    </doc-demo>

    <doc-demo title="多选">
      <Multiple />
    </doc-demo>

    <doc-demo title="选择文件前置处理">
      <BeforeChoose />
    </doc-demo>

    <doc-demo title="上传前置处理">
      <BeforeRead />
    </doc-demo>

    <doc-demo title="限定上传大小">
      <Size />
    </doc-demo>

    <doc-demo title="上传状态">
      <Status />
    </doc-demo>

    <doc-demo title="重传与取消">
      <ReuploadCancel />
    </doc-demo>

    <doc-demo title="只读和禁用">
      <DisabledReadOnly />
    </doc-demo>

    <doc-demo title="自定义选区样式">
      <CustomSelect />
    </doc-demo>

    <doc-demo title="自定义渲染">
      <Custom />
    </doc-demo>
  </doc-page>
</template>

<script setup lang="ts">
import Basic from './demo/Basic.vue'
import Video from './demo/Video.vue'
import Mix from './demo/Mix.vue'
import MaxCount from './demo/MaxCount.vue'
import Multiple from './demo/Multiple.vue'
import BeforeChoose from './demo/BeforeChoose.vue'
import BeforeRead from './demo/BeforeRead.vue'
import Size from './demo/Size.vue'
import Status from './demo/Status.vue'
import ReuploadCancel from './demo/ReuploadCancel.vue'
import DisabledReadOnly from './demo/DisabledReadOnly.vue'
import CustomSelect from './demo/CustomSelect.vue'
import Custom from './demo/Custom.vue'
</script>

<style lang="scss" scoped>
:deep() {
  .s-upload {
    margin-bottom: 10px;
  }
}
</style>
