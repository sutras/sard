import { FC, ReactNode, useEffect, useMemo, useState } from 'react'
import classNames from 'classnames'
import { View } from '@tarojs/components'
import { Tabs, TabsProps } from '../tabs'
import Icon from '../icon'
import useTranslate from '../locale/useTranslate'
import { useBem, useControllableValue } from '../use'
import { AnyType, BaseProps } from '../base'
import { isFunction } from '../utils'

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
  [key: PropertyKey]: AnyType
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

export interface CascaderProps
  extends Omit<BaseProps, 'children'>,
    Omit<TabsProps, 'children' | 'onChange'> {
  value?: string | number
  defaultValue?: string | number
  options?: CascaderOption[]
  fieldNames?: CascaderFieldNames
  placeholder?: string
  onChange?: (value: string | number, selectedOptions: CascaderOption[]) => void
  onSelect?: (option: CascaderOption, tabIndex: number) => void
  labelRender?: (option: CascaderOption, selected: boolean) => ReactNode
  optionTop?: ReactNode | ((tabIndex: number) => ReactNode)
  optionBottom?: ReactNode | ((tabIndex: number) => ReactNode)
  onOuterValueChange?: (
    value: string | number,
    selectedOptions: CascaderOption[],
  ) => void
}

export interface CascaderFC extends FC<CascaderProps> {
  canListenOuterValueChange: boolean
}

export const Cascader: CascaderFC = (props) => {
  const [t] = useTranslate('cascader')

  const {
    className,
    value,
    defaultValue,
    options = [],
    fieldNames = {},
    placeholder = t('pleaseSelect'),
    onChange,
    onSelect,
    labelRender,
    optionTop,
    optionBottom,
    onOuterValueChange,
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

  const [tempValue, setTempValue] = useState(innerValue)

  const [tabsActiveKey, setTabsActiveKey] = useState(0)

  const handleTabsChange = (index: number) => {
    setTabsActiveKey(index)
  }

  useEffect(() => {
    if (value !== undefined) {
      onOuterValueChange?.(value, getSelectedOptionsByValue(options, value))
    }
  }, [value])

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

    if (tempValue === undefined) {
      nextTabs = [
        {
          options,
          selected: null,
        },
      ]
    } else {
      const selectedOptions = getSelectedOptionsByValue(options, tempValue)

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

    if (Array.isArray(option[fieldkeys.children])) {
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
    }

    setTempValue(option[fieldkeys.value])

    setTabs(nextTabs)

    onSelect?.(option, tabIndex)
  }

  useEffect(() => {
    updateTabs()
  }, [])

  useEffect(() => {
    updateTabs()
  }, [options])

  useEffect(() => {
    if (value !== undefined) {
      if (tabs.some((tab) => tab.selected?.[fieldkeys.value] === value)) {
        return
      }
    }
    setTempValue(value)
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

  return (
    <Tabs
      animated
      {...restProps}
      scrollCount={0}
      activeKey={String(tabsActiveKey)}
      onChange={handleTabsChange}
      className={classNames(bem.b(), className)}
    >
      {tabs.map(renderPane)}
    </Tabs>
  )
}

Cascader.canListenOuterValueChange = true

export default Cascader
