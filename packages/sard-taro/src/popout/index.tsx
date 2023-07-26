import { FC, ReactNode, useRef, useState, useMemo, useEffect } from 'react'
import classNames from 'classnames'
import { ITouchEvent, View } from '@tarojs/components'
import PopoutTarget from './Target'
import PopoutOutlet from './Outlet'
import PopoutContext, {
  PopoutContexValue,
  TargetElementRefVal,
} from './PopoutContext'
import { Popup, PopupProps } from '../popup'
import { Button, ButtonProps } from '../button'
import { Icon } from '../icon'
import { isEmptyValue } from '../utils'
import { useEvent, useControllableValue } from '../use'
import useTranslate from '../locale/useTranslate'
import { AnyFunction, AnyType, BaseProps } from '../base'

export * from './Target'
export * from './Outlet'

export interface PopoutProps extends BaseProps, PopupProps {
  title?: ReactNode
  visible?: boolean
  defaultVisible?: boolean
  onVisible?: (visible: boolean) => void
  showCancel?: boolean
  cancelText?: ReactNode
  cancelProps?: ButtonProps
  showConfirm?: boolean
  confirmText?: ReactNode
  confirmProps?: ButtonProps
  showClose?: boolean
  type?: 'compact' | 'loose'
  fast?: boolean
  onClose?: (visible: false) => void
  onCancel?: (visible: false) => void
  onConfirm?: (visible: false) => void
  value?: AnyType
  defaultValue?: AnyType
  onChange?: (value: AnyType) => void
  disabled?: boolean
  readOnly?: boolean
}

export interface PopoutFC extends FC<PopoutProps> {
  Target: typeof PopoutTarget
  Outlet: typeof PopoutOutlet
}

export const Popout: PopoutFC = (props) => {
  const [t] = useTranslate('popout')

  const {
    className,
    title,
    children,
    visible,
    defaultVisible,
    onVisible,
    showCancel = false,
    cancelText = t('cancel'),
    cancelProps,
    showConfirm = true,
    confirmText = t('confirm'),
    confirmProps,
    showClose = true,
    type = 'loose',
    fast = false,
    onClose,
    onCancel,
    onConfirm,
    value,
    defaultValue,
    onChange,
    disabled,
    readOnly,
    onMaskClick,
    onEnter,
    ...restProps
  } = props

  const [innerVisible, setInnerVisible] = useControllableValue({
    value: visible,
    defaultValue: defaultVisible,
    trigger: onVisible,
    initialValue: false,
  })

  const [innerValue, setInnerValue] = useControllableValue({
    value,
    defaultValue,
    trigger: onChange,
  })

  const [bridgeValue, setBridgeValue] = useState<AnyType>()
  const [triggerArgs, setTriggerArgs] = useState([])
  const [outlet, setOutlet] = useState(null)
  const tempTriggerArgs = useRef<AnyType[]>([])
  const [target, setTarget] = useState(false)
  const [alwaysHasValue, setAlwaysHasValue] = useState(false)
  const targetElementRef = useRef<TargetElementRefVal>(null)

  const confirmDisabled = useMemo(() => {
    if (!target) {
      return false
    }
    return isEmptyValue(bridgeValue) && !alwaysHasValue
  }, [target, bridgeValue])

  const setVisible = (show: boolean) => {
    setInnerVisible(show)
  }

  const handleChange = useEvent((args: AnyType[], forceConfirm: boolean) => {
    tempTriggerArgs.current = args

    setBridgeValue(args[0])

    if (forceConfirm || fast) {
      handleConfirm(forceConfirm)
    }
  })

  useEffect(() => {
    setBridgeValue(innerValue)
  }, [innerValue])

  const handleMaskClick = useEvent((event: ITouchEvent) => {
    setVisible(false)
    onClose?.(false)
    onMaskClick?.(event)
  })

  const handleCancel = useEvent(() => {
    setVisible(false)
    onCancel?.(false)
    onClose?.(false)
  })

  const handleConfirm = useEvent((forceConfirm?: boolean) => {
    if (alwaysHasValue && !forceConfirm) {
      const args = targetElementRef.current?.getTriggerArgsForcibly?.()
      handleChange(args, true)
    } else {
      setTriggerArgs(tempTriggerArgs.current.slice())
      setInnerValue(tempTriggerArgs.current[0])
      setVisible(false)
      onConfirm?.(false)
      onClose?.(false)
    }
  })

  const enter = useRef<AnyFunction>()
  const handleEnter = useEvent(() => {
    enter.current?.()
    onEnter?.()
  })

  const context = useMemo<PopoutContexValue>(
    () => ({
      visible: innerVisible,
      value: innerValue,
      bridgeValue,
      triggerArgs,
      setValue: (value) => {
        setBridgeValue(value)
        setInnerValue(value)
      },
      handleChange,
      setOutlet,
      setTarget,
      setTriggerArgs,
      setVisible:
        disabled || readOnly
          ? () => {
              void 0
            }
          : setInnerVisible,
      setAlwaysHasValue,
      targetElementRef,
    }),
    [innerVisible, innerValue, bridgeValue, triggerArgs, disabled, readOnly],
  )

  const renderCancelButton = (
    type: ButtonProps['type'],
    theme: ButtonProps['theme'],
    round: boolean,
  ) => {
    return (
      <Button
        className="sar-popout-cancel sar-popout-button"
        type={type}
        theme={theme}
        round={round}
        {...cancelProps}
        onClick={handleCancel}
      >
        {cancelText}
      </Button>
    )
  }

  const renderConfirmButton = (type: ButtonProps['type'], round: boolean) => {
    return (
      <Button
        className="sar-popout-confirm sar-popout-button"
        type={type}
        theme="primary"
        round={round}
        disabled={confirmDisabled}
        onClick={() => handleConfirm(true)}
        {...confirmProps}
      >
        {confirmText}
      </Button>
    )
  }

  return (
    <>
      <PopoutContext.Provider value={context}>
        {outlet}
        <Popup
          {...restProps}
          effect="slide-bottom"
          visible={innerVisible}
          className={classNames('sar-popout', 'sar-popout-' + type, className)}
          onMaskClick={handleMaskClick}
          onEnter={handleEnter}
        >
          <View className="sar-popout-header">
            {type === 'compact' &&
              renderCancelButton('pale-text', 'secondary', false)}
            {title && <View className="sar-popout-title">{title}</View>}
            {type === 'compact' && renderConfirmButton('pale-text', false)}
            {type === 'loose' && showClose && (
              <Button
                className="sar-popout-close"
                type="pale-text"
                theme="secondary"
                size="large"
                onClick={handleCancel}
              >
                <Icon name="close"></Icon>
              </Button>
            )}
          </View>
          <View className="sar-popout-body">{children}</View>
          {type === 'loose' && (
            <View className="sar-popout-footer">
              {showCancel && renderCancelButton('pale', 'primary', true)}
              {showConfirm && renderConfirmButton('default', true)}
            </View>
          )}
        </Popup>
      </PopoutContext.Provider>
    </>
  )
}

Popout.Target = PopoutTarget
Popout.Outlet = PopoutOutlet

export default Popout
