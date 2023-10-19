import { memo } from 'react'
import { View } from '@tarojs/components'
import { useBem } from '../use'
import useTranslate from '../locale/useTranslate'

export interface WeeksProps {
  weekStartsOn: number
}

const weeks = [0, 1, 2, 3, 4, 5, 6]

const getWeeks = (weekStartsOn: number) => {
  return weeks.slice(weekStartsOn).concat(weeks.slice(0, weekStartsOn))
}

export const Weeks = memo((props: WeeksProps) => {
  const { t } = useTranslate('calendar')

  const { weekStartsOn = 0 } = props

  const [bem] = useBem('calendar')

  return (
    <View className={bem.e('week')}>
      {getWeeks(weekStartsOn).map((item) => {
        return (
          <View key={item} className={bem.e('week-item')}>
            {t(`weeks.${item}`)}
          </View>
        )
      })}
    </View>
  )
})

export default Weeks
