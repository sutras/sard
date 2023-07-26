import { createContext, FC, useMemo } from 'react'
import { View } from '@tarojs/components'
import classNames from 'classnames'
import { splitUnit } from '../utils'
import { BaseProps } from '../base'

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

export interface RowContextValue {
  gap?: number | string
  gutter?: [number, string]
}

export const RowContext = createContext<RowContextValue>({})

export interface RowProps extends BaseProps {
  gap?: number | string
  justify?: 'start' | 'center' | 'end' | 'around' | 'between' | 'evenly'
  align?: 'start' | 'center' | 'end' | 'stretch'
}

export const Row: FC<RowProps> = (props) => {
  const { className, style, children, gap, justify, align, ...restProps } =
    props

  const gutter = useMemo(() => {
    if (gap) {
      const result = splitUnit(gap)
      return [result[0] / 2, result[1] || 'px'] as [number, string]
    }
  }, [gap])

  const rowStyle = Object.assign(
    {
      justifyContent: justify && mapJustify[justify],
      alignItems: align && mapAlign[align],
    },
    gap
      ? {
          marginLeft: -gutter[0] + gutter[1],
          marginRight: -gutter[0] + gutter[1],
        }
      : null,
    style,
  )

  const rowClass = classNames('sar-row', className)

  const context = useMemo(
    () => ({
      gap,
      gutter,
    }),
    [gap],
  )

  return (
    <View {...restProps} className={rowClass} style={rowStyle}>
      <RowContext.Provider value={context}>{children}</RowContext.Provider>
    </View>
  )
}

export default Row
