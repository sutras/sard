<template>
  <div class="disc">
    <div
      class="sectors"
      :style="{
        backgroundImage: repeatingConicGradient,
        transform: `rotate(${degrees}deg)`,
      }"
    >
      <div
        v-for="(prize, index) in prizes"
        :key="prize.id"
        class="sector"
        :class="{ 'sector-event': index % 2 === 0 }"
        :style="{
          transform: `rotate(${-index * sectorDegrees}deg)`,
        }"
      >
        <div class="sector-half">
          <div class="prize-icon">
            <span :class="['cake', `cake-${prize.icon}`]"></span>
          </div>
          <div class="prize-name">{{ prize.name }}</div>
        </div>
      </div>
    </div>
    <div class="play-btn" @click="onPlay">
      <span>点我抽奖</span>
      <div class="play-btn-arrow"></div>
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
import { useLuckyWheel } from 'sard'
import { computed, onMounted, ref } from 'vue'
import { getPrizesApi, getPrizeApi, type Prize } from './utils'

const prizes = ref<Prize[]>([])
const winningPrize = ref<Prize>()
const dialogVisible = ref(false)

const { degrees, sectorDegrees, play, stop, pause } = useLuckyWheel({
  count: computed(() => prizes.value.length),
  complete: (index) => {
    winningPrize.value = prizes.value[index]
    dialogVisible.value = true
  },
})

const repeatingConicGradient = computed(() => {
  const angle = sectorDegrees.value
  return (
    `repeating-conic-gradient(` +
    `var(--sector-bg) ${-angle / 2}deg, var(--sector-bg) ${angle / 2}deg,` +
    `transparent ${angle / 2 + 0.5}deg, transparent ${angle / 2 + angle}deg,` +
    `var(--sector-bg) ${angle / 2 + angle + 0.5}deg)`
  )
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
.disc {
  position: relative;
  width: 330px;
  height: 330px;
  margin: 0 auto;
  border: 5px solid #ffddcf;
  border-radius: 50%;
  overflow: hidden;
  --sector-bg: #fff0cb;
}
.sectors {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background-color: #fffbef;
}
.sector {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
.sector-half {
  width: 100%;
  height: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.prize-icon {
  margin-top: 10px;
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
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  justify-content: center;
  align-items: center;
  width: 80px;
  height: 80px;
  border: 4px solid #fff;
  border-radius: 50%;
  font-weight: 500;
  color: #fff;
  background-color: #f02020;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  cursor: pointer;
}
.play-btn-arrow {
  position: absolute;
  top: 0;
  left: 50%;
  transform: translate(-50%, -50%) scaleX(0.4);

  &::before {
    content: '';
    display: flex;
    width: 30px;
    height: 30px;
    background-color: #f02020;
    transform: rotate(45deg);
  }
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
