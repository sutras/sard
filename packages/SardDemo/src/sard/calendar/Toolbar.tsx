import { memo } from 'react'
import { View } from '@tarojs/components'
import { useBem } from '../use'
import Button from '../button'
import Icon from '../icon'
import useTranslate from '../locale/useTranslate'
import { toMonthNumber } from '../utils'

export interface ToolbarProps {
  currentDate: Date
  minDate: Date
  maxDate: Date
  onPrevClick: () => void
  onNextClick: () => void
  onMonthClick: () => void
}

export const Toolbar = memo((props: ToolbarProps) => {
  const { t } = useTranslate('calendar')

  const {
    currentDate,
    minDate,
    maxDate,
    onPrevClick,
    onNextClick,
    onMonthClick,
  } = props

  const [bem] = useBem('calendar')

  return (
    <View className={bem.e('toolbar')}>
      <Button
        type="pale-text"
        theme="secondary"
        disabled={toMonthNumber(currentDate) <= toMonthNumber(minDate)}
        onClick={onPrevClick}
      >
        <Icon name="left" size={16} />
      </Button>
      <Button type="pale-text" theme="secondary" onClick={onMonthClick}>
        {t('monthTitle', {
          year: currentDate.getFullYear(),
          month: String(currentDate.getMonth() + 1).padStart(2, '0'),
        })}
      </Button>
      <Button
        type="pale-text"
        theme="secondary"
        disabled={toMonthNumber(currentDate) >= toMonthNumber(maxDate)}
        onClick={onNextClick}
      >
        <Icon name="right" size={16} />
      </Button>
    </View>
  )
})

export default Toolbar
