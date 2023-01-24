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
import { Tabs, TabsProps } from '../tabs'
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

  const fieldkeys = Object.assign({}, defaultFieldNames, fieldNames)

  const completed = useRef(false)

  const [innerValue, setInnerValue] = useState(() => {
    return value ?? defaultValue ?? []
  })

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

  useEffect(() => {
    if (completed.current) {
      completed.current = false
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
  }, [innerValue])

  // 受控
  useEffect(() => {
    if (value != null) {
      setInnerValue(value)
    }
  }, [value])

  const [activeTabName, setActiveTabName] = useState(0)
  const handleTagChange = (index: number) => {
    setActiveTabName(index)
  }

  const handleOptionClick = (
    option: CascaderOption,
    columnIndex: number,
    selected: boolean,
  ) => {
    const hasChildren =
      Array.isArray(option.children) && option.children.length > 0

    if (!selected) {
      setInnerValue(
        innerValue.slice(0, columnIndex).concat(option[fieldkeys.value]),
      )
      if (!hasChildren) {
        completed.current = true
      }
      onSelect?.(option, columnIndex)
    }

    if (hasChildren) {
      setActiveTabName(columnIndex + 1)
    }
  }

  return (
    <div className={classNames('s-cascader', className)} {...restProps}>
      <Tabs
        {...Object.assign({ animated: true }, tabsProps)}
        scrollCount={0}
        activeKey={activeTabName}
        onChange={handleTagChange}
      >
        {(() => {
          return optionsColumns.map((options, columnIndex) => {
            const selectedValue = innerValue[columnIndex]
            const selectedOption =
              selectedValue != null
                ? options.find(
                    (option) => option[fieldkeys.value] === selectedValue,
                  )
                : undefined
            return (
              <Tabs.Pane
                label={
                  selectedOption == null
                    ? placeholder
                    : selectedOption[fieldkeys.label]
                }
                labelClass={classNames('s-cascader-label', {
                  's-cascader-label-unselected': selectedOption == null,
                })}
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
          })
        })()}
      </Tabs>
    </div>
  )
}

export default Cascader
