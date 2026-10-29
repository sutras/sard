<template>
  <s-input model-value="96" disabled data-lock-reason="pending-approval">
    <template #append>
      <span>°C（审批中）</span>
    </template>
  </s-input>
  <s-input model-value="已闭合 · 光栅自检通过" readonly data-field="interlock-state" />
</template>
