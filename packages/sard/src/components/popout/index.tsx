import {
  createContext,
  CSSProperties,
  FC,
  ReactNode,
  useRef,
  useState,
} from 'react'
import classNames from 'classnames'
import { useControlledValue } from '../../use'
import { CommonComponentProps } from '../../utils/types'
import { Popup, PopupProps } from '../popup'
import { Button, ButtonProps } from '../button'
import { Icon } from '../icon'
import { useEvent } from '../../use'
import PopoutBridge from './Bridge'
import PopoutTarget from './Target'
import PopoutOutlet from './Outlet'
import PopoutClear from './Clear'
import PopoutSelect from './Select'

export * from './Bridge'
export * from './Target'
export * from './Outlet'

export interface PopoutProps extends CommonComponentProps {
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
  type?: 'compact' | 'loose'
  onClose?: (visible: false) => void
  onCancel?: (visible: false) => void
  onConfirm?: (visible: false) => void
  popupProps?: PopupProps
}

export interface PopoutContext {
  setTarget: (target?: ReactNode) => void
  setVisible: (visible: boolean) => void
  setChangeArgs: (...args: any[]) => void
  setConfirmDisabled: (disabled: boolean) => void
  setEnter: (callback: (...args: any[]) => any) => void
  setTmpChangeArgs: (...args: any[]) => void
  clear: () => void
}
export const PopoutContext = createContext<PopoutContext>({} as PopoutContext)

export type PopoutChangeArgsContext = any[]
export const PopoutChangeArgsContext = createContext<PopoutChangeArgsContext>(
  [],
)

export interface PopoutFC extends FC<PopoutProps> {
  Bridge: typeof PopoutBridge
  Target: typeof PopoutTarget
  Outlet: typeof PopoutOutlet
  Clear: typeof PopoutClear
  Select: typeof PopoutSelect
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
    type = 'loose',
    onClose,
    onCancel,
    onConfirm,
    popupProps = {},
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

  const setVisible = (show: boolean) => {
    setInnerVisible(show)
  }

  const handleMaskClick = useEvent(() => {
    setVisible(false)
    onClose?.(false)
    onMaskClick?.()
  })

  const handleCancel = useEvent(() => {
    setVisible(false)
    onCancel?.(false)
    onClose?.(false)
  })

  const handleConfirm = useEvent(() => {
    setChangeArgs(tmpChangeArgs.current.slice())
    setVisible(false)
    onConfirm?.(false)
    onClose?.(false)
  })

  const [target, setTarget] = useState<ReactNode>(null)

  const enter = useRef<(...args: any[]) => any>()
  const handleEnter = useEvent(() => {
    enter.current?.()
    onEnter?.()
  })

  const [changeArgs, setChangeArgs] = useState<PopoutChangeArgsContext>([])
  const tmpChangeArgs = useRef<PopoutChangeArgsContext>([])

  const [confirmDisabled, setConfirmDisabled] = useState(false)

  const clear = useEvent(() => {
    if (changeArgs.length !== 0) {
      setChangeArgs([])
    }
  })

  const popoutContext = useRef<PopoutContext>({
    setTarget,
    setVisible,
    setChangeArgs,
    setConfirmDisabled,
    setEnter: (callback) => {
      enter.current = callback
    },
    setTmpChangeArgs: (changeArgs) => {
      tmpChangeArgs.current = changeArgs
    },
    clear,
  })

  const popoutClass = classNames('s-popout', 's-popout-' + type, className)

  return (
    <>
      <PopoutContext.Provider value={popoutContext.current}>
        <PopoutChangeArgsContext.Provider value={changeArgs}>
          {target}
          <Popup
            {...restPopupProps}
            placement={placement}
            visible={innerVisible}
            onMaskClick={handleMaskClick}
            onEnter={handleEnter}
          >
            <div {...restProps} className={popoutClass}>
              <div className="s-popout-header">
                {type === 'compact' && (
                  <Button
                    className="s-popout-cancel s-popout-button"
                    type="pale-text"
                    theme="secondary"
                    {...cancelProps}
                    onClick={handleCancel}
                  >
                    {cancelText}
                  </Button>
                )}
                {title && <div className="s-popout-title">{title}</div>}
                {type === 'compact' && (
                  <Button
                    className="s-popout-confirm s-popout-button"
                    type="pale-text"
                    theme="primary"
                    {...confirmProps}
                    disabled={confirmDisabled}
                    onClick={handleConfirm}
                  >
                    {confirmText}
                  </Button>
                )}
                {type === 'loose' && (
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
                  {showCancel && (
                    <Button
                      className="s-popout-cancel s-popout-button"
                      type="pale"
                      theme="primary"
                      round
                      {...cancelProps}
                      onClick={handleCancel}
                    >
                      {cancelText}
                    </Button>
                  )}
                  {showConfirm && (
                    <Button
                      className="s-popout-confirm s-popout-button"
                      type="default"
                      theme="primary"
                      round
                      {...confirmProps}
                      disabled={confirmDisabled}
                      onClick={handleConfirm}
                    >
                      {confirmText}
                    </Button>
                  )}
                </div>
              )}
            </div>
          </Popup>
        </PopoutChangeArgsContext.Provider>
      </PopoutContext.Provider>
    </>
  )
}

Popout.Bridge = PopoutBridge
Popout.Target = PopoutTarget
Popout.Outlet = PopoutOutlet
Popout.Clear = PopoutClear
Popout.Select = PopoutSelect

export default Popout
