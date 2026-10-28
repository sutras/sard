<template>
  <!-- 工业语境：点检照片与报告上传｜CustomSelect 用法演示 -->
  <s-upload>
    <template #select>
      <div style="display: flex; flex-direction: column; align-items: center">
        <demo-icon size="20px" name="camera" />
        <div style="font-size: 12px; margin-top: 4px">上传图片</div>
      </div>
    </template>
  </s-upload>
</template>
