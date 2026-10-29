<template>
  <s-checkbox checked>
    <template #icon="{ checked }">
      <demo-icon :name="checked ? 'quality' : 'close'" />
    </template>
    点检项：导轨油位
  </s-checkbox>
</template>
