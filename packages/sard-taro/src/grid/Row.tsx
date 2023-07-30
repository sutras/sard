import { createContext, FC, useMemo } from 'react'
import { View } from '@tarojs/components'
import classNames from 'classnames'
import { splitUnit } from '../utils'
import { BaseProps } from '../base'
import { useBem } from '../use'

const mapJustify = {
  start: 'flex-start',
  center: 'center',
  end: 'flex-end',
  around: 'space-around',
  between: 'space-between',
  evenly: 'space-evenly',
}
const mapAlign = {
  start: 'flex-start',
  center: 'center',
  end: 'flex-end',
  stretch: 'stretch',
}

export type RowContextValue = readonly [
  merged: string | number,
  value: number,
  unit: string,
]

export const RowContext = createContext<RowContextValue>(null)

export interface RowProps extends BaseProps {
  gap?: number | string
  justify?: 'start' | 'center' | 'end' | 'around' | 'between' | 'evenly'
  align?: 'start' | 'center' | 'end' | 'stretch'
}

export const Row: FC<RowProps> = (props) => {
  const { className, style, children, gap, justify, align, ...restProps } =
    props

  const [bem] = useBem('row')

  const gutter = useMemo(() => {
    if (gap) {
      const result = splitUnit(gap)
      const value = result[0] / 2
      const unit = result[1]
      const merged = unit ? value + unit : value
      return [merged, value, unit] as const
    }
  }, [gap])

  const rowStyle = Object.assign(
    {
      justifyContent: justify && mapJustify[justify],
      alignItems: align && mapAlign[align],
    },
    gap
      ? {
          marginLeft: -gutter[0],
          marginRight: -gutter[0],
        }
      : null,
    style,
  )

  const rowClass = classNames(bem.b(), className)

  return (
    <View {...restProps} className={rowClass} style={rowStyle}>
      <RowContext.Provider value={gutter}>{children}</RowContext.Provider>
    </View>
  )
}

export default Row
