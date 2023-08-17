import { FC, ReactNode, useEffect, useMemo, useRef, useState } from 'react'
import classNames from 'classnames'
import { View } from '@tarojs/components'
import { Tabs, TabsProps } from '../tabs'
import Icon from '../icon'
import useTranslate from '../locale/useTranslate'
import { useBem, useControllableValue } from '../use'
import { BaseProps } from '../base'
import { isFunction, isNullish } from '../utils'

export interface CascaderFieldNames {
  label?: string
  value?: string
  disabled?: string
  children?: string
}

export interface CascaderOption {
  label?: string
  value?: string | number
  disabled?: boolean
  children?: CascaderOption[]
  [key: PropertyKey]: any
}

export interface CascaderTab {
  options: CascaderOption[]
  selected: CascaderOption | null
}

const defaultFieldNames: CascaderFieldNames = {
  label: 'label',
  value: 'value',
  disabled: 'disabled',
  children: 'children',
}

export interface CascaderProps<T = CascaderOption>
  extends Omit<BaseProps, 'children'>,
    Omit<TabsProps, 'children' | 'onChange'> {
  value?: string | number
  defaultValue?: string | number
  options?: T[]
  fieldNames?: CascaderFieldNames
  placeholder?: string
  onChange?: (value: string | number, selectedOptions: T[]) => void
  onSelect?: (option: T, tabIndex: number) => void
  labelRender?: (option: T, selected: boolean) => ReactNode
  optionTop?: ReactNode | ((tabIndex: number) => ReactNode)
  optionBottom?: ReactNode | ((tabIndex: number) => ReactNode)
  onOutletChange?: (outletValue: any, isManual: boolean) => void
  outletFormatter?: (value: string[]) => string
}

function defaultOutletFormatter(value: string[]) {
  return value.join('/')
}

const defaultOptions = []

export interface CascaderFC extends FC<CascaderProps> {
  hasOutletChange: boolean
}

export const Cascader: CascaderFC = (props) => {
  const [t] = useTranslate('cascader')

  const {
    className,
    value,
    defaultValue,
    options = defaultOptions,
    fieldNames = {},
    placeholder = t('pleaseSelect'),
    onChange,
    onSelect,
    labelRender,
    optionTop,
    optionBottom,
    onOutletChange,
    outletFormatter = defaultOutletFormatter,
    ...restProps
  } = props

  const [bem] = useBem('cascader')

  const fieldkeys = useMemo(
    () => Object.assign({}, defaultFieldNames, fieldNames),
    [fieldNames],
  )

  const [innerValue, setInnerValue] = useControllableValue({
    value,
    defaultValue,
    trigger: onChange,
  })

  const tempValue = useRef(innerValue)

  const [tabsActiveKey, setTabsActiveKey] = useState(0)

  const handleTabsChange = (index: number) => {
    setTabsActiveKey(index)
  }

  const getSelectedOptionsByValue = (
    options: CascaderOption[],
    value: string | number,
  ): CascaderOption[] | undefined => {
    for (const option of options) {
      if (option[fieldkeys.value] === value) {
        return [option]
      }

      if (Array.isArray(option[fieldkeys.children])) {
        const selectedOptions = getSelectedOptionsByValue(
          option[fieldkeys.children],
          value,
        )
        if (selectedOptions) {
          return [option, ...selectedOptions]
        }
      }
    }
  }

  const [tabs, setTabs] = useState<CascaderTab[]>([])

  const updateTabs = () => {
    let nextTabs: CascaderTab[]

    if (tempValue.current === undefined) {
      nextTabs = [
        {
          options,
          selected: null,
        },
      ]
    } else {
      const selectedOptions = getSelectedOptionsByValue(
        options,
        tempValue.current,
      )

      if (selectedOptions) {
        let nextOptions = options

        nextTabs = selectedOptions.map((option) => {
          const tab = {
            options: nextOptions,
            selected: option,
          }

          nextOptions = option.children

          return tab
        })

        if (nextOptions) {
          nextTabs.push({
            options: nextOptions,
            selected: null,
          })
        }
      }
    }

    if (nextTabs) {
      setTabs(nextTabs)
      setTabsActiveKey(nextTabs.length - 1)
    }
  }

  const isLastOption = (option: CascaderOption) => {
    return !Array.isArray(option[fieldkeys.children])
  }

  const handleOptionClick = (option: CascaderOption, tabIndex: number) => {
    if (option.disabled) {
      return
    }

    let nextTabs = tabs

    nextTabs[tabIndex].selected = option

    const selectBack = tabIndex < nextTabs.length - 1

    if (selectBack) {
      nextTabs = nextTabs.slice(0, tabIndex + 1)
    }

    if (!isLastOption(option)) {
      const nextTab = {
        options: option[fieldkeys.children],
        selected: null,
      }

      nextTabs.push(nextTab)

      setTabsActiveKey(nextTabs.length - 1)
    } else {
      // finish
      setTabsActiveKey(tabIndex)
      setInnerValue(
        option[fieldkeys.value],
        nextTabs.map((tab) => tab.selected),
      )
      isManual.current = true
    }

    tempValue.current = option[fieldkeys.value]

    setTabs(nextTabs)

    onSelect?.(option, tabIndex)
  }

  useEffect(() => {
    updateTabs()
  }, [options])

  useEffect(() => {
    if (value !== undefined) {
      if (tabs.some((tab) => tab.selected?.[fieldkeys.value] === value)) {
        return
      }
    }
    tempValue.current = value
    updateTabs()
  }, [value])

  const renderOption = (
    option: CascaderOption,
    selectedOption: CascaderOption | null,
    tabIndex: number,
  ) => {
    const value = option[fieldkeys.value]
    const selected = selectedOption && selectedOption[fieldkeys.value] === value

    return (
      <View
        className={classNames(
          bem.e('option'),
          bem.em('option', 'selected', selected),
          bem.em('option', 'disabled', option[fieldkeys.disabled]),
          bem.em('option', 'interactive', !option[fieldkeys.disabled]),
        )}
        onClick={() => handleOptionClick(option, tabIndex)}
        key={value}
      >
        <View className={bem.e('option-label')}>
          {labelRender
            ? labelRender(option, selected)
            : option[fieldkeys.label]}
        </View>
        <View
          className={classNames(
            bem.e('option-icon'),
            bem.em('option-icon', 'selected', selected),
          )}
        >
          <Icon name="success"></Icon>
        </View>
      </View>
    )
  }

  const renderOptions = (
    options: CascaderOption[],
    selected: CascaderOption | null,
    tabIndex: number,
  ) => {
    return (
      <View className={bem.e('options')}>
        {options.map((option) => {
          return renderOption(option, selected, tabIndex)
        })}
      </View>
    )
  }

  const renderPane = (tab: CascaderTab, tabIndex: number) => {
    const { options, selected } = tab
    const tabLabel = selected ? selected[fieldkeys.label] : placeholder

    return (
      <Tabs.Pane label={tabLabel} key={tabIndex}>
        {isFunction(optionTop) ? optionTop(tabIndex) : optionTop}
        {renderOptions(options, selected, tabIndex)}
        {isFunction(optionBottom) ? optionBottom(tabIndex) : optionBottom}
      </Tabs.Pane>
    )
  }

  const isManual = useRef(false)

  useEffect(() => {
    if (onOutletChange) {
      if (isNullish(innerValue)) {
        onOutletChange('', false)
      } else {
        const lastSelected = tabs[tabs.length - 1]?.selected
        if (lastSelected && isLastOption(lastSelected)) {
          onOutletChange(
            outletFormatter(tabs.map((tab) => tab.selected?.[fieldkeys.label])),
            isManual.current,
          )
          isManual.current = false
        }
      }
    }
  }, [tabs, innerValue])

  return (
    <Tabs
      animated
      scrollCount={0}
      {...restProps}
      activeKey={String(tabsActiveKey)}
      onChange={handleTabsChange}
      className={classNames(bem.b(), className)}
    >
      {tabs.map(renderPane)}
    </Tabs>
  )
}

Cascader.hasOutletChange = true

export default Cascader
