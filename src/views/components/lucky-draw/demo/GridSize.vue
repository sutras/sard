<template>
  <div class="grid-box">
    <div v-for="item in grids" :key="item" class="grid-item" :style="{ width: 100 / column + '%' }">
      <div
        class="grid-item-inner"
        :style="{
          width: item === -1 ? centerSize.column * 100 + '%' : '',
          height: item === -1 ? centerSize.row * 100 + '%' : '',
        }"
      >
        <div v-if="item > -1" :class="['prize-item', { active: item === activeIndex }]">
          <div class="prize-icon">
            <span :class="['cake', `cake-${prizes[item]?.icon}`]"></span>
          </div>
          <div class="prize-name">{{ prizes[item]?.name }}</div>
        </div>
        <div v-else-if="item === -1" class="play-btn" @click="onPlay()">点我抽奖</div>
      </div>
    </div>
  </div>

  <s-dialog v-model:visible="dialogVisible" :show-cancel="false" confirm-text="收下">
    <div v-if="winningPrize" class="dialog-prize">
      <div class="dialog-prize-icon">
        <span :class="['cake', `cake-${winningPrize.icon}`]"></span>
      </div>
      <div class="dialog-prize-title">
        <span>恭喜你抽中</span>
        <span class="dialog-prize-name">“{{ winningPrize.name }}”</span>
      </div>
    </div>
  </s-dialog>
</template>

<script setup lang="ts">
import { useLuckyGrid, getGridPrizeCount } from 'sard'
import { computed, ref } from 'vue'
import { getPrizeApi, getPrizes, type Prize } from './utils'

const row = ref(4)
const column = ref(5)
const prizes = computed(() => {
  return getPrizes().slice(0, getGridPrizeCount(row.value, column.value))
})
const winningPrize = ref<Prize>()
const dialogVisible = ref(false)

const { grids, activeIndex, centerSize, play, stop, pause } = useLuckyGrid({
  row,
  column,
  complete: (index) => {
    winningPrize.value = prizes.value[index]
    dialogVisible.value = true
  },
})

const onPlay = () => {
  play()
  getPrizeApi(getGridPrizeCount(row.value, column.value))
    .then((prize) => {
      stop(prizes.value.findIndex((item) => item.id === prize.id))
    })
    .catch(() => pause())
}
</script>

<style lang="scss" scoped>
.grid-box {
  display: flex;
  flex-wrap: wrap;
  width: 330px;
  height: 300px;
  margin: 0 auto;
  padding: 5px;
  border: 5px solid #ffddcf;
  border-radius: 16px;
  background-color: #fffbef;
}
.grid-item {
  position: relative;
  width: 33.3333%;
}
.grid-item-inner {
  width: 100%;
  height: 100%;
  padding: 5px;
}
.prize-item {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  border-radius: 12px;
  background-color: #fff0cb;
  border: 1px solid rgba(0, 0, 0, 0.02);
  box-shadow: inset 0 -3px 0 rgba(0, 0, 0, 0.1);

  &.active {
    background-color: #ffd166;
  }
}
.prize-icon {
  font-size: 24px;
  line-height: 1;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
}
.prize-name {
  margin-top: 6px;
  font-weight: 500;
  font-size: 11px;
  color: #eb7e50;
  line-height: 16px;
}
.play-btn {
  position: relative;
  z-index: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  border-radius: 12px;
  font-weight: 500;
  color: #fff;
  background-color: #f02020;
  box-shadow: inset 0 -3px 0 rgba(0, 0, 0, 0.2);
  cursor: pointer;
}

.dialog-prize {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin: 30px 0;
}
.dialog-prize-icon {
  font-size: 80px;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}
.dialog-prize-title {
  margin-top: 16px;
  font-size: 16px;
  line-height: 16px;
}
.dialog-prize-name {
  color: #eb7e50;
  font-weight: 600;
}
</style>
