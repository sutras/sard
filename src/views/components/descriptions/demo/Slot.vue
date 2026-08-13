<template>
  <s-descriptions bordered label-width="6em">
    <s-descriptions-item>
      <template #label>
        <div class="flex items-center gap-2">
          <demo-icon name="person-circle" />
          <span>姓名</span>
        </div>
      </template>
      张三
    </s-descriptions-item>
    <s-descriptions-item label="手机号">
      <template #label>
        <div class="flex items-center gap-1">
          <demo-icon name="phone" />
          <span>姓名</span>
        </div>
      </template>
      <s-button variant="link" compact>138****8888</s-button>
    </s-descriptions-item>
  </s-descriptions>
</template>
