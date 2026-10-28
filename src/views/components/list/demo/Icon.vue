<template>
  <!-- 演示带图标的模块入口：图标统一收进 32×32 圆角色块，仅报警中心用危险色，其余用主色，避免图标字重差异显得杂乱 -->
  <s-list aria-label="业务模块入口">
    <s-list-item title="备件出入库" description="立库 A 区 · 3 条待办" hover arrow #icon>
      <span class="module-icon"><demo-icon name="upload" /></span>
    </s-list-item>
    <s-list-item title="报警中心" description="3 条未确认 · 最近 09:41" hover arrow #icon>
      <span class="module-icon module-icon--danger"><demo-icon name="bell" /></span>
    </s-list-item>
    <s-list-item title="班前点检" description="今日 12 项待检" hover arrow #icon>
      <span class="module-icon"><demo-icon name="work-order" /></span>
    </s-list-item>
    <s-list-item title="扫描设备铭牌" description="扫码查询设备档案" hover arrow #icon>
      <span class="module-icon"><demo-icon name="scan" /></span>
    </s-list-item>
    <s-list-item title="网关通讯诊断" description="6 台采集网关在线" hover arrow #icon>
      <span class="module-icon"><demo-icon name="wifi" /></span>
    </s-list-item>
  </s-list>
</template>

<style lang="scss" scoped>
.module-icon {
  --module-icon-color: var(--s-color-primary);

  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 9px;
  font-size: 17px;
  color: var(--module-icon-color);
  background: color-mix(in srgb, var(--module-icon-color) 14%, transparent);
}

.module-icon--danger {
  --module-icon-color: var(--s-color-danger);
}
</style>
