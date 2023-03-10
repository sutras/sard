import {
  CSSProperties,
  FC,
  ReactNode,
  useRef,
  useState,
  MouseEvent,
  useMemo,
  useEffect,
} from 'react'
import classNames from 'classnames'
import { useControlledValue } from '../../use'
import { Popup, PopupProps } from '../popup'
import { Button, ButtonProps } from '../button'
import { Icon } from '../icon'
import { useEvent } from '../../use'
import PopoutTarget from './Target'
import PopoutOutlet from './Outlet'
import PopoutContext from './PopoutContext'
import { isEmptyValue } from '../../utils'

export * from './Target'
export * from './Outlet'

export interface PopoutProps {
  className?: string
  style?: CSSProperties
  title?: ReactNode
  children?: ReactNode
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
  popupProps?: PopupProps
  value?: any
  defaultValue?: any
  onChange?: (value: any) => void
}

export interface PopoutFC extends FC<PopoutProps> {
  Target: typeof PopoutTarget
  Outlet: typeof PopoutOutlet
}

export const Popout: PopoutFC = (props) => {
  const {
    className,
    title,
    children,
    visible,
    defaultVisible,
    onVisible,
    showCancel = false,
    cancelText = '取消',
    cancelProps,
    showConfirm = true,
    confirmText = '确定',
    confirmProps,
    showClose = true,
    type = 'loose',
    fast = false,
    onClose,
    onCancel,
    onConfirm,
    popupProps = {},
    value,
    defaultValue,
    onChange,
    ...restProps
  } = props

  const {
    placement = 'bottom',
    onMaskClick,
    onEnter,
    ...restPopupProps
  } = popupProps

  const [innerVisible, setInnerVisible] = useControlledValue<boolean>(props, {
    defaultValuePropName: 'defaultVisible',
    valuePropName: 'visible',
    trigger: 'onVisible',
    defaultValue: false,
  })

  const [innerValue, setInnerValue] = useControlledValue<any>(props, {})

  const [bridgeValue, setBridgeValue] = useState<any>()
  const [triggerArgs, setTriggerArgs] = useState([])
  const [outlet, setOutlet] = useState(null)
  const tempTriggerArgs = useRef<any[]>([])
  const [target, setTarget] = useState(false)

  const confirmDisabled = useMemo(() => {
    if (!target) {
      return false
    }
    return isEmptyValue(bridgeValue)
  }, [target, bridgeValue])

  const setVisible = (show: boolean) => {
    setInnerVisible(show)
  }

  const handleChange = useEvent((args: any[]) => {
    tempTriggerArgs.current = args

    setBridgeValue(args[0])

    if (fast) {
      handleConfirm()
    }
  })

  useEffect(() => {
    setBridgeValue(innerValue)
  }, [innerValue])

  const handleMaskClick = useEvent((event: MouseEvent) => {
    setVisible(false)
    onClose?.(false)
    onMaskClick?.(event)
  })

  const handleCancel = useEvent(() => {
    setVisible(false)
    onCancel?.(false)
    onClose?.(false)
  })

  const handleConfirm = useEvent(() => {
    setTriggerArgs(tempTriggerArgs.current.slice())
    setInnerValue(tempTriggerArgs.current[0])
    setVisible(false)
    onConfirm?.(false)
    onClose?.(false)
  })

  const enter = useRef<(...args: any[]) => any>()
  const handleEnter = useEvent(() => {
    enter.current?.()
    onEnter?.()
  })

  const context = useMemo(
    () => ({
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
      setVisible: setInnerVisible,
    }),
    [innerValue, bridgeValue, triggerArgs],
  )

  const renderCancelButton = (
    type: ButtonProps['type'],
    theme: ButtonProps['theme'],
    round: boolean,
  ) => {
    return (
      <Button
        className="s-popout-cancel s-popout-button"
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
        className="s-popout-confirm s-popout-button"
        type={type}
        theme="primary"
        round={round}
        disabled={confirmDisabled}
        onClick={handleConfirm}
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
          {...restPopupProps}
          placement={placement}
          visible={innerVisible}
          onMaskClick={handleMaskClick}
          onEnter={handleEnter}
        >
          <div
            {...restProps}
            className={classNames('s-popout', 's-popout-' + type, className)}
          >
            <div className="s-popout-header">
              {type === 'compact' &&
                renderCancelButton('pale-text', 'secondary', false)}
              {title && <div className="s-popout-title">{title}</div>}
              {type === 'compact' && renderConfirmButton('pale-text', false)}
              {type === 'loose' && showClose && (
                <Button
                  className="s-popout-close"
                  type="pale-text"
                  theme="secondary"
                  size="large"
                  onClick={handleCancel}
                >
                  <Icon prefix="si" name="close"></Icon>
                </Button>
              )}
            </div>
            <div className="s-popout-body">{children}</div>
            {type === 'loose' && (
              <div className="s-popout-footer">
                {showCancel && renderCancelButton('pale', 'primary', true)}
                {showConfirm && renderConfirmButton('default', true)}
              </div>
            )}
          </div>
        </Popup>
      </PopoutContext.Provider>
    </>
  )
}

Popout.Target = PopoutTarget
Popout.Outlet = PopoutOutlet

export default Popout
