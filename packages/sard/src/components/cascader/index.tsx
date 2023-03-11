import {
  CSSProperties,
  FC,
  ReactNode,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import classNames from 'classnames'
import { CommonComponentProps } from '../../utils/types'
import { Tabs, TabsProps, TabsRef } from '../tabs'
import Icon from '../icon'

export interface CascaderOption {
  label?: string
  value?: any
  disabled?: boolean
  children?: CascaderOption[]
  [p: string]: any
}

export interface CascaderFieldNames {
  label?: string
  value?: string
  disabled?: string
  children?: string
}

const defaultFieldNames = {
  label: 'label',
  value: 'value',
  disabled: 'disabled',
  children: 'children',
}

export interface CascaderProps extends CommonComponentProps {
  className?: string
  style?: CSSProperties
  children?: ReactNode
  value?: any[]
  defaultValue?: any[]
  options?: CascaderOption[]
  fieldNames?: CascaderFieldNames
  placeholder?: string
  tabsProps?: TabsProps
  onChange?: (value: any[], options: CascaderOption[]) => void
  onSelect?: (option: CascaderOption, columnIndex: number) => void
  labelRender?: (option: CascaderOption, selected: boolean) => ReactNode
}

export const Cascader: FC<CascaderProps> = (props) => {
  const {
    className,
    children,
    value,
    defaultValue,
    options = [],
    fieldNames = {},
    placeholder = '请选择',
    tabsProps,
    onChange,
    onSelect,
    labelRender,
    ...restProps
  } = props

  const fieldkeys = useMemo(
    () => Object.assign({}, defaultFieldNames, fieldNames),
    [fieldNames],
  )

  const completed = useRef(false)

  const [innerValue, setInnerValue] = useState(() => {
    return value ?? defaultValue ?? []
  })

  const tabRef = useRef<TabsRef>()

  const optionsColumns = useMemo<CascaderOption[][]>(() => {
    const columns = [options]
    let siblings = options
    innerValue.some((item) => {
      const option = siblings.find((node) => node[fieldkeys.value] === item)
      const children = option?.[fieldkeys.children]
      if (Array.isArray(children) && children.length > 0) {
        siblings = children
        columns.push(children)
      } else {
        return true
      }
    })

    return columns
  }, [innerValue])

  // 受控
  useEffect(() => {
    if (value !== undefined) {
      setInnerValue(value)
    }
  }, [value])

  const handleChange = () => {
    onChange?.(
      innerValue,
      innerValue.map(
        (value, index) =>
          optionsColumns[index].find(
            (option) => option[fieldkeys.value] === value,
          ) as CascaderOption,
      ),
    )
  }

  useEffect(() => {
    if (completed.current) {
      handleChange()
    }
  }, [innerValue])

  useEffect(() => {
    setActiveKey(Math.min(innerValue.length, optionsColumns.length - 1))
    tabRef.current?.setInkbarStyle()
  }, [innerValue, optionsColumns])

  const [activeKey, setActiveKey] = useState(0)
  const handleTagChange = (index: number) => {
    setActiveKey(index)
  }

  const handleOptionClick = (
    option: CascaderOption,
    columnIndex: number,
    selected: boolean,
  ) => {
    completed.current =
      !Array.isArray(option.children) || option.children.length === 0

    if (!selected) {
      setInnerValue(
        innerValue.slice(0, columnIndex).concat(option[fieldkeys.value]),
      )
    }

    onSelect?.(option, columnIndex)

    if (selected && completed.current) {
      handleChange()
    }

    if (!completed.current) {
      setActiveKey(columnIndex + 1)
    }
  }

  return (
    <div className={classNames('s-cascader', className)} {...restProps}>
      <Tabs
        animated
        {...tabsProps}
        ref={tabRef}
        scrollCount={0}
        activeKey={String(activeKey)}
        onChange={handleTagChange}
      >
        {optionsColumns.map((options, columnIndex) => {
          const selectedValue = innerValue[columnIndex]
          const selectedOption =
            selectedValue !== undefined
              ? options.find(
                  (option) => option[fieldkeys.value] === selectedValue,
                )
              : undefined
          return (
            <Tabs.Pane
              label={
                selectedOption === undefined
                  ? placeholder
                  : selectedOption[fieldkeys.label]
              }
              key={columnIndex}
            >
              <div className="s-cascader-options">
                {options.map((option) => {
                  const value = option[fieldkeys.value]
                  const selected = selectedValue === value
                  return (
                    <div
                      className={classNames('s-cascader-option', {
                        's-cascader-option-selected': selected,
                      })}
                      onClick={() =>
                        handleOptionClick(option, columnIndex, selected)
                      }
                      key={value}
                    >
                      <div className="s-cascader-option-label">
                        {labelRender
                          ? labelRender(option, selected)
                          : option[fieldkeys.label]}
                      </div>
                      <div className="s-cascader-option-icon">
                        <Icon prefix="si" name="success"></Icon>
                      </div>
                    </div>
                  )
                })}
              </div>
            </Tabs.Pane>
          )
        })}
      </Tabs>
    </div>
  )
}

export default Cascader
