<template>
  <div class="grid-box">
    <div v-for="item in grids" :key="item" class="grid-item">
      <div v-if="item > -1" :class="['prize-item', { active: item === activeIndex }]">
        <div class="prize-icon">
          <span :class="['cake', `cake-${prizes[item]?.icon}`]"></span>
        </div>
        <div class="prize-name">{{ prizes[item]?.name }}</div>
      </div>
      <div v-else class="play-btn" @click="onPlay()">点我抽奖</div>
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
import { useLuckyGrid } from 'sard'
import { onMounted, ref } from 'vue'
import { getPrizesApi, getPrizeApi, type Prize } from './utils'

const prizes = ref<Prize[]>([])
const winningPrize = ref<Prize>()
const dialogVisible = ref(false)

const { grids, activeIndex, play, stop, pause } = useLuckyGrid({
  complete: (index) => {
    winningPrize.value = prizes.value[index]
    dialogVisible.value = true
  },
})

const onPlay = () => {
  play()
  getPrizeApi(8)
    .then((prize) => {
      stop(prizes.value.findIndex((item) => item.id === prize.id))
    })
    .catch(() => pause())
}

onMounted(() => {
  getPrizesApi(8).then((res) => {
    prizes.value = res
  })
})
</script>

<style lang="scss" scoped>
.grid-box {
  display: flex;
  flex-wrap: wrap;
  width: 330px;
  height: 330px;
  margin: 0 auto;
  padding: 5px;
  border: 5px solid #ffddcf;
  border-radius: 16px;
  background-color: #fffbef;
}
.grid-item {
  width: 33.3333%;
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
  font-size: 36px;
  line-height: 1;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
}
.prize-name {
  margin-top: 10px;
  font-weight: 500;
  font-size: 11px;
  color: #eb7e50;
  line-height: 16px;
}
.play-btn {
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
