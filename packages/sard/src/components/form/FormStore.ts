import FieldStore from './FieldStore'

export type NamePath = string | number

export interface FormInstance {
  submit: () => void
  reset: (name?: NamePath | NamePath[]) => void
  getValue: (name: NamePath) => any
  getValues: () => Record<string, any>
  getError: (name: NamePath) => string[]
  getStatus: () => Record<string, string>
  getFieldStore: (name: NamePath) => FieldStore | void
  setValue: (name: NamePath, value: any) => void
  setValues: (values: Record<string, any>) => void
  validate: (name?: NamePath | NamePath[]) => Promise<any>
  scrollTo: (name: NamePath, alignToTop?: boolean) => void
}

export class FormStore {
  fields: Record<string, FieldStore> = {}
  initialValue: Record<string, any> = {}

  constructor(initialValue = {}) {
    this.initialValue = initialValue
  }

  getForm(): FormInstance {
    return {
      submit: this.submit.bind(this),
      reset: this.reset.bind(this),
      getValue: this.getValue.bind(this),
      getValues: this.getValues.bind(this),
      getError: this.getError.bind(this),
      getStatus: this.getStatus.bind(this),
      getFieldStore: this.getFieldStore.bind(this),
      setValue: this.setValue.bind(this),
      setValues: this.setValues.bind(this),
      validate: this.validate.bind(this),
      scrollTo: this.scrollTo.bind(this),
    }
  }

  submit() {
    null
  }

  reset(name?: NamePath | NamePath[]) {
    null
  }

  getValue(name: NamePath) {
    null
  }

  getValues() {
    const values = {}

    for (const [name, field] of Object.entries(this.fields)) {
      values[name] = field.value
    }

    return values
  }

  getError(name: NamePath) {
    return []
  }

  getStatus(name?: NamePath | NamePath[]) {
    return {}
  }

  getFieldStore(name: NamePath) {
    return null
  }

  setValue(name: NamePath, value: any) {
    null
  }

  setValues(values: Record<string, any>) {
    null
  }

  validate(name?: NamePath | NamePath[]) {
    return new Promise<any>((resolve, reject) => {
      resolve(undefined)
    })
  }

  scrollTo(name: NamePath, alignToTop = true) {
    null
  }

  registerField(field) {
    this.fields[field.name] = field
    const value = this.initialValue[field.name]
    if (value !== undefined) {
      field.value = value
    }
  }

  unregisterField(field) {
    delete this.fields[field.name]
  }
}

export default FormStore
