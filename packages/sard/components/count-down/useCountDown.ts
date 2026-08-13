import {
  computed,
  onBeforeUnmount,
  onMounted,
  ref,
  toValue,
  watch,
  type MaybeRefOrGetter,
} from 'vue'

export interface CountDownCurrentTime {
  milliseconds: number
  seconds: number
  minutes: number
  hours: number
  days: number
  total: number
}

export function getCurrentTime(remainTime: number): CountDownCurrentTime {
  return {
    milliseconds: remainTime % 1000,
    seconds: ~~(remainTime / 1000) % 60,
    minutes: ~~(remainTime / 1000 / 60) % 60,
    hours: ~~(remainTime / 1000 / 60 / 60) % 24,
    days: ~~(remainTime / 1000 / 60 / 60 / 24),
    total: remainTime,
  }
}

function padZero(n: number, length = 2) {
  return String(n).padStart(length, '0')
}

export function formatTime(format: string, currentTime: CountDownCurrentTime) {
  const { days } = currentTime
  let { hours, minutes, seconds, milliseconds } = currentTime

  if (format.includes('DD')) {
    format = format.replace('DD', padZero(days))
  } else {
    hours += days * 24
  }

  if (format.includes('HH')) {
    format = format.replace('HH', padZero(hours))
  } else {
    minutes += hours * 60
  }

  if (format.includes('mm')) {
    format = format.replace('mm', padZero(minutes))
  } else {
    seconds += minutes * 60
  }

  if (format.includes('s')) {
    if (format.includes('ss')) {
      format = format.replace('ss', padZero(seconds))
    } else if (format.includes('s')) {
      format = format.replace('s', String(seconds))
    }
  } else {
    milliseconds += seconds * 1000
  }

  if (format.includes('S')) {
    const ms = padZero(milliseconds, 3)

    if (format.includes('SSS')) {
      format = format.replace('SSS', ms)
    } else if (format.includes('SS')) {
      format = format.replace('SS', ms.slice(0, 2))
    } else {
      format = format.replace('S', ms.charAt(0))
    }
  }

  return format
}

export function useCountDown(
  options: {
    time?: MaybeRefOrGetter<number>
    autoStart?: boolean
    millisecond?: MaybeRefOrGetter<boolean>
    onFinish?: () => void
  } = {},
) {
  const { onFinish, autoStart } = options
  const time = computed(() => toValue(options.time) || 0)
  const millisecond = computed(() => toValue(options.millisecond))

  const remainTime = ref(time.value)
  let endTime = 0
  let timer: any = null
  let status: 'paused' | 'manual-paused' | 'running' = 'paused'

  const tick = () => {
    const now = Date.now()
    remainTime.value = Math.max(endTime - now, 0)

    if (remainTime.value === 0) {
      pause(false)
      onFinish?.()
      return
    }
    timer = setTimeout(() => {
      tick()
    }, 30)
  }

  const start = () => {
    if (status === 'running') {
      return
    }
    status = 'running'
    endTime = Date.now() + remainTime.value
    tick()
  }

  const pause = (manual = true) => {
    if (status !== 'running') {
      return
    }
    clearTimeout(timer)
    timer = null
    status = manual ? 'manual-paused' : 'paused'
  }

  const reset = () => {
    pause(true)
    remainTime.value = time.value
    if (autoStart) {
      start()
    }
  }

  const precisionTime = computed(() => {
    if (millisecond.value) {
      return remainTime.value
    }
    return Math.floor(remainTime.value / 1000) * 1000
  })

  const currentTime = computed(() => {
    return getCurrentTime(precisionTime.value)
  })

  onMounted(() => {
    if (autoStart) {
      start()
    }
  })

  onBeforeUnmount(() => {
    pause(false)
  })

  watch(time, (newTime) => {
    remainTime.value = newTime
    if (status === 'running') {
      pause(false)
      start()
    } else if (status === 'paused') {
      start()
    }
  })

  return {
    currentTime,
    start,
    pause,
    reset,
  }
}
