import taro from '@tarojs/taro'
import { CellGroup, Cell } from 'sard-taro'
import { View } from '@tarojs/components'
import './index.scss'

import { kebabCase } from '@/utils'

const menus = [
  {
    title: '基础组件',
    children: [
      {
        title: 'Button 按钮',
        name: 'Button',
      },
      {
        title: 'Icon 图标',
        name: 'Icon',
      },
      {
        title: 'Style 样式',
        name: 'Style',
      },
    ],
  },
  {
    title: '布局',
    children: [
      {
        title: 'Mesh 宫格',
        name: 'Mesh',
      },
      {
        title: 'Grid 栅格',
        name: 'Grid',
      },
    ],
  },
  {
    title: '表单组件',
    children: [
      {
        title: 'Calendar 日历',
        name: 'Calendar',
      },
      {
        title: 'Cascader 级联选择',
        name: 'Cascader',
      },
      {
        title: 'Checkbox 复选框',
        name: 'Checkbox',
      },
      {
        title: 'DatetimePicker 日期时间选择器',
        name: 'DatetimePicker',
      },
      {
        title: 'Form 表单',
        name: 'Form',
      },
      {
        title: 'Input 输入框',
        name: 'Input',
      },
      {
        title: 'NumberKeyboard 数字键盘',
        name: 'NumberKeyboard',
      },
      {
        title: 'PasswordInput 密码输入框',
        name: 'PasswordInput',
      },
      {
        title: 'Picker 选择器',
        name: 'Picker',
      },
      {
        title: 'Radio 单选按钮',
        name: 'Radio',
      },
      {
        title: 'Rate 评分',
        name: 'Rate',
      },
      {
        title: 'Search 搜索',
        name: 'Search',
      },
      {
        title: 'Slider 滑动器选择器',
        name: 'Slider',
      },
      {
        title: 'Stepper 步进器',
        name: 'Stepper',
      },
      {
        title: 'Switch 开关',
        name: 'Switch',
      },
      {
        title: 'Upload 上传',
        name: 'Upload',
      },
    ],
  },
  {
    title: '数据展示',
    children: [
      {
        title: 'Avatar 头像',
        name: 'Avatar',
      },
      {
        title: 'Accordion 手风琴',
        name: 'Accordion',
      },
      {
        title: 'Badge 徽标',
        name: 'Badge',
      },
      {
        title: 'Cell 单元格',
        name: 'Cell',
      },
      {
        title: 'Collapse 折叠',
        name: 'Collapse',
      },
      {
        title: 'CountDown 倒计时',
        name: 'CountDown',
      },
      {
        title: 'Empty 空状态',
        name: 'Empty',
      },
      {
        title: 'NoticeBar 公告栏',
        name: 'NoticeBar',
      },
      {
        title: 'Popout 弹出框',
        name: 'Popout',
      },
      {
        title: 'Popover 气泡弹出框',
        name: 'Popover',
      },
      {
        title: 'Popup 弹出层',
        name: 'Popup',
      },
      {
        title: 'ProgressBar 条形进度条',
        name: 'ProgressBar',
      },
      {
        title: 'ProgressCircle 环形进度条',
        name: 'ProgressCircle',
      },
      {
        title: 'Swiper 滑块视图容器',
        name: 'Swiper',
      },
      {
        title: 'Tag 标签',
        name: 'Tag',
      },
    ],
  },
  {
    title: '导航组件',
    children: [
      {
        title: 'Dropdown 下拉菜单',
        name: 'Dropdown',
      },
      {
        title: 'IndexBar 索引栏',
        name: 'IndexBar',
      },
      {
        title: 'Navbar 头部导航',
        name: 'Navbar',
      },
      {
        title: 'Pagination 分页',
        name: 'Pagination',
      },
      {
        title: 'Steps 步骤条',
        name: 'Steps',
      },
      {
        title: 'Tabbar 标签栏',
        name: 'Tabbar',
      },
      {
        title: 'Tabs 标签页',
        name: 'Tabs',
      },
    ],
  },
  {
    title: '反馈组件',
    children: [
      {
        title: 'ActionSheet 动作面板',
        name: 'ActionSheet',
      },
      {
        title: 'Dialog 对话框',
        name: 'Dialog',
      },
      {
        title: 'Loading 加载',
        name: 'Loading',
      },
      {
        title: 'Notify 通知栏',
        name: 'Notify',
      },
      {
        title: 'Result 结果',
        name: 'Result',
      },
      {
        title: 'ShareSheet 分享面板',
        name: 'ShareSheet',
      },
      {
        title: 'Skeleton 骨架屏',
        name: 'Skeleton',
      },
      {
        title: 'Toast 轻提示',
        name: 'Toast',
      },
    ],
  },
]

export default () => {
  const navigateTo = (name: string) => {
    taro.navigateTo({
      url: `/packageA/pages/${name}/index`,
    })
  }

  return (
    <View className="menu">
      {menus.map((group) => {
        return (
          <CellGroup
            key={group.title}
            title={group.title}
            card
            footerStyle={{ flex: 'none' }}
            style={{ marginBottom: 20 }}
          >
            {group.children.map((comp) => {
              return (
                <Cell
                  key={comp.title}
                  title={comp.title}
                  linkable
                  onClick={() => navigateTo(kebabCase(comp.name))}
                ></Cell>
              )
            })}
          </CellGroup>
        )
      })}
    </View>
  )
}
