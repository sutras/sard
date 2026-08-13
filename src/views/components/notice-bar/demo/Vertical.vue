<template>
  <s-notice-bar vertical>
    <s-swiper vertical :interval="1500" loop style="height: 40px">
      <s-swiper-item>
        <div class="swipe-item">1. 这是一条公告！</div>
      </s-swiper-item>
      <s-swiper-item>
        <div class="swipe-item">2. 这是一条公告！</div>
      </s-swiper-item>
      <s-swiper-item>
        <div class="swipe-item">3. 这是一条公告！</div>
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
