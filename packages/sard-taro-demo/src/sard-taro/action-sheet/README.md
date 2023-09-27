# ActionSheet 动作面板

### 介绍

从底部向上弹出动作菜单。

### 引入

```ts
import { ActionSheet } from 'sard-taro'
```

## 代码演示

### 基础使用

同 `Dialog` 组件，命令式使用 `ActionSheet` 组件需要先放置代理组件。

使用 `itemList` 属性配置动作项。

%(${DEMO_PATH}/action-sheet/demo/Basic.tsx)

### 不使用代理

也可以不通过命令式，而是通过声明组件的方式使用。

使用 `visible` 和 `onVisible` 属性使组件显隐受控

%(${DEMO_PATH}/action-sheet/demo/NoAgent.tsx)

### 显式声明动作项组件

除了使用 `itemList` 属性配置动作项，还可以使用 `ActionSheet.Item` 组件显示声明动作项。

%(${DEMO_PATH}/action-sheet/demo/Explicit.tsx)

### 取消按钮

可以通过配置 `cancel` 属性展示取消按钮。

%(${DEMO_PATH}/action-sheet/demo/Cancel.tsx)

### 自定义操作状态

每个动作项都可以配置 `color`、`disabled` 等属性来展示当前的状态。

%(${DEMO_PATH}/action-sheet/demo/Status.tsx)

### 描述

可以用描述来对动作面板进行解释说明。

%(${DEMO_PATH}/action-sheet/demo/Description.tsx)

## API

### ActionSheetProps

| 属性           | 描述                                                    | 类型                                                                           | 默认值 |
| -------------- | ------------------------------------------------------- | ------------------------------------------------------------------------------ | ------ |
| description    | 动作面板描述说明                                        | React.ReactNode                                                                | -      |
| itemList       | 面板项列表                                              | (string \| ActionSheetItemProps)[]                                             | []     |
| cancel         | 取消按钮文字                                            | React.ReactNode                                                                | -      |
| onSelect       | 点击选项时触发，返回 `Promise`对象可控制其是否隐藏      | (index: number, item: string \| ActionSheetItemProps) => void \| Promise\<any> | -      |
| onCancel       | 点击取消按钮时触发 ，返回 `Promise`对象可控制其是否隐藏 | () => void \| Promise\<any>                                                    | -      |
| onClose        | 点击遮罩时触发 ，返回 `Promise`对象可控制其是否隐藏     | () => void \| Promise\<any>                                                    | -      |
| visible        | 是否显示动作面板                                        | boolean                                                                        | -      |
| defaultVisible | 是否默认显示动作面板                                    | boolean                                                                        | -      |
| onVisible      | 动作面板显隐时触发                                      | (visible: boolean) => void                                                     | -      |
| maskClosable   | 点击遮罩后是否关闭                                      | boolean                                                                        | true   |

### ActionSheetItemProps

| 属性        | 描述           | 类型                         | 默认值 |
| ----------- | -------------- | ---------------------------- | ------ |
| name        | 动作名称       | React.ReactNode              | -      |
| description | 动作的描述说明 | React.ReactNode              | -      |
| color       | 字体颜色       | string                       | -      |
| disabled    | 禁用状态       | boolean                      | false  |
| onClick     | 点击时触发     | (event: ITouchEvent) => void | -      |

### Dialog 类方法

| 名称    | 描述                           | 类型                                                                                              |
| ------- | ------------------------------ | ------------------------------------------------------------------------------------------------- |
| show    | 显示对话框                     | (options: ActionSheetOptions) => Promise<{ index: number; item: string \| ActionSheetItemProps }> |
| hide    | 隐藏指定 `id` 的命令式动作面板 | (id = 'actionSheet') => void                                                                      |
| hideAll | 隐藏所有命令式动作面板         | () => void                                                                                        |

### ActionSheetOptions

`ActionSheetOptions` 继承 `ActionSheetItemProps`，并有以下额外属性：

| 属性 | 描述                                                                            | 类型   | 默认值        |
| ---- | ------------------------------------------------------------------------------- | ------ | ------------- |
| id   | 代理组件的 id，用于命令式操作指定代理；默认会动态生成一个代理，隐藏时会进行销毁 | string | 'actionSheet' |

### ActionSheetAgentProps

`ActionSheetAgentProps` 继承 `ActionSheetProps`，并有以下额外属性：

| 属性 | 描述    | 类型   | 默认值        |
| ---- | ------- | ------ | ------------- |
| id   | 组件 id | string | 'actionSheet' |

## 主题定制

### CSS 变量

%(./index.scss#variables)
