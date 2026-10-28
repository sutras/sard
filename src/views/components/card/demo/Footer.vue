<template>
  <!-- 演示设备卡底部操作区：点检 / 报警 / 备件三个现场动作，均需在班组长看板内留痕 -->
  <s-card title="注塑机-A2" aria-label="设备卡 注塑机-A2" data-device-code="EQ-2023-204">
    <template #extra>
      <s-tag color="danger" variant="filled" size="small" round data-status="ALARM">报警</s-tag>
    </template>
    <p>模具区安全门联锁断开，液压单元已紧急泄压，等待设备主管复位。</p>
    <p>报警代码 E-1042 · 首次触发 09:41:22 · 已持续 12 min</p>
    <p>处置要求：复位前须完成光栅自检并记录联锁旁路编号。</p>
    <template #footer>
      <div class="flex items-center justify-around">
        <s-button variant="link" color="secondary" auto-height aria-label="上报点检结果" #icon>
          <demo-icon name="work-order" />
        </s-button>
        <s-divider vertical />
        <s-button variant="link" color="secondary" auto-height aria-label="通知报警中心" #icon>
          <demo-icon name="bell" />
        </s-button>
        <s-divider vertical />
        <s-button variant="link" color="secondary" auto-height aria-label="申领备件" #icon>
          <demo-icon name="warehouse" />
        </s-button>
      </div>
    </template>
  </s-card>
</template>
