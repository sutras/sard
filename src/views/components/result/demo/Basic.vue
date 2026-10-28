<template>
  <!-- 工业语境：五类处置结果 —— 成功=已下发，信息=等授权，预警=接近阈值，异常=联锁失败，疑问=需人工确认 -->
  <s-result
    status="success"
    title="工单已下发"
    description="WO-20241027-0083 已下发至 注塑二线 / ST-11，等待班组长授权后启动"
    aria-label="工单下发成功"
  />
  <s-result
    status="info"
    title="等待班组长授权"
    description="授权有效期至本班次结束（16:00），超时需重新提交"
    aria-label="等待授权"
  />
  <s-result
    status="warning"
    title="接近预警阈值"
    description="主轴温度 62.4 °C，阈值 65 °C（量程 -20 ~ 120 °C）"
    aria-label="参数接近阈值"
  />
  <s-result
    status="error"
    title="联锁验证失败"
    description="光栅自检未通过（E-1042），设备已保持停机，禁止下发启动指令"
    aria-label="联锁验证失败"
    data-blocking="true"
  />
  <s-result
    status="question"
    title="需人工确认"
    description="检测到 3 件尺寸超差，是否转返修工位？确认后记入质量台账"
    aria-label="需人工确认"
  />
</template>
