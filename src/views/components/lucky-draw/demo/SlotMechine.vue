<template>
  <div class="reels">
    <div v-for="(translateY, index) in offset" :key="index" class="reel-box">
      <div class="reel" :style="{ transform: `translateY(${translateY}%)` }">
        <div v-for="(prize, index) in renderedPrizes" :key="index" class="prize-item">
          <div class="prize-icon">
            <span :class="['cake', `cake-${prize.icon}`]"></span>
          </div>
          <div class="prize-name">{{ prize.name }}</div>
        </div>
      </div>
    </div>
  </div>
  <div class="play-btn" @click="onPlay()">点我抽奖</div>

  <s-dialog v-model:visible="dialogVisible" :show-cancel="false" confirm-text="收下">
    <div v-if="winningPrize.length > 0" class="dialog-prize">
      <div class="dialog-prize-icon">
        <span
          v-for="(prize, index) in winningPrize"
          :key="index"
          :class="['cake', `cake-${prize.icon}`]"
        ></span>
      </div>
      <div class="dialog-prize-title">
        <span>恭喜你抽中</span>
        <span class="dialog-prize-name">
          “{{ winningPrize.map((prize) => prize.name).join('、') }}”
        </span>
      </div>
    </div>
  </s-dialog>
</template>

<script setup lang="ts">
import { useSlotMachine } from 'sard'
import { computed, onMounted, ref } from 'vue'
import { getPrizesApi, getMultiPrizeApi, type Prize } from './utils'

const prizes = ref<Prize[]>([])
const renderedPrizes = computed(() => {
  return prizes.value.length === 0 ? [] : [...prizes.value, prizes.value[0]]
})
const winningPrize = ref<Prize[]>([])
const dialogVisible = ref(false)
const columns = ref<number[]>([])

const { play, stop, pause, offset } = useSlotMachine({
  columns,
  complete: (indexes) => {
    winningPrize.value = indexes.map((index) => prizes.value[index])
    dialogVisible.value = true
  },
})

const onPlay = () => {
  play()
  getMultiPrizeApi([8, 8, 8])
    .then((multiPrizes) => {
      stop(multiPrizes.map((prize) => prizes.value.findIndex((item) => item.id === prize.id)))
    })
    .catch(() => pause())
}

onMounted(() => {
  getPrizesApi(8).then((res) => {
    columns.value = [8, 8, 8]
    prizes.value = res
  })
})
</script>

<style scoped lang="scss">
.reels {
  display: flex;
  height: 120px;
  gap: 10px;
  padding: 0 10px;
  border: 5px solid #ffddcf;
  border-radius: 16px;
  background-color: #fffbef;
}

.reel-box {
  flex: 1;
  height: 100%;
  overflow: hidden;
  background-color: #fff0cb;
}
.reel {
  display: flex;
  flex-direction: column-reverse;
  height: 100%;
}

.prize-item {
  flex: none;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
}
.prize-icon {
  font-size: 36px;
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
  height: 50px;
  margin-top: 10px;
  border-radius: 12px;
  font-weight: 500;
  color: #fff;
  background-color: #f02020;
  box-shadow: inset 0 -4px 0 rgba(0, 0, 0, 0.2);
  cursor: pointer;
}

.dialog-prize {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin: 30px 16px;
}
.dialog-prize-icon {
  display: flex;
  gap: 16px;
  font-size: 48px;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}
.dialog-prize-title {
  margin-top: 16px;
  font-size: 16px;
  text-align: center;
}
.dialog-prize-name {
  color: #eb7e50;
  font-weight: 600;
}
</style>
