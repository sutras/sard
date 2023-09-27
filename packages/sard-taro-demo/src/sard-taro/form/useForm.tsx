import { useRef } from 'react'
import createFormStore, { FormStore } from './createFormStore'

export function useForm(form?: FormStore) {
  const formRef = useRef<FormStore>()

  if (!formRef.current) {
    if (form) {
      formRef.current = form
    } else {
      formRef.current = createFormStore()
    }
  }

  return [formRef.current] as const
}
