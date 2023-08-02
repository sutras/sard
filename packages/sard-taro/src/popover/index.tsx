import { FC, ReactElement, useState, cloneElement } from 'react'
import classNames from 'classnames'
import { ITouchEvent, View } from '@tarojs/components'
import { Popup, PopupProps } from '../popup'
import { Menu, MenuOption } from '../menu'
import { useBem, useControllableValue, useEvent, useSelectorId } from '../use'
import { getRectById } from '../utils'

import { Placement, getPopoverPosition } from './utils'

export type { Placement as PopoverPlacement, MenuOption as PopoverOption }

export interface PopoverProps extends PopupProps {
  options?: MenuOption[]
  reference?: ReactElement
  refGap?: number
  viewportGap?: number
  placement?: Placement
  direction?: 'vertical' | 'horizontal'
  theme?: 'dark' | 'light'
  onSelect?: (option: MenuOption) => void
  visible?: boolean
  defaultVisible?: boolean
  onVisible?: (visible: boolean) => void
}

export const Popover: FC<PopoverProps> = (props) => {
  const {
    options = [],
    reference,
    className,
    style,
    children,
    onMaskClick,
    transparent = true,
    refGap = 10,
    viewportGap = 10,
    placement = 'bottom',
    direction = 'vertical',
    theme = 'light',
    onSelect,
    visible,
    defaultVisible,
    onVisible,
    ...restProps
  } = props

  const [bem] = useBem('popover')

  const referenceId = useSelectorId()
  const contentId = useSelectorId()
  const mergedReferenceId = reference?.props.id || referenceId

  const [innerVisible, setInnerVisible] = useControllableValue({
    value: visible,
    defaultValue: defaultVisible,
    trigger: onVisible,
    initialValue: false,
  })

  const handleMaskClick = useEvent((event: ITouchEvent) => {
    setInnerVisible(false)
    onMaskClick?.(event)
  })

  const [popperPosition, setPopperPosition] = useState({ top: 0, left: 0 })
  const [arrowPosition, setArrowPosition] = useState<{
    top: number | string
    left: number | string
  }>({ top: 0, left: 0 })

  const handleEntering = async () => {
    const referenceRect = await getRectById(mergedReferenceId)
    const contentRect = await getRectById(contentId)
    if (referenceRect) {
      const [popperPosition, arrowPosition] = getPopoverPosition(
        referenceRect,
        contentRect,
        {
          refGap,
          viewportGap,
          placement,
        },
      )
      setPopperPosition(popperPosition)
      setArrowPosition(arrowPosition)
    }
  }

  const handleSelect = (option) => {
    setInnerVisible(false)
    onSelect?.(option)
  }

  return (
    <>
      {reference &&
        cloneElement(reference, {
          id: mergedReferenceId,
          onClick(event) {
            setInnerVisible(true)
            reference.props.onClick?.(event)
          },
        })}
      <Popup
        timeout={150}
        {...restProps}
        customEffect={bem.m('fade')}
        visible={innerVisible}
        onMaskClick={handleMaskClick}
        transparent={transparent}
        className={classNames(bem.b(), bem.m(theme), className)}
        style={{
          ...popperPosition,
          ...style,
        }}
        onEntering={handleEntering}
      >
        <View
          className={classNames(bem.e('content'), bem.em('content', direction))}
          id={contentId}
        >
          {children ?? (
            <Menu
              options={options}
              direction={direction}
              theme={theme}
              onSelect={handleSelect}
            ></Menu>
          )}
        </View>
        <View
          className={classNames(bem.e('arrow'))}
          style={arrowPosition}
        ></View>
      </Popup>
    </>
  )
}

export default Popover
