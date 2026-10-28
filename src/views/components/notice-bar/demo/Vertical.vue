<template>
  <!-- 工业语境：车间公告与安灯提示｜Vertical 用法演示 -->
  <s-notice-bar vertical>
    <s-swiper vertical :interval="1500" loop style="height: 40px">
      <s-swiper-item>
        <div class="swipe-item">
          1. 安灯呼叫：注塑二线 ST-11 物料短缺，配送班组请 5 min 内到场。
        </div>
      </s-swiper-item>
      <s-swiper-item>
        <div class="swipe-item">
          2. 安灯呼叫：注塑二线 ST-11 物料短缺，配送班组请 5 min 内到场。
        </div>
      </s-swiper-item>
      <s-swiper-item>
        <div class="swipe-item">
          3. 安灯呼叫：注塑二线 ST-11 物料短缺，配送班组请 5 min 内到场。
        </div>
      </s-swiper-item>
    </s-swiper>
  </s-notice-bar>
</template>

<style lang="scss">
.swipe-item {
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
}
</style>
