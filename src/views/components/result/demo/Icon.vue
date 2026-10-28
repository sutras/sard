<template>
  <!-- 工业语境：自定义图标结果页 —— 用设备停机图形替代通用对勾，语义更贴近现场 -->
  <s-result
    title="设备已停机"
    description="EQ-2023-076 压铸机-D03 已挂检修牌，在制件转返修工位"
    aria-label="设备已停机"
    #icon
  >
    <demo-icon name="pause-circle" size="48px" color="var(--s-color-danger)" />
  </s-result>
</template>
