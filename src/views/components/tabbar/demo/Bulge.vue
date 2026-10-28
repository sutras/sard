<template>
  <!-- 工业语境：中间鼓起的「报修」入口，现场发现异常时一键发起临时工单，需班组长确认后生效 -->
  <s-tabbar v-model="value">
    <s-tabbar-item :value="0" label="设备" #icon>
      <demo-icon name="cnc" />
    </s-tabbar-item>
    <s-tabbar-item :value="1" label="工单" #icon>
      <demo-icon name="work-order" />
    </s-tabbar-item>
    <s-tabbar-item @click="toast('发起临时工单，需班组长确认后生效')">
      <div class="bulge">
        <div class="cover"></div>
        <div class="button">
          <Plus class="text-5xl" />
        </div>
      </div>
      <span class="text">报修</span>
    </s-tabbar-item>
    <s-tabbar-item :value="2" label="报警" #icon>
      <demo-icon name="alarm" />
    </s-tabbar-item>
    <s-tabbar-item :value="3" label="我的" #icon>
      <demo-icon name="user" />
    </s-tabbar-item>
  </s-tabbar>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { toast } from 'sard'
import { Plus } from '@sard/icons'

const value = ref(0)
</script>

<style lang="scss" scoped>
.bulge {
  position: absolute;
  top: 0;
  transform-origin: top center;
  transform: scale(0.5) translateY(-33%);
  display: flex;
  justify-content: center;
  align-items: center;
  width: 96px;
  height: 96px;
  border-radius: 50%;
  background-color: var(--s-tabbar-bg);
  box-shadow: inset 0 0 0 1px var(--s-border-color);

  &:active {
    opacity: 0.8;
  }
}

.cover {
  position: absolute;
  top: 33%;
  width: 100%;
  height: 70%;
  transform: translateY(1px);
  background-color: var(--s-tabbar-bg);
}

.button {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 76px;
  height: 76px;
  border-radius: 50%;
  background-color: var(--s-color-primary);
  color: var(--s-white);
}

.text {
  position: relative;
  margin-top: auto;
  margin-bottom: 5px;
}
</style>
