import { AnyType } from '../base'
import { toArray, ScrollIntoViewOptions } from '../utils'
import Validator, { ValidateMessages } from './Validator'

export const HOOK_KEY = Symbol('HOOK_KEY')

export type NamePath = string | number

export type ErrorInfo = {
  errors: string[]
  name: string
  value: AnyType
}

export type FieldValidateStatus = 'passed' | 'failed' | 'unvalidated'

export interface FormStoreCallbacks {
  onSuccess?: (values: Record<string, AnyType>) => void
  onFail?: (errorInfo: ErrorInfo[]) => void
  onReset?: () => void
}

export interface FieldInstance {
  getName: () => string
  getValue: () => AnyType
  setValue: (value: AnyType) => void
  reset: () => void
  validate: () => Promise<void>
  scrollToError: (options: ScrollIntoViewOptions) => void
  getErrors: () => null | ErrorInfo
  getValidateStatus: () => FieldValidateStatus
}

export interface FormInstance {
  submit: () => void
  reset: (name?: NamePath | NamePath[]) => void
  getValue: (name: NamePath) => AnyType
  getValues: () => Record<string, AnyType>
  getErrors: (name: NamePath) => string[]
  getValidateStatus: () => { name: string; status: FieldValidateStatus }[]
  setValue: (name: NamePath, value: AnyType) => void
  setValues: (values: Record<string, AnyType>) => void
  validate: (name?: NamePath | NamePath[]) => Promise<AnyType>
  scrollTo: (name: NamePath, options?: ScrollIntoViewOptions) => void

  getInternalHooks: (hookKey: symbol) => {
    setInitialValues: (
      initialValues: Record<string, AnyType>,
      init: boolean,
    ) => void
    setCallbacks: (callbacks: FormStoreCallbacks) => void
    registerField: (fieldInstance: FieldInstance) => void
    unregisterField: (fieldInstance: FieldInstance) => void
    getInitialValues: () => Record<string, AnyType>
    setValidateMessages: (validateMessages: ValidateMessages) => void
    validator: Validator
  }
}

export class FormStore {
  fields: FieldInstance[] = []
  initialValues: Record<string, AnyType> = {}
  callbacks: FormStoreCallbacks = {}

  validator: Validator

  constructor() {
    this.validator = new Validator({})
  }

  private getFieldsByName(name?: NamePath | NamePath[]) {
    const mergedName = toArray(name).filter(Boolean)

    return name
      ? this.fields.filter((field) => mergedName.includes(field.getName()))
      : this.fields
  }

  submit() {
    return this.validate()
      .then(() => {
        this.callbacks.onSuccess?.(this.getValues())
      })
      .catch((errors: ErrorInfo[]) => {
        this.callbacks.onFail?.(errors)
      })
  }

  reset(name?: NamePath | NamePath[]) {
    this.getFieldsByName(name).forEach((field) => {
      field.reset()
    })

    if (!name) {
      this.callbacks.onReset?.()
    }
  }

  getValue(name: NamePath) {
    this.fields.find((field) => field.getName() === name)?.getValue()
  }

  getValues() {
    const values = {}

    this.fields.forEach((field) => {
      const name = field.getName()
      if (name) {
        values[name] = field.getValue()
      }
    })

    return values
  }

  getErrors(name?: NamePath | NamePath[]) {
    return this.getFieldsByName(name)
      .map((field) => {
        return field.getErrors()
      })
      .filter(Boolean)
  }

  getValidateStatus(name?: NamePath | NamePath[]) {
    return this.getFieldsByName(name).map((field) => {
      return {
        name: field.getName(),
        status: field.getValidateStatus(),
      }
    })
  }

  setValue(name: NamePath, value: AnyType) {
    this.fields.forEach((field) => {
      const fieldName = field.getName()
      if (fieldName === name) {
        field.setValue(value)
      }
    })
  }

  setValues(values: Record<string, AnyType>) {
    for (const [name, value] of Object.entries(values)) {
      this.setValue(name, value)
    }
  }

  validate(name?: NamePath | NamePath[]) {
    return new Promise<AnyType>((resolve, reject) => {
      Promise.allSettled(
        this.getFieldsByName(name).map((field) => field.validate()),
      ).then((values) => {
        const rejected = values.filter(({ status }) => status === 'rejected')

        if (rejected.length === 0) {
          resolve(
            values.reduce(
              (obj, { value }: AnyType) => (
                (obj[value.name] = value.value), obj
              ),
              {},
            ),
          )
        } else {
          reject(
            rejected.map(({ reason: { name, value, errors } }: AnyType) => ({
              name,
              value,
              errors,
            })),
          )
        }
      })
    })
  }

  scrollTo(name: NamePath, options?: ScrollIntoViewOptions) {
    this.fields
      .find((field) => field.getName() === name)
      ?.scrollToError(options)
  }

  registerField(fieldInstance: FieldInstance) {
    if (!this.fields.includes(fieldInstance)) {
      this.fields.push(fieldInstance)
    }
  }

  unregisterField(fieldInstance: FieldInstance) {
    this.fields = this.fields.filter((field) => field !== fieldInstance)
  }

  private setInitialValues(
    initialValues: Record<string, AnyType> = {},
    init: boolean,
  ) {
    if (init) {
      this.initialValues = initialValues
      this.setValues(initialValues)
    }
  }

  private getInitialValues() {
    return this.initialValues
  }

  private setCallbacks(callbacks: FormStoreCallbacks) {
    this.callbacks = callbacks
  }

  private setValidateMessages(validateMessages: ValidateMessages) {
    this.validator.setValidateMessages(validateMessages)
  }

  getForm(): FormInstance {
    return {
      submit: this.submit.bind(this),
      reset: this.reset.bind(this),
      getValue: this.getValue.bind(this),
      getValues: this.getValues.bind(this),
      getErrors: this.getErrors.bind(this),
      getValidateStatus: this.getValidateStatus.bind(this),
      setValue: this.setValue.bind(this),
      setValues: this.setValues.bind(this),
      validate: this.validate.bind(this),
      scrollTo: this.scrollTo.bind(this),

      getInternalHooks: (hookKey: symbol) => {
        if (hookKey === HOOK_KEY) {
          return {
            setInitialValues: this.setInitialValues.bind(this),
            setCallbacks: this.setCallbacks.bind(this),
            registerField: this.registerField.bind(this),
            unregisterField: this.unregisterField.bind(this),
            getInitialValues: this.getInitialValues.bind(this),
            setValidateMessages: this.setValidateMessages.bind(this),
            validator: this.validator,
          }
        }
      },
    }
  }
}

export default FormStore
