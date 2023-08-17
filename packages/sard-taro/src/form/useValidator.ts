import { ReactNode, useContext, useMemo, useState } from 'react'
import FieldContext from './FieldContext'
import { FormStore, HOOK_KEY } from './createFormStore'
import { NodeName, ValidateOptions, ValidateStatus } from './type'
import { Rule, getRuleConfig } from './Validator'
import { useEvent } from '../use'
import { isBoolean, toArray } from '../utils'

export function useValidator(options: {
  formStore?: FormStore
  rules: Rule[]
  validateFirst: boolean
  validateStatus: ValidateStatus
  value: any
  name: NodeName
  label: ReactNode
  getNamePath: () => NodeName[]
  required: boolean
}) {
  const {
    formStore: externalFormStore,
    rules,
    validateFirst,
    validateStatus,
    value,
    name,
    label,
    getNamePath,
    required,
  } = options

  const fieldContext = useContext(FieldContext)
  const formStore = externalFormStore || fieldContext.formStore
  const { validator } = formStore.getInternalHooks(HOOK_KEY)

  const [errors, setErrors] = useState<string[]>([])

  const [innerValidateStatus, setInnerValidateStatus] =
    useState<ValidateStatus>('unvalidated')

  const finalValidateStatus = validateStatus || innerValidateStatus

  const ruleRequired = useMemo(() => {
    return !!(
      rules && rules.some((rule) => getRuleConfig(rule, formStore).required)
    )
  }, [rules])

  const validate = useEvent((options: ValidateOptions = {}) => {
    const { triggerName, validateOnly } = options

    return new Promise<void>((resolve, reject) => {
      if (!rules) {
        setErrors([])
        setInnerValidateStatus('passed')

        return resolve()
      }

      let filteredRules = rules

      if (triggerName) {
        filteredRules = rules.filter(Boolean).filter((rule) => {
          const ruleConfig = getRuleConfig(rule, formStore)
          const { trigger } = ruleConfig
          if (!trigger) {
            return true
          }
          return toArray(trigger).includes(triggerName)
        })
      }

      validator
        .validate(filteredRules, {
          validateFirst,
          value,
          name,
          label,
          form: formStore,
        })
        .then(() => {
          if (!validateOnly) {
            setErrors([])
            setInnerValidateStatus('passed')
          }

          resolve()
        })
        .catch((errors) => {
          if (!validateOnly) {
            setErrors(errors)
            setInnerValidateStatus('failed')
          }

          reject({
            name: getNamePath(),
            errors,
          })
        })
    })
  })

  return {
    finalRequired: isBoolean(required) ? required : ruleRequired,
    validate,
    finalValidateStatus,
    setInnerValidateStatus,
    errors,
    setErrors,
  }
}

export default useValidator
