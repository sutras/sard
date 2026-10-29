<template>
  <s-tabbar v-model="value">
    <s-tabbar-item :value="0" label="设备" #icon="{ active }">
      <span class="nav-icon" :class="{ 'nav-icon--active': active }">
        <demo-icon name="cnc" />
      </span>
    </s-tabbar-item>
    <s-tabbar-item :value="1" label="工单" #icon="{ active }">
      <span class="nav-icon" :class="{ 'nav-icon--active': active }">
        <demo-icon name="work-order" />
      </span>
    </s-tabbar-item>
    <s-tabbar-item :value="2" label="报警" #icon="{ active }">
      <span class="nav-icon" :class="{ 'nav-icon--active': active }">
        <demo-icon name="alarm" />
      </span>
    </s-tabbar-item>
    <s-tabbar-item :value="3" label="我的" #icon="{ active }">
      <span class="nav-icon" :class="{ 'nav-icon--active': active }">
        <demo-icon name="user" />
      </span>
    </s-tabbar-item>
  </s-tabbar>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref(0)
</script>

<style lang="scss" scoped>
.nav-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  font-size: 18px;
  transition: background-color 0.2s;
}

.nav-icon--active {
  background-color: var(--s-color-primary);
  color: var(--s-white);
}
</style>
