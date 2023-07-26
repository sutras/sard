import { Notify as NotifyOrigin } from './Notify'
import type {
  NotifyFC as NotifyOriginFC,
  NotifyProps,
  NotifyRef,
} from './Notify'
import { show, success, warning, error, hide, hideAll } from './imperative'
import { NotifyAgent } from './Agent'

export interface NotifyFC extends NotifyOriginFC {
  show: typeof show
  success: typeof success
  warning: typeof warning
  error: typeof error
  hide: typeof hide
  hideAll: typeof hideAll
  Agent: typeof NotifyAgent
}

const Notify = NotifyOrigin as NotifyFC

Notify.show = show
Notify.success = success
Notify.warning = warning
Notify.error = error
Notify.hide = hide
Notify.hideAll = hideAll
Notify.Agent = NotifyAgent

export { Notify, NotifyAgent, NotifyProps, NotifyRef }

export default Notify
