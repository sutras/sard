<template>
  <s-checkbox checked>
    <template #icon="{ checked }">
      <demo-icon :name="checked ? 'heart-fill' : 'heart'" />
    </template>
    复选框
  </s-checkbox>
</template>
