<template>
  <!-- 工业语境：结果页附带后续动作 —— 下发成功后可直接查看工单或被授权人改期 -->
  <s-result
    status="success"
    title="点检记录已上传"
    description="CNC-Lathe-01 班前点检 12 项全部合格，记录已归档"
    aria-label="点检上传成功"
  >
    <s-flex gap="medium">
      <s-button variant="outlined" aria-label="查看点检记录">查看记录</s-button>
      <s-button aria-label="返回设备列表">返回设备</s-button>
    </s-flex>
  </s-result>
</template>
