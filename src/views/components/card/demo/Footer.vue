<template>
  <s-card title="注塑机-A2" data-device-code="EQ-2023-204">
    <template #extra>
      <s-tag color="danger" variant="filled" size="small" round data-status="ALARM">报警</s-tag>
    </template>
    <p>模具区安全门联锁断开，液压单元已紧急泄压，等待设备主管复位。</p>
    <p>报警代码 E-1042 · 首次触发 09:41:22 · 已持续 12 min</p>
    <p>处置要求：复位前须完成光栅自检并记录联锁旁路编号。</p>
    <template #footer>
      <div class="flex items-center justify-around">
        <s-button type="text" auto-height #icon>
          <demo-icon name="work-order" />
        </s-button>
        <s-divider vertical />
        <s-button type="text" auto-height #icon>
          <demo-icon name="bell" />
        </s-button>
        <s-divider vertical />
        <s-button type="text" auto-height #icon>
          <demo-icon name="warehouse" />
        </s-button>
      </div>
    </template>
  </s-card>
</template>
