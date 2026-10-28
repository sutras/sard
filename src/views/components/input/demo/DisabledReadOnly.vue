<template>
  <!-- 演示参数锁定与联锁只读：审批中的参数禁用，联锁状态只读，二者都不允许现场随手改 -->
  <s-input
    model-value="96"
    disabled
    aria-label="模温设定值 96 摄氏度，审批中不可修改"
    data-lock-reason="pending-approval"
  >
    <template #append>
      <span>°C（审批中）</span>
    </template>
  </s-input>
  <s-input
    model-value="已闭合 · 光栅自检通过"
    readonly
    aria-label="安全联锁状态，只读"
    data-field="interlock-state"
  />
</template>
