import { Dialog as DialogOrigin } from './Dialog'
import type {
  DialogFC as DialogOriginFC,
  DialogProps,
  DialogRef,
} from './Dialog'
import { DialogAgent } from './Agent'
import { show, alert, confirm } from './imperative'

interface DialogFC extends DialogOriginFC {
  show: typeof show
  alert: typeof alert
  confirm: typeof confirm
  Agent: typeof DialogAgent
}

const Dialog = DialogOrigin as DialogFC

Dialog.show = show
Dialog.alert = alert
Dialog.confirm = confirm
Dialog.Agent = DialogAgent

export { Dialog, DialogProps, DialogRef, DialogAgent }

export default Dialog
