import { FC, ReactNode } from 'react'
import { Text, View } from '@tarojs/components'
import classNames from 'classnames'
import { useBem, useControllableValue } from '../use'
import { getPageRange, minmax } from '../utils'
import useTranslate from '../locale/useTranslate'
import { BaseProps } from '../base'
import Pressable from '../pressable'

export interface PaginationProps extends BaseProps {
  total?: number
  pageSize?: number
  current?: number
  defaultCurrent?: number
  onChange?: (page: number) => void
  pageCount?: number
  pageButtonCount?: number
  hideOnSinglePage?: boolean
  type?: 'simple' | 'multi'
  ellipsis?: boolean
  multiCount?: number
  prev?: ReactNode
  next?: ReactNode
  page?: (page: number, active: boolean) => ReactNode
}

export const Pagination: FC<PaginationProps> = (props) => {
  const { t } = useTranslate('pagination')

  const {
    className,
    style,

    total = 0,
    pageSize = 10,
    current,
    defaultCurrent,
    onChange,
    pageCount,
    pageButtonCount = 5,
    hideOnSinglePage = false,
    type = 'multi',
    ellipsis,
    multiCount = 5,
    prev,
    next,
    page: pageSlot,
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

  const [min, max] = getPageRange(innerCurrent, innerPageCount, pageButtonCount)

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

  const handleItemClick = (page: number, type: 0 | -1 | 1) => {
    changeTo(
      type === 0
        ? page
        : minmax(innerCurrent + type * multiCount, 1, innerPageCount),
    )
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
        const isPrevMulti = i === 0 && page !== 1
        const isNextMulti = i === length - 1 && page !== innerPageCount
        const type = isPrevMulti ? -1 : isNextMulti ? 1 : 0

        return (
          <Pressable key={page} disabled={innerCurrent === page}>
            {({ pressed }) => (
              <View
                className={classNames(
                  bem.e('item'),
                  bem.em('item', 'later'),
                  bem.em('item', 'current', innerCurrent === page),
                  bem.em('item', 'pressed', pressed),
                )}
                onClick={() => handleItemClick(page, type)}
              >
                <Text
                  className={classNames(
                    bem.e('item-text'),
                    bem.em('item-text', 'current', innerCurrent === page),
                  )}
                >
                  {ellipsis && (isPrevMulti || isNextMulti)
                    ? '...'
                    : pageSlot
                    ? pageSlot(page, innerCurrent === page)
                    : page}
                </Text>
              </View>
            )}
          </Pressable>
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
          style={style}
        >
          <Pressable disabled={innerCurrent === 1}>
            {({ pressed }) => (
              <View
                className={classNames(
                  bem.e('item'),
                  bem.em('item', 'disabled', innerCurrent === 1),
                  bem.em('item', 'pressed', pressed),
                  bem.em('item', 'first'),
                  bem.e('prev'),
                  bem.em('prev', type),
                )}
                onClick={handlePrevClick}
              >
                <Text className={bem.e('item-text')}>
                  {prev ?? t('previous')}
                </Text>
              </View>
            )}
          </Pressable>

          {type === 'simple' ? renderSimple() : renderMulti()}

          <Pressable disabled={innerCurrent === innerPageCount}>
            {({ pressed }) => (
              <View
                className={classNames(
                  bem.e('item'),
                  bem.em('item', 'disabled', innerCurrent === innerPageCount),
                  bem.em('item', 'pressed', pressed),
                  bem.em('item', 'later'),
                  bem.em('item', 'last'),
                  bem.e('next'),
                  bem.em('next', type),
                )}
                onClick={handleNextClick}
              >
                <Text className={bem.e('item-text')}>{next ?? t('next')}</Text>
              </View>
            )}
          </Pressable>
        </View>
      )}
    </>
  )
}

export default Pagination
