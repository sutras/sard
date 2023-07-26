import { useRef } from 'react'
import FormStore, { FormInstance } from './FormStore'

export function useForm(form?: FormInstance) {
  const formRef = useRef<FormInstance>()

  if (!formRef.current) {
    if (form) {
      formRef.current = form
    } else {
      const formStore = new FormStore()
      formRef.current = formStore.getForm()
    }
  }

  return [formRef.current] as const
}

export default useForm
