import { markRaw, provide, reactive, toRef, watch, watchPostEffect } from 'vue'
import { arrayEqual, noop, toArray } from '../../utils'
import {
  type FormItemContext,
  type FieldName,
  type FieldValidateError,
  type FormProps,
  formContextKey,
  type FormExpose,
} from './common'
import { Validator } from './Validator'
import { useTranslateWithPrefix } from '../../locale'

export function useForm(props: FormProps) {
  const getMatchedField = (name: FieldName) => {
    return fields.find((field) => {
      return arrayEqual(toArray(field.name), toArray(name))
    })
  }

  const getMatchedFields = (nameList?: FieldName[]) => {
    let matchedFields = fields

    if (nameList && nameList.length > 0) {
      matchedFields = fields.filter((field) => {
        return nameList.findIndex((name) => arrayEqual(toArray(field.name), toArray(name))) > -1
      })
    }

    return matchedFields
  }

  const validate = async (nameList?: FieldName[]) => {
    const settledResult = await Promise.allSettled(
      getMatchedFields(nameList).map((field) => {
        return field.validate()
      }),
    )
    const rejectedResult = settledResult.filter((result) => {
      return result.status === 'rejected'
    })

    if (rejectedResult.length > 0) {
      const errors: FieldValidateError[] = rejectedResult.map((result) => {
        return (result as any).reason
      })

      if (props.scrollToFirstError) {
        scrollToField(errors[0].name)
      }

      throw errors
    }
  }

  const reset = async (nameList?: FieldName[]) => {
    await Promise.allSettled(
      getMatchedFields(nameList).map((field) => {
        return field.reset()
      }),
    )
  }

  const clearValidate = (nameList?: FieldName[]) => {
    getMatchedFields(nameList).forEach((field) => {
      field.clearValidate()
    })
  }

  const scrollToField = (name: FieldName) => {
    getMatchedField(name)?.scrollToField()
  }

  const fields: FormItemContext[] = []

  const validator = markRaw(new Validator())

  const { select } = useTranslateWithPrefix('form.defaultValidateMessages')

  watchPostEffect(() => {
    validator.setValidateMessages(select())
  })

  watch(
    () => props.rules,
    () => {
      if (props.validateOnRuleChange) {
        validate().catch(noop)
      }
    },
    { deep: true, flush: 'post' },
  )

  // 导出上下文
  const formContext = reactive({
    model: toRef(() => props.model),
    rules: toRef(() => props.rules),
    validateTrigger: toRef(() => props.validateTrigger),
    direction: toRef(() => props.direction),
    labelWidth: toRef(() => props.labelWidth),
    labelAlign: toRef(() => props.labelAlign),
    labelValign: toRef(() => props.labelValign),
    starPosition: toRef(() => props.starPosition),
    contentPosition: toRef(() => props.contentPosition),
    hideStar: toRef(() => props.hideStar),
    showError: toRef(() => props.showError),
    scrollIntoViewOptions: toRef(() => props.scrollIntoViewOptions),
    disabled: toRef(() => props.disabled),
    readonly: toRef(() => props.readonly),
    addField: (formItemContext: FormItemContext) => {
      fields.push(formItemContext)
    },
    removeField: (formItemContext: FormItemContext) => {
      const index = fields.indexOf(formItemContext)
      if (index !== -1) {
        fields.splice(index, 1)
      }
    },
    validator,
  })

  provide(formContextKey, formContext)

  const expose: FormExpose = {
    validate,
    reset,
    clearValidate,
    scrollToField,
  }

  return {
    expose,
    formContext,
  }
}
