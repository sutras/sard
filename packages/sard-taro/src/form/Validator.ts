import {
  chainSelect,
  isBoolean,
  isEmptyValue,
  isFunction,
  isNumber,
  isString,
  toArray,
} from '../utils'
import { ReactNode } from 'react'
import { FormStore } from './createFormStore'

export interface ValidateMessages {
  default?: string
  required?: string
  enum?: string
  whitespace?: string
  date?: {
    format?: string
    parse?: string
    invalid?: string
  }
  types?: {
    string?: string
    function?: string
    array?: string
    object?: string
    number?: string
    date?: string
    boolean?: string
    integer?: string
    float?: string
    regexp?: string
    email?: string
    url?: string
    hex?: string
  }
  string?: {
    len?: string
    min?: string
    max?: string
    range?: string
  }
  number?: {
    len?: string
    min?: string
    max?: string
    range?: string
  }
  array?: {
    len?: string
    min?: string
    max?: string
    range?: string
  }
  pattern?: {
    mismatch?: string
  }
}

export type ValidatorType =
  | 'string'
  | 'number'
  | 'boolean'
  | 'function'
  | 'regexp'
  | 'integer'
  | 'float'
  | 'array'
  | 'object'
  | 'enum'
  | 'date'
  | 'url'
  | 'hex'
  | 'email'

export interface RuleConfig {
  validator?: (value: any, rule: Rule) => Promise<any> | boolean | string
  pattern?: RegExp
  message?: string | (() => string)
  trigger?: string | string[]
  transform?: (value: any) => any
  type?: ValidatorType
  enum?: string
  len?: number
  max?: number
  min?: number
  required?: boolean
  whitespace?: boolean
}

export type Rule = RuleConfig | ((form: FormStore) => RuleConfig)

export interface Regulation {
  [name: string]: Rule | Rule[]
}

export interface ValidateOptions {
  validateFirst?: boolean
  value?: any
  name?: string | number | (string | number)[]
  label?: ReactNode
  form?: FormStore
  triggerName?: string | string[]
}

export function getRuleConfig(rule: Rule, form: FormStore) {
  if (isFunction(rule)) {
    return rule(form)
  }
  return rule
}

function getMessage(message: RuleConfig['message']) {
  return isFunction(message) ? message() : message
}

function handleRange(len: number, type: string, rule: RuleConfig) {
  if (isNumber(rule.len)) {
    return len !== rule.len ? `${type}.len` : true
  } else if (isNumber(rule.min) && typeof isNumber(rule.max)) {
    return len < rule.min || len > rule.max ? `${type}.range` : true
  } else if (isNumber(rule.min)) {
    return len < rule.min ? `${type}.min` : true
  } else if (isNumber(rule.max)) {
    return len > rule.max ? `${type}.max` : true
  } else {
    return true
  }
}

const typeStrategies = {
  string(value: any, rule: RuleConfig) {
    if (isString(value)) {
      return handleRange(value.length, 'string', rule)
    } else {
      return false
    }
  },
  number(value: any, rule: RuleConfig) {
    if (isNumber(value)) {
      return handleRange(value, 'number', rule)
    } else {
      return false
    }
  },
  integer(value: any, rule: RuleConfig) {
    if (Number.isInteger(value)) {
      return handleRange(value as number, 'number', rule)
    } else {
      return false
    }
  },
  float(value: any, rule: RuleConfig) {
    if (Number.isFinite(value) && (value as number) % 1 !== 0) {
      return handleRange(value as number, 'number', rule)
    } else {
      return false
    }
  },
  boolean(value: any) {
    return isBoolean(value)
  },
  function(value: any) {
    return isFunction(value)
  },
  regexp(value: any) {
    if (isString(value)) {
      try {
        new RegExp(value)
        return true
      } catch {
        return false
      }
    } else {
      return value instanceof RegExp
    }
  },
  array(value: any, rule: RuleConfig) {
    if (Array.isArray(value)) {
      return handleRange(value.length, 'number', rule)
    } else {
      return false
    }
  },
  object(value: any) {
    return value && typeof value === 'object' && !Array.isArray(value)
  },
  enum(value: any, enums: any[]) {
    return enums.includes(value) ? true : 'enum'
  },
  date(value: any) {
    return value instanceof Date
  },
  url(value: any) {
    return isString(value) && /url/.test(value)
  },
  hex(value: any) {
    return isString(value) && /^#(?:[0-9A-F]{6}|[0-9A-F]{3})$/i.test(value)
  },
  email(value: any) {
    return (
      isString(value) &&
      /^([a-zA-Z0-9_\-.]+)@([a-zA-Z0-9-]+\.)+([a-zA-Z]{2,})$/.test(value)
    )
  },
}

export class Validator {
  regulation: Regulation

  validateMessages: ValidateMessages

  constructor(regulation: Regulation) {
    this.regulation = regulation
  }

  setValidateMessages(validateMessages: ValidateMessages) {
    this.validateMessages = validateMessages
  }

  validateInternal(type: string, value: any, rule: Rule) {
    return new Promise<void>((resolve, reject) => {
      const result = typeStrategies[type]?.(value, rule)
      if (result === true) {
        resolve()
      } else {
        reject(
          chainSelect(
            this.validateMessages,
            isString(result) ? result : `types.${type}`,
          ),
        )
      }
    })
  }

  validateRule(value: any, rule: RuleConfig) {
    return new Promise<void>((resolve, reject) => {
      const handleReject = (error: any) => {
        reject({
          error,
          rule,
        })
      }

      // empty
      const isEmpty = isEmptyValue(value, rule.whitespace)

      if (isEmpty && !rule.validator) {
        if (rule.required) {
          handleReject(
            getMessage(rule.message) ||
              chainSelect(this.validateMessages, 'required'),
          )
        } else {
          resolve()
        }
        return
      }

      // validator
      if (rule.validator) {
        const result = rule.validator(value, rule)
        if (result instanceof Promise) {
          result
            .then(() => {
              resolve()
            })
            .catch((error) => {
              handleReject(error)
            })
        } else if (result === true) {
          resolve()
        } else if (isString(result)) {
          handleReject(result)
        } else {
          handleReject(getMessage(rule.message))
        }
        return
      }

      // pattern
      if (rule.pattern instanceof RegExp) {
        const result = rule.pattern.test(String(value))
        if (result) {
          resolve()
        } else {
          handleReject(
            getMessage(rule.message) ||
              chainSelect(this.validateMessages, 'pattern.mismatch'),
          )
        }
        return
      }

      // internal type
      let ruleType = rule.type
      if (
        !ruleType &&
        (isNumber(rule.min) || isNumber(rule.max) || isNumber(rule.len))
      ) {
        ruleType = 'string'
      }
      if (Object.keys(typeStrategies).includes(ruleType)) {
        this.validateInternal(ruleType, value, rule)
          .then(() => {
            resolve()
          })
          .catch((err) => {
            handleReject(getMessage(rule.message) || err)
          })
        return
      }

      resolve()
    })
  }

  validate(rules: Rule[], options: ValidateOptions = {}) {
    const { validateFirst, value, form, triggerName } = options

    let filteredRules = rules

    if (triggerName) {
      filteredRules = rules.filter(Boolean).filter((rule) => {
        const ruleConfig = getRuleConfig(rule, form)
        const { trigger } = ruleConfig
        if (!trigger) {
          return true
        }
        return toArray(trigger).includes(triggerName)
      })
    }

    return new Promise<void>((resolve, reject) => {
      if (validateFirst) {
        Promise.all(
          filteredRules.map((rule) => {
            return this.validateRule(value, getRuleConfig(rule, form))
          }),
        )
          .then(() => {
            resolve()
          })
          .catch(({ error, rule }) => {
            reject([this.replaceSymbol(error, rule, options)])
          })
      } else {
        Promise.allSettled(
          filteredRules.map((rule) => {
            return this.validateRule(value, getRuleConfig(rule, form))
          }),
        ).then((values) => {
          const rejected = values.filter(({ status }) => {
            return status === 'rejected'
          })

          if (rejected.length === 0) {
            resolve()
          } else {
            reject(
              rejected.map((result) => {
                if (result.status === 'rejected') {
                  const { error, rule } = result.reason
                  return this.replaceSymbol(error, rule, options)
                }
              }),
            )
          }
        })
      }
    })
  }

  replaceSymbol(
    string: string,
    rule: RuleConfig,
    options: ValidateOptions = {},
  ) {
    const label = isString(options.label) ? options.label : String(options.name)

    const matches = {
      '${min}': rule.min,
      '${max}': rule.max,
      '${len}': rule.len,
      '${enum}': rule.enum,
      '${label}': label,
      '${value}': options.value,
      '${type}': rule.type,
      '${pattern}': rule.pattern?.toString(),
    }

    const regexp = /\$\{(?:min|max|len|enum|label|value|type|pattern)\}/g
    return String(string).replace(regexp, (m) => {
      return matches[m] ?? ''
    })
  }
}

export default Validator
