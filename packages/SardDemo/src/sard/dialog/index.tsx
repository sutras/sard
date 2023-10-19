import { Dialog as DialogOrigin } from './Dialog'
import type {
  DialogFC as DialogOriginFC,
  DialogProps,
  DialogRef,
  DialogCloseType,
} from './Dialog'
import { DialogAgent } from './Agent'
import { show, alert, confirm, hide, hideAll } from './imperative'

interface DialogFC extends DialogOriginFC {
  show: typeof show
  alert: typeof alert
  confirm: typeof confirm
  hide: typeof hide
  hideAll: typeof hideAll
  Agent: typeof DialogAgent
}

const Dialog = DialogOrigin as DialogFC

Dialog.show = show
Dialog.alert = alert
Dialog.confirm = confirm
Dialog.hide = hide
Dialog.hideAll = hideAll
Dialog.Agent = DialogAgent

export { Dialog, DialogProps, DialogRef, DialogAgent, DialogCloseType }

export default Dialog
