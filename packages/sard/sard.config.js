export default {
  name: 'Sard',
  styles: ['assets/index.scss', 'src/components/index.scss'],
  base: '/sard/',
  publicDir: 'public',
  buildSite: {
    outDir: 'docs',
  },
  build: {
    entry: 'src/index.ts',
    cssEntry: 'src/style.ts',
    name: 'Sard',
    fileName: 'sard',
    outDir: 'dist',
  },
  alias: [
    {
      find: /^sard$/,
      replacement: '../../../index.ts',
    },
  ],
  site: {
    title: 'Sard',
    logo: 'logo.svg',
    seo: {
      title: 'Sard | React Component',
      description: 'Sard | React 移动端 UI 组件库',
    },
    themeDataName: 'sTheme',
    routes: [
      {
        title: '首页',
        path: '/',
        filePath: 'markdown/home.md',
      },
      {
        title: '组件',
        path: '/components',
        index: 'button',
        children: [
          {
            type: 'group',
            title: '基础组件',
            items: [
              {
                title: 'Button 按钮',
                path: 'button',
                filePath: 'src/components/button',
              },
              {
                title: 'icon 图标',
                path: 'icon',
                filePath: 'src/components/icon',
              },
              {
                title: 'style 样式',
                path: 'style',
                filePath: 'src/components/style',
              },
            ],
          },
          {
            type: 'group',
            title: '布局',
            items: [
              {
                title: 'grid 栅格',
                path: 'grid',
                filePath: 'src/components/grid',
              },
            ],
          },
          {
            type: 'group',
            title: '表单组件',
            items: [
              {
                title: 'Calendar 日历',
                path: 'calendar',
                filePath: 'src/components/calendar',
              },
              {
                title: 'Cascader 级联选择',
                path: 'cascader',
                filePath: 'src/components/cascader',
              },
              {
                title: 'Checkbox 复选框',
                path: 'checkbox',
                filePath: 'src/components/checkbox',
              },
              {
                title: 'DatetimePicker 日期时间选择器',
                path: 'datetimePicker',
                filePath: 'src/components/datetime-picker',
              },
              {
                title: 'Form 表单',
                path: 'form',
                filePath: 'src/components/form',
              },
              {
                title: 'Input 输入框',
                path: 'input',
                filePath: 'src/components/input',
              },
              {
                title: 'NumberKeyboard 数字键盘',
                path: 'numberKeyboard',
                filePath: 'src/components/number-keyboard',
              },
              {
                title: 'PasswordInput 密码输入框',
                path: 'passwordInput',
                filePath: 'src/components/password-input',
              },
              {
                title: 'Picker 选择器',
                path: 'picker',
                filePath: 'src/components/picker',
              },
              {
                title: 'Radio 单选按钮',
                path: 'radio',
                filePath: 'src/components/radio',
              },
              {
                title: 'Rate 评分',
                path: 'rate',
                filePath: 'src/components/rate',
              },
              {
                title: 'Slider 滑动器选择器',
                path: 'slider',
                filePath: 'src/components/slider',
              },
              {
                title: 'Stepper 步进器',
                path: 'stepper',
                filePath: 'src/components/stepper',
              },
              {
                title: 'Switch 开关',
                path: 'switch',
                filePath: 'src/components/switch',
              },
              {
                title: 'Upload 上传',
                path: 'upload',
                filePath: 'src/components/upload',
              },
            ],
          },
          {
            type: 'group',
            title: '数据展示',
            items: [
              {
                title: 'Avatar 头像',
                path: 'avatar',
                filePath: 'src/components/avatar',
              },
              {
                title: 'Accordion 手风琴',
                path: 'accordion',
                filePath: 'src/components/accordion',
              },
              {
                title: 'Badge 徽标',
                path: 'badge',
                filePath: 'src/components/badge',
              },
              {
                title: 'Cell 单元格',
                path: 'cell',
                filePath: 'src/components/cell',
              },
              {
                title: 'CountDown 倒计时',
                path: 'countDown',
                filePath: 'src/components/count-down',
              },
              {
                title: 'Empty 空状态',
                path: 'empty',
                filePath: 'src/components/empty',
              },
              {
                title: 'ImagePreview 图片预览 ',
                path: 'imagePreview',
                filePath: 'src/components/image-preview',
              },
              {
                title: 'ProgressBar 条形进度条',
                path: 'progressBar',
                filePath: 'src/components/progress-bar',
              },
              {
                title: 'ProgressCircle 环形进度条',
                path: 'progressCircle',
                filePath: 'src/components/progress-circle',
              },
              {
                title: 'Swiper 滑块视图容器',
                path: 'swiper',
                filePath: 'src/components/swiper',
              },
              {
                title: 'Tag 标签',
                path: 'tag',
                filePath: 'src/components/tag',
              },
            ],
          },
          {
            type: 'group',
            title: '导航组件',
            items: [
              {
                title: 'IndexBar 索引栏',
                path: 'indexBar',
                filePath: 'src/components/index-bar',
              },
              {
                title: 'Navbar 头部导航',
                path: 'navbar',
                filePath: 'src/components/navbar',
              },
              {
                title: 'Pagination 分页',
                path: 'pagination',
                filePath: 'src/components/pagination',
              },
              {
                title: 'Steps 步骤条',
                path: 'steps',
                filePath: 'src/components/steps',
              },
              {
                title: 'Tabbar 标签栏',
                path: 'tabbar',
                filePath: 'src/components/tabbar',
              },
              {
                title: 'Tabs 标签页',
                path: 'tabs',
                filePath: 'src/components/tabs',
              },
            ],
          },
          {
            type: 'group',
            title: '反馈组件',
            items: [
              {
                title: 'ActionSheet 动作面板',
                path: 'actionSheet',
                filePath: 'src/components/action-sheet',
              },
              {
                title: 'Dialog 对话框',
                path: 'dialog',
                filePath: 'src/components/dialog',
              },
              {
                title: 'Dropdown 下拉菜单',
                path: 'dropdown',
                filePath: 'src/components/dropdown',
              },
              {
                title: 'Loading 加载',
                path: 'loading',
                filePath: 'src/components/loading',
              },
              {
                title: 'Notify 通知栏',
                path: 'notify',
                filePath: 'src/components/notify',
              },
              {
                title: 'Result 结果',
                path: 'result',
                filePath: 'src/components/result',
              },
              {
                title: 'ShareSheet 分享面板',
                path: 'shareSheet',
                filePath: 'src/components/share-sheet',
              },
              {
                title: 'Skeleton 骨架屏',
                path: 'skeleton',
                filePath: 'src/components/skeleton',
              },
              {
                title: 'Toast 轻提示',
                path: 'toast',
                filePath: 'src/components/toast',
              },
            ],
          },
          {
            type: 'group',
            title: '底层组件',
            items: [
              {
                title: 'Movable 可移动的',
                path: 'movable',
                filePath: 'src/components/movable',
              },
              {
                title: 'Collapse 折叠',
                path: 'collapse',
                filePath: 'src/components/collapse',
              },
              {
                title: 'Popout 弹出框',
                path: 'popout',
                filePath: 'src/components/popout',
              },
              {
                title: 'Popup 弹出层',
                path: 'popup',
                filePath: 'src/components/popup',
              },
              {
                title: 'Transition 过渡',
                path: 'transition',
                filePath: 'src/components/transition',
              },
            ],
          },
          {
            type: 'group',
            title: '底层库',
            items: [
              {
                title: 'Touch 触摸事件',
                path: 'touch',
                filePath: 'src/components/touch',
              },
            ],
          },
        ],
      },
    ],
  },
}
