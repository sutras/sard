import { CSSProperties, FC, ReactNode } from 'react'
import classNames from 'classnames'
import { useControlledValue } from '../../use'
import { getPageRange, minmax } from '../../utils'

export interface PaginationProps {
  className?: string
  style?: CSSProperties
  total?: number
  pageSize?: number
  current?: number
  defaultCurrent?: number
  pageCount?: number
  pageItemCount?: number
  hideOnSinglePage?: boolean
  type?: 'simple' | 'multi'
  ellipsis?: boolean
  prev?: ReactNode
  next?: ReactNode
  page?: (page: number, active: boolean) => ReactNode
  onChange?: (page: number) => void
}

export const Pagination: FC<PaginationProps> = (props) => {
  const {
    className,
    total = 0,
    pageSize = 10,
    current,
    defaultCurrent,
    pageCount,
    pageItemCount = 5,
    hideOnSinglePage = false,
    type = 'multi',
    ellipsis,
    prev,
    next,
    page: pageSlot,
    onChange,
    ...restProps
  } = props

  const innerPageCount = (pageCount ?? Math.ceil(total / pageSize)) || 1

  const [innerCurrent, setInnerCurrent] = useControlledValue<number>(props, {
    defaultValuePropName: 'defaultCurrent',
    valuePropName: 'current',
    defaultValue: 1,
    preset(current) {
      return minmax(current, 1, innerPageCount)
    },
  })

  const [min, max] = getPageRange(innerCurrent, innerPageCount, pageItemCount)

  const handlePrevClick = () => {
    if (innerCurrent > 1) {
      changeTo(innerCurrent - 1)
    }
  }
  const handleNextClick = () => {
    if (innerCurrent < innerPageCount) {
      changeTo(innerCurrent + 1)
    }
  }
  const handleItemClick = (page: number) => {
    changeTo(page)
  }

  const changeTo = (page: number) => {
    if (page !== innerCurrent) {
      setInnerCurrent(page)
    }
  }

  const renderMulti = () => {
    const length = max - min + 1
    return Array(length)
      .fill(0)
      .map((_, i) => {
        const page = i + min
        return (
          <div
            key={page}
            data-page={page}
            className={classNames('s-pagination-item', {
              's-pagination-item-active': innerCurrent === page,
            })}
            onClick={() => handleItemClick(page)}
          >
            {ellipsis &&
            ((i === 0 && page !== 1) ||
              (i === length - 1 && page !== innerPageCount))
              ? '...'
              : pageSlot
              ? pageSlot(page, innerCurrent === page)
              : page}
          </div>
        )
      })
  }

  const renderSimple = () => {
    return (
      <div className="s-pagination-ratio">
        {innerCurrent}/{innerPageCount}
      </div>
    )
  }

  const pageClassName = classNames(
    's-pagination',
    's-pagination-' + type,
    className,
  )

  return (
    <>
      {(!hideOnSinglePage || innerPageCount > 1) && (
        <div {...restProps} className={pageClassName}>
          <div
            className={classNames('s-pagination-item s-pagination-prev', {
              's-pagination-item-disabled': innerCurrent === 1,
            })}
            onClick={handlePrevClick}
          >
            {prev ?? '上一页'}
          </div>
          {type === 'simple' ? renderSimple() : renderMulti()}
          <div
            className={classNames('s-pagination-item s-pagination-next', {
              's-pagination-item-disabled': innerCurrent === innerPageCount,
            })}
            onClick={handleNextClick}
          >
            {next ?? '下一页'}
          </div>
        </div>
      )}
    </>
  )
}

export default Pagination
