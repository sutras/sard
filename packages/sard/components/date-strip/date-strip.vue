<template>
  <div ref="scroll" :class="bem.b()">
    <div :class="bem.e('content')">
      <div
        v-for="item in daysInfo"
        :key="item.key"
        ref="items"
        :data-key="item.key"
        :class="item.className"
        :style="item.style"
        @click="onDayClick(item.day)"
      >
        <div :class="bem.e('item-week')">
          {{ item.day.top }}
        </div>
        <div :class="bem.e('item-day')">
          {{ item.day.text }}
        </div>
        <div v-if="type === 'range' || item.day.bottom" :class="bem.e('item-info')">
          {{ item.day.bottom || '&nbsp;' }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, nextTick, shallowRef, toRaw, useTemplateRef, watch } from 'vue'
import {
  createBem,
  minmaxDate,
  toDateNumber,
  parseDate,
  formatDate,
  solarToLunar,
  getLunarDayName,
  getLunarMonthName,
  scrollToTarget,
} from '../../utils'
import { useTranslateWithPrefix } from '../../locale'
import {
  type DateStripProps,
  type DateStripEmits,
  defaultDateStripProps,
  getMaxDate,
  getMinDate,
  sortDates,
} from './common'
import { type CalendarDay } from '../calendar'

const props = withDefaults(defineProps<DateStripProps>(), defaultDateStripProps)

const emit = defineEmits<DateStripEmits>()

const bem = createBem('date-strip')

const { t, select } = useTranslateWithPrefix('calendar')

const getAnchorDate = () => {
  return props.currentDate || new Date()
}

const minDate = computed(() => {
  return props.min || getMinDate(getAnchorDate())
})

const maxDate = computed(() => {
  const maxDate = props.max || getMaxDate(getAnchorDate())

  return maxDate.getTime() < minDate.value.getTime() ? new Date(minDate.value) : maxDate
})

const toDate = (date: Date | string) => {
  if (date instanceof Date) {
    return date
  }
  return parseDate(date, props.valueFormat)
}

const makeDate = (date: Date | Date[] | string | string[]) => {
  return Array.isArray(date) ? date.map((item) => toDate(item)) : toDate(date)
}

const normalizeValue = (value: string | string[] | Date | Date[] | undefined) => {
  return value ? makeDate(value) : props.type === 'single' ? undefined : []
}

const innerValue = shallowRef<Date | Date[] | undefined>(normalizeValue(props.modelValue))

let currentEmitValue: string | string[] | Date | Date[] | undefined = innerValue.value

watch(
  () => toRaw(props.modelValue),
  (value) => {
    if (currentEmitValue !== value) {
      innerValue.value = normalizeValue(value)
      currentEmitValue = value
    }
  },
)

const innerCurrentDate = shallowRef(minmaxDate(getAnchorDate(), minDate.value, maxDate.value))

watch(
  () => props.currentDate,
  () => {
    innerCurrentDate.value = minmaxDate(getAnchorDate(), minDate.value, maxDate.value)
  },
)

watch([minDate, maxDate], () => {
  innerCurrentDate.value = minmaxDate(innerCurrentDate.value, minDate.value, maxDate.value)
})

watch(innerValue, () => {
  const onlyOneDate = Array.isArray(innerValue.value)
    ? innerValue.value.length === 1
      ? innerValue.value[0]
      : undefined
    : innerValue.value

  if (onlyOneDate) {
    innerCurrentDate.value = minmaxDate(onlyOneDate, minDate.value, maxDate.value)
  }
})

const startDate = shallowRef(
  props.type === 'range' && Array.isArray(innerValue.value) && innerValue.value.length === 1
    ? innerValue.value[0]
    : undefined,
)

const currentDates = computed(() => {
  if (props.type === 'range' && startDate.value) {
    return [startDate.value]
  }

  if (Array.isArray(innerValue.value)) {
    return innerValue.value
  }

  return innerValue.value ? [innerValue.value] : []
})

const getDefaultLunarLabel = (date: Date) => {
  const lunarDate = solarToLunar(date.getFullYear(), date.getMonth() + 1, date.getDate())

  return lunarDate.day === 1
    ? getLunarMonthName(Math.abs(lunarDate.month), lunarDate.month < 0)
    : getLunarDayName(lunarDate.day)
}

const daysInfo = computed(() => {
  const todayNumber = toDateNumber(new Date())
  const dates: Date[] = []
  const cursor = new Date(minDate.value)

  while (cursor.getTime() <= maxDate.value.getTime()) {
    dates.push(new Date(cursor))
    cursor.setDate(cursor.getDate() + 1)
  }

  return dates
    .filter((date) => {
      return props.filter ? props.filter(date) : true
    })
    .map((date) => {
      const dateNumber = toDateNumber(date)
      const selected =
        props.type !== 'range' &&
        currentDates.value.some((item) => toDateNumber(item) === dateNumber)

      const isStart =
        props.type === 'range' &&
        currentDates.value[0] &&
        toDateNumber(currentDates.value[0]) === dateNumber

      const isEnd =
        props.type === 'range' &&
        currentDates.value[1] &&
        toDateNumber(currentDates.value[1]) === dateNumber

      const isMiddle =
        props.type === 'range' &&
        currentDates.value.length === 2 &&
        dateNumber > toDateNumber(currentDates.value[0]) &&
        dateNumber < toDateNumber(currentDates.value[1])

      const d = date.getDay()
      const week = select(`abbrWeeks.${d}`) || select(`weeks.${d}`)

      const day: CalendarDay = {
        date,
        disabled: !!props.disabledDate?.(date),
        top: week,
        text: formatDate(date, 'MM-DD'),
        bottom:
          isStart && isEnd
            ? props.sameDateText || `${t('start')}/${t('end')}`
            : isStart
              ? props.startDateText || t('start')
              : isEnd
                ? props.endDateText || t('end')
                : props.showLunar
                  ? getDefaultLunarLabel(date)
                  : '',
        type:
          isStart && isEnd
            ? 'same'
            : isStart
              ? 'start'
              : isMiddle
                ? 'middle'
                : isEnd
                  ? 'end'
                  : selected
                    ? 'selected'
                    : 'normal',
        today: todayNumber === dateNumber,
      }

      props.formatter?.(day)

      return {
        key: dateNumber,
        day,
        style: day.style,
        className: [
          bem.e('item'),
          bem.em('item', day.type, day.type !== 'normal'),
          bem.em('item', 'disabled', day.disabled),
          bem.em('item', 'today', day.today),
          day.className,
        ],
      }
    })
})

const onDayClick = (day: CalendarDay) => {
  if (day.disabled) {
    return
  }

  let nextValue: Date | Date[] | undefined

  if (props.type === 'single') {
    nextValue = day.date
  } else if (props.type === 'multiple') {
    if (Array.isArray(innerValue.value)) {
      if (innerValue.value.some((item) => toDateNumber(item) === toDateNumber(day.date))) {
        nextValue = innerValue.value.filter((item) => toDateNumber(item) !== toDateNumber(day.date))
      } else {
        if (innerValue.value.length >= props.maxDays) {
          props.overMaxDays?.()
          return
        }
        nextValue = sortDates(innerValue.value.concat(day.date))
      }
    }
  } else if (props.type === 'range') {
    if (startDate.value) {
      const startDays = toDateNumber(startDate.value)
      const endDays = toDateNumber(day.date)

      if (!props.allowSameDay && startDays === endDays) {
        return
      }

      if (endDays < startDays) {
        startDate.value = day.date
        return
      }

      let endDate = day.date

      if (endDays - startDays + 1 > props.maxDays) {
        props.overMaxDays?.()
        endDate = new Date(startDate.value)
        endDate.setDate(endDate.getDate() + (props.maxDays - 1))
      }

      nextValue = [startDate.value, endDate]
    } else {
      nextValue = []
    }

    startDate.value = startDate.value ? undefined : day.date
  }

  if (nextValue !== undefined) {
    innerValue.value = nextValue

    const emitValue = props.valueFormat
      ? Array.isArray(nextValue)
        ? nextValue.map((item) => formatDate(item, props.valueFormat))
        : formatDate(nextValue, props.valueFormat)
      : nextValue

    currentEmitValue = emitValue

    emit('update:modelValue', emitValue)
    emit('change', emitValue)
  }
}

// ========================== 滚动居中 ==========================
const scrollRef = useTemplateRef('scroll')
const itemRefs = useTemplateRef('items')

const getCenterDate = () => {
  const dates = currentDates.value
  return dates[0] || innerCurrentDate.value
}

const scrollToCenterDate = (animated = true) => {
  const centerDate = getCenterDate()
  const dateNumber = toDateNumber(centerDate)

  const item = itemRefs.value?.find((item) => +item.dataset.key! === dateNumber)

  if (item) {
    scrollToTarget(scrollRef.value!, item, {
      animated,
      position: 'center',
    })
  }
}

let firstScrollCenter = true

watch(
  [daysInfo, currentDates, innerCurrentDate],
  () => {
    if (props.type === 'single' || firstScrollCenter) {
      nextTick(() => {
        scrollToCenterDate(!firstScrollCenter)
        firstScrollCenter = false
      })
    }
  },
  {
    immediate: true,
    flush: 'post',
  },
)
</script>
