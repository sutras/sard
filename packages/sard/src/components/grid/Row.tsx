import { createContext, CSSProperties, FC, ReactNode, useMemo } from 'react'
import classNames from 'classnames'
import { splitUnit } from '../../utils'

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

export interface RowContext {
  gutter: number | string
  gap: [number, string]
}

export const RowContext = createContext<RowContext | null>(null)

export interface RowProps {
  className?: string
  style?: CSSProperties
  children?: ReactNode
  gutter?: number | string
  justify?: 'start' | 'center' | 'end' | 'around' | 'between' | 'evenly'
  align?: 'start' | 'center' | 'end' | 'stretch'
}

export const Row: FC<RowProps> = (props) => {
  const { className, style, children, gutter, justify, align, ...restProps } =
    props

  const gap = useMemo(() => {
    if (gutter) {
      const result = splitUnit(gutter)
      return [result[0] / 2, result[1] || 'px'] as [number, string]
    }
  }, [gutter])

  const rowStyle = Object.assign(
    {
      justifyContent: justify && mapJustify[justify],
      alignItems: align && mapAlign[align],
    },
    gutter
      ? {
          marginLeft: -gap[0] + gap[1],
          marginRight: -gap[0] + gap[1],
        }
      : null,
    style,
  )

  const rowClass = classNames('s-row', className)

  const context = useMemo(
    () => ({
      gutter,
      gap,
    }),
    [gutter],
  )

  return (
    <div {...restProps} className={rowClass} style={rowStyle}>
      <RowContext.Provider value={context}>{children}</RowContext.Provider>
    </div>
  )
}

export default Row
