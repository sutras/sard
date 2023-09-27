import { FC, ReactNode, useEffect, useMemo, useRef, useState } from 'react'
import classNames from 'classnames'
import { CustomWrapper, ScrollView, Text, View } from '@tarojs/components'
import { Tabs } from '../tabs'
import Icon from '../icon'
import useTranslate from '../locale/useTranslate'
import { useBem, useControllableValue } from '../use'
import { BaseProps } from '../base'
import { isFunction, isNullish, isRN } from '../utils'
import Pressable from '../pressable'
import Popout, { PopoutProps } from '../popout'
import { Animated, Easing } from '../animated'
import Loading from '../loading'
import CSSTransition from '../transition/CSSTransition'

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
  extends Omit<BaseProps, 'children'> {
  value?: string | number
  defaultValue?: string | number
  onChange?: (value: string | number, selectedOptions: T[]) => void
  options?: T[]
  fieldNames?: CascaderFieldNames
  placeholder?: string
  onSelect?: (option: T, tabIndex: number) => void
  labelRender?: (option: T, selected: boolean | null) => ReactNode
  optionTop?: ReactNode | ((tabIndex: number) => ReactNode)
  optionBottom?: ReactNode | ((tabIndex: number) => ReactNode)
  withPopout?: boolean
  popoutProps?: PopoutProps
  outletFormatter?: (labels: string[]) => string
}

function getSelectedOptionsByValue(
  options: CascaderOption[],
  value: string | number,
  fieldNames: Required<CascaderFieldNames>,
): CascaderOption[] | undefined {
  for (const option of options) {
    if (option[fieldNames.value] === value) {
      return [option]
    }

    if (Array.isArray(option[fieldNames.children])) {
      const selectedOptions = getSelectedOptionsByValue(
        option[fieldNames.children],
        value,
        fieldNames,
      )
      if (selectedOptions) {
        return [option, ...selectedOptions]
      }
    }
  }
}

function defaultOutletFormatter(labels: string[]) {
  return labels.join('/')
}

function outletFormatter(props: CascaderProps, value: string | number) {
  if (isNullish(value)) {
    return ''
  }
  const fieldNames = Object.assign(
    {},
    defaultFieldNames,
    props.fieldNames,
  ) as Required<CascaderFieldNames>

  const selectedOptions = getSelectedOptionsByValue(
    props.options || [],
    value,
    fieldNames,
  )

  if (!selectedOptions) {
    return ''
  }

  const labels = selectedOptions.map((option) => option[fieldNames.label])

  const formatter = props.outletFormatter ?? Cascader.defaultOutletFormatter

  return formatter(labels)
}

const defaultOptions = []

export interface CascaderFC extends FC<CascaderProps> {
  outletFormatter: typeof outletFormatter
  defaultOutletFormatter: typeof defaultOutletFormatter
}

export const Cascader: CascaderFC = (props) => {
  const { t } = useTranslate('cascader')

  const {
    className,
    style,

    value,
    defaultValue,
    onChange,
    options = defaultOptions,
    fieldNames = {},
    placeholder = t('pleaseSelect'),
    onSelect,
    labelRender,
    optionTop,
    optionBottom,
    withPopout,
    popoutProps,
    outletFormatter,
    ...restProps
  } = props

  void outletFormatter

  const [bem] = useBem('cascader')

  const fieldkeys = useMemo(
    () =>
      Object.assign(
        {},
        defaultFieldNames,
        fieldNames,
      ) as Required<CascaderFieldNames>,
    [fieldNames],
  )

  const [innerValue, setInnerValue] = useControllableValue({
    value,
    defaultValue,
    trigger: onChange,
  })

  const tempValue = useRef<string | number | undefined>(innerValue)

  const [tabsActiveKey, setTabsActiveKey] = useState(0)

  const handleTabsChange = (index: number) => {
    setTabsActiveKey(index)
  }

  const [tabs, setTabs] = useState<CascaderTab[]>([])

  const updateTabs = () => {
    let nextTabs: CascaderTab[] | undefined

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
        fieldkeys,
      )

      if (selectedOptions) {
        let nextOptions: CascaderOption[] | undefined = options

        nextTabs = selectedOptions.map((option) => {
          const tab = {
            options: nextOptions as CascaderOption[],
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
    let nextTabs = tabs.slice()

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
      <Pressable key={value} disabled={option[fieldkeys.disabled]}>
        {({ pressed }) => (
          <View
            className={classNames(
              bem.e('option'),
              bem.em('option', 'selected', selected),
              bem.em('option', 'disabled', option[fieldkeys.disabled]),
              bem.em('option', 'pressed', pressed),
            )}
            style={style}
            onClick={() => {
              if (!option.disabled && (!selected || !isLastOption(option))) {
                handleOptionClick(option, tabIndex)
              }
            }}
          >
            <Text
              className={classNames(
                bem.e('option-label'),
                bem.em('option-label', 'selected', selected),
              )}
            >
              {labelRender
                ? labelRender(option, selected)
                : option[fieldkeys.label]}
            </Text>
            <Icon
              name="success"
              className={classNames(
                bem.e('option-icon'),
                bem.em('option-icon', 'selected', selected),
              )}
            />
          </View>
        )}
      </Pressable>
    )
  }

  const renderOptions = (
    options: CascaderOption[],
    selectedOption: CascaderOption | null,
    tabIndex: number,
  ) => {
    return (
      <View className={bem.e('options')}>
        <ScrollView scrollY showScrollbar={false} className={bem.e('scroll')}>
          {options.map((option) => {
            return renderOption(option, selectedOption, tabIndex)
          })}
        </ScrollView>
        <CSSTransition
          in={options.length === 0}
          effect="fade"
          timeout={300}
          appear
          mountOnEnter
          unmountOnExit
          className={bem.e('loading-wrapper')}
        >
          <Loading size={24} className={bem.e('loading')} />
        </CSSTransition>
      </View>
    )
  }

  const renderTabs = () => {
    return (
      <Tabs
        scrollable
        {...restProps}
        activeKey={String(tabsActiveKey)}
        onChange={handleTabsChange}
        className={classNames(bem.b(), className)}
      >
        {tabs.map((tab, tabIndex) => {
          const { selected } = tab
          const tabLabel = selected ? selected[fieldkeys.label] : placeholder

          return <Tabs.Tab key={tabIndex}>{tabLabel}</Tabs.Tab>
        })}
      </Tabs>
    )
  }

  // Animated >>>
  const layoutWidth = useRef(0)
  const firstOnLayout = useRef(false)

  const anim = useMemo(
    () => new Animated.Value(-layoutWidth.current * Number(tabsActiveKey)),
    [],
  )

  const animateTranslateX = () => {
    Animated.timing(anim, {
      toValue: -layoutWidth.current * Number(tabsActiveKey),
      duration: 300,
      easing: Easing.inOut(Easing.quad),
      useNativeDriver: true,
    }).start()
  }

  useEffect(() => {
    isRN && animateTranslateX()
  }, [tabsActiveKey])
  // <<< Animated

  const renderPanes = () => {
    return (
      <View className={classNames(bem.e('container'))}>
        <Animated.View
          className={classNames(bem.e('wrapper'))}
          style={
            {
              ...(isRN
                ? { transform: [{ translateX: anim }] }
                : {
                    transform: `translateX(${-Number(tabsActiveKey) * 100}%)`,
                  }),
            } as any
          }
          {...(isRN
            ? {
                onLayout: (event) => {
                  const width = event.nativeEvent.layout.width
                  if (!firstOnLayout.current) {
                    anim.setValue(-width * Number(tabsActiveKey))
                    firstOnLayout.current = true
                  }
                  layoutWidth.current = width
                },
              }
            : null)}
        >
          {tabs.map((tab, tabIndex) => {
            const { options, selected } = tab

            return (
              <View className={classNames(bem.e('pane'))} key={tabIndex}>
                {isFunction(optionTop) ? optionTop(tabIndex) : optionTop}
                {renderOptions(options, selected, tabIndex)}
                {isFunction(optionBottom)
                  ? optionBottom(tabIndex)
                  : optionBottom}
              </View>
            )
          })}
        </Animated.View>
      </View>
    )
  }

  const renderElement = () => {
    return (
      <CustomWrapper>
        {renderTabs()}
        {renderPanes()}
      </CustomWrapper>
    )
  }

  if (withPopout) {
    return <Popout {...popoutProps}>{renderElement()}</Popout>
  }

  return renderElement()
}

Cascader.outletFormatter = outletFormatter
Cascader.defaultOutletFormatter = defaultOutletFormatter

export default Cascader
