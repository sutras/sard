import { FC, ReactNode } from 'react'
import { View } from '@tarojs/components'
import classNames from 'classnames'
import { useBem, useControllableValue } from '../use'
import { getPageRange, minmax } from '../utils'
import useTranslate from '../locale/useTranslate'
import { BaseProps } from '../base'

export interface PaginationProps extends BaseProps {
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
  const [t] = useTranslate('pagination')

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

  const [bem] = useBem('pagination')

  const innerPageCount = (pageCount ?? Math.ceil(total / pageSize)) || 1

  const [innerCurrent, setInnerCurrent] = useControllableValue({
    value: current,
    defaultValue: defaultCurrent,
    trigger: onChange,
    initialValue: 1,
    postValue: (value) => minmax(value, 1, innerPageCount),
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
          <View
            key={page}
            data-page={page}
            className={classNames(
              bem.e('item'),
              bem.em('item', 'later'),
              bem.em('item', 'current', innerCurrent === page),
            )}
            onClick={() => handleItemClick(page)}
          >
            {ellipsis &&
            ((i === 0 && page !== 1) ||
              (i === length - 1 && page !== innerPageCount))
              ? '...'
              : pageSlot
              ? pageSlot(page, innerCurrent === page)
              : page}
          </View>
        )
      })
  }

  const renderSimple = () => {
    return (
      <View className={bem.e('ratio')}>
        {innerCurrent}/{innerPageCount}
      </View>
    )
  }

  return (
    <>
      {(!hideOnSinglePage || innerPageCount > 1) && (
        <View
          {...restProps}
          className={classNames(bem.b(), bem.m(type), className)}
        >
          <View
            className={classNames(
              bem.e('item'),
              bem.em('item', 'disabled', innerCurrent === 1),
              bem.em('item', 'interactive', innerCurrent !== 1),
              bem.em('item', 'first'),
              bem.e('prev'),
              bem.em('prev', type),
            )}
            onClick={handlePrevClick}
          >
            {prev ?? t('previous')}
          </View>
          {type === 'simple' ? renderSimple() : renderMulti()}
          <View
            className={classNames(
              bem.e('item'),
              bem.em('item', 'disabled', innerCurrent === innerPageCount),
              bem.em('item', 'interactive', innerCurrent !== innerPageCount),
              bem.em('item', 'later'),
              bem.em('item', 'last'),
              bem.e('next'),
              bem.em('next', type),
            )}
            onClick={handleNextClick}
          >
            {next ?? t('next')}
          </View>
        </View>
      )}
    </>
  )
}

export default Pagination
