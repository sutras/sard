import { FC, ReactNode, useRef, useState, useMemo } from 'react'
import classNames from 'classnames'
import { ITouchEvent, View } from '@tarojs/components'
import PopoutTarget from './Target'
import PopoutOutlet from './Outlet'
import { PopoutContext, PopoutContexValue } from './PopoutContext'
import { Popup, PopupProps } from '../popup'
import { Button, ButtonProps } from '../button'
import { Icon } from '../icon'
import { isFunction, isNullish, noop } from '../utils'
import { useEvent, useControllableValue, useBem } from '../use'
import useTranslate from '../locale/useTranslate'
import { BaseProps } from '../base'

export * from './Target'
export * from './Outlet'

const CLOSE = 'close'
const CANCEL = 'cancel'
const CONFIRM = 'confirm'

export type PopoutCloseType = 'close' | 'cancel' | 'confirm'

export interface PopoutProps extends BaseProps, PopupProps {
  title?: ReactNode
  showCancel?: boolean
  cancelText?: ReactNode
  cancelProps?: ButtonProps
  showConfirm?: boolean
  confirmText?: ReactNode
  confirmProps?: ButtonProps
  showClose?: boolean
  type?: 'compact' | 'loose'
  fast?: boolean
  visible?: boolean
  defaultVisible?: boolean
  onVisible?: (visible: boolean) => void
  maskClosable?: boolean
  onClose?: () => void | Promise<unknown>
  onCancel?: () => void | Promise<unknown>
  onConfirm?: () => void | Promise<unknown>
  value?: any
  defaultValue?: any
  onChange?: (value: any) => void
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
    showCancel = false,
    cancelText = t('cancel'),
    cancelProps,
    showConfirm = true,
    confirmText = t('confirm'),
    confirmProps,
    showClose = true,
    type = 'loose',
    fast = false,
    visible,
    defaultVisible,
    onVisible,
    maskClosable = true,
    onClose,
    onCancel,
    onConfirm,
    value,
    defaultValue,
    onChange,
    disabled,
    readOnly,
    onMaskClick,
    ...restProps
  } = props

  const [bem] = useBem('popout')

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

  const [outletValue, setOutletValue] = useState<any>()
  const [outlet, setOutlet] = useState(null)
  const [target, setTarget] = useState(false)
  const temporaryOutletValue = useRef<any>()
  const temporaryValue = useRef<any>()
  const alwaysHasValue = useRef(false)
  const targetRef = useRef<{
    getTriggerArgsForcibly: () => readonly [value: any, outletValue: string]
  }>()

  const [confirmDisabled, setConfirmDisabled] = useState(true)

  const mergedConfirmDisabled =
    !alwaysHasValue.current && confirmDisabled && target

  const [loading, setLoading] = useState({
    cancel: false,
    confirm: false,
  })

  const perhapsClose = (
    type: PopoutCloseType,
    callback?: () => void | Promise<unknown>,
  ) => {
    function toggleLoading(play: boolean) {
      setLoading((loading) => ({
        ...loading,
        [type]: play,
      }))
    }

    if (isFunction(callback)) {
      const result = callback()
      if (result instanceof Promise) {
        toggleLoading(true)

        return result
          .then(() => {
            setInnerVisible(false)
          })
          .catch(noop)
          .finally(() => {
            toggleLoading(false)
          })
      }
    }

    setInnerVisible(false)
  }

  const handleMaskClick = useEvent((event: ITouchEvent) => {
    onMaskClick?.(event)

    if (maskClosable) {
      perhapsClose(CLOSE, onClose)
    }
  })

  const handleClose = useEvent(() => {
    perhapsClose(CLOSE, onClose)
  })

  const handleCancel = useEvent(() => {
    perhapsClose(CANCEL, onCancel)
  })

  const handleConfirm = useEvent(() => {
    if (
      isNullish(temporaryValue.current) &&
      alwaysHasValue &&
      targetRef.current
    ) {
      const [value, popoutValue] = targetRef.current.getTriggerArgsForcibly()
      temporaryValue.current = value
      temporaryOutletValue.current = popoutValue
    }

    setInnerValue(temporaryValue.current)
    setOutletValue(temporaryOutletValue.current)
    perhapsClose(CONFIRM, onConfirm)
  })

  const handleChange = useEvent((value: any) => {
    temporaryValue.current = value

    if (fast) {
      handleConfirm()
    }
  })

  const context = useMemo<PopoutContexValue>(
    () => ({
      visible: innerVisible,
      setVisible: disabled || readOnly ? noop : setInnerVisible,
      value: innerValue,
      setValue: setInnerValue,
      onChange: handleChange,
      setConfirmDisabled,
      setOutlet,
      setTarget,
      outletValue,
      setOutletValue,
      temporaryOutletValue,
      alwaysHasValue,
      targetRef,
    }),
    [innerVisible, innerValue, outletValue, disabled, readOnly],
  )

  const renderCancelButton = (
    type: ButtonProps['type'],
    theme: ButtonProps['theme'],
    round: boolean,
    placement: string,
  ) => {
    return (
      <Button
        className={classNames(
          bem.e(`${placement}-cancel`),
          bem.e(`${placement}-button`),
        )}
        type={type}
        theme={theme}
        round={round}
        loading={loading.cancel}
        {...cancelProps}
        onClick={handleCancel}
      >
        {cancelText}
      </Button>
    )
  }

  const renderConfirmButton = (
    type: ButtonProps['type'],
    round: boolean,
    placement: string,
  ) => {
    return (
      <Button
        className={classNames(
          bem.e(`${placement}-confirm`),
          bem.e(`${placement}-button`),
        )}
        type={type}
        theme="primary"
        round={round}
        disabled={mergedConfirmDisabled}
        loading={loading.confirm}
        {...confirmProps}
        onClick={handleConfirm}
      >
        {confirmText}
      </Button>
    )
  }

  const renderHeader = () => {
    return (
      <View className={classNames(bem.e('header'), bem.em('header', type))}>
        {type === 'compact' && (
          <View className={bem.e('button-wrap')}>
            {renderCancelButton('pale-text', 'secondary', false, 'header')}
          </View>
        )}

        {title && <View className={bem.e('title')}>{title}</View>}

        {type === 'compact' && (
          <View className={bem.e('button-wrap')}>
            {renderConfirmButton('pale-text', false, 'header')}
          </View>
        )}

        {type === 'loose' && showClose && (
          <Button
            className={bem.e('close')}
            type="pale-text"
            theme="secondary"
            size="large"
            onClick={handleClose}
          >
            <Icon name="close"></Icon>
          </Button>
        )}
      </View>
    )
  }

  const renderFooter = () => {
    return (
      type === 'loose' && (
        <View className={bem.e('footer')}>
          {showCancel && renderCancelButton('pale', 'primary', true, 'footer')}
          {showConfirm && renderConfirmButton('default', true, 'footer')}
        </View>
      )
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
          className={classNames(bem.b(), className)}
          onMaskClick={handleMaskClick}
        >
          {renderHeader()}
          {children}
          {renderFooter()}
        </Popup>
      </PopoutContext.Provider>
    </>
  )
}

Popout.Target = PopoutTarget
Popout.Outlet = PopoutOutlet

export default Popout
