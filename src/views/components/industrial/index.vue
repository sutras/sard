<template>
  <!-- 工业场景总览：四个场景各演示一组组件协同，覆盖监控、防错、告警处置、实体建模 -->
  <doc-page gray title="工业场景示例">
    <doc-demo title="场景一 · 车间设备监控">
      <ShopfloorMonitor />
    </doc-demo>

    <doc-demo title="场景二 · 工艺参数录入与防错">
      <ProcessParameter />
    </doc-demo>

    <doc-demo title="场景三 · 报警处置">
      <AlarmHandling />
    </doc-demo>

    <doc-demo title="场景四 · 设备实体建模">
      <EntitySemantics />
    </doc-demo>
  </doc-page>
</template>

<script setup lang="ts">
import ShopfloorMonitor from './scene/ShopfloorMonitor.vue'
import ProcessParameter from './scene/ProcessParameter.vue'
import AlarmHandling from './scene/AlarmHandling.vue'
import EntitySemantics from './scene/EntitySemantics.vue'
</script>
