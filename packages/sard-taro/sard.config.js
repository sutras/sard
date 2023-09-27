import path from 'node:path'

function getComponentPath(compPath) {
  return path.resolve(
    process.cwd(),
    '../sard-taro-demo/src/sard-taro/',
    compPath,
  )
}

export default {
  name: 'Sard',
  styles: ['docs/assets/index.scss'],
  base: '/sard-taro/',
  publicDir: 'docs/public',
  buildSite: {
    outDir: 'site',
  },
  build: {
    entry: 'src/index.ts',
    cssEntry: 'src/index.scss',
    name: 'Sard',
    fileName: 'index',
    outDir: 'dist',
    srcDir: 'src',
    external: ['react', 'classnames', '@tarojs/taro', '@tarojs/components'],
  },
  site: {
    title: 'Sard',
    logo: 'logo.svg',
    seo: {
      title: 'sard-taro | React 移动端 UI 组件库',
      description: 'sard-taro | React 移动端 UI 组件库',
    },
    routes: [
      {
        title: '首页',
        path: '/',
        filePath: 'docs/markdown/home.md',
        hidden: true,
      },
      {
        title: '指引',
        path: '/guide',
        index: 'intro',
        children: [
          {
            type: 'group',
            title: '指引',
            items: [
              {
                title: '介绍',
                path: 'intro',
                filePath: 'docs/markdown/intro.md',
              },
              {
                title: '快速上手',
                path: 'quickstart',
                filePath: 'docs/markdown/quickstart.md',
              },
            ],
          },
        ],
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
                filePath: getComponentPath('button'),
              },
              {
                title: 'ConfigProvider 全局配置',
                path: 'config-provider',
                filePath: getComponentPath('config-provider'),
              },
              {
                title: 'Icon 图标',
                path: 'icon',
                filePath: getComponentPath('icon'),
              },
              {
                title: 'Locale 国际化',
                path: 'locale',
                filePath: getComponentPath('locale'),
              },
              {
                title: 'style 样式',
                path: 'style',
                filePath: getComponentPath('style'),
              },
            ],
          },
          {
            type: 'group',
            title: '布局',
            items: [
              {
                title: 'Grid 栅格',
                path: 'grid',
                filePath: getComponentPath('grid'),
              },
              {
                title: 'Mesh 宫格',
                path: 'mesh',
                filePath: getComponentPath('mesh'),
              },
              {
                title: 'Space 间距',
                path: 'space',
                filePath: getComponentPath('space'),
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
                filePath: getComponentPath('calendar'),
              },
              {
                title: 'Cascader 级联选择',
                path: 'cascader',
                filePath: getComponentPath('cascader'),
              },
              {
                title: 'Checkbox 复选框',
                path: 'checkbox',
                filePath: getComponentPath('checkbox'),
              },
              {
                title: 'DatetimePicker 日期时间选择器',
                path: 'datetime-picker',
                filePath: getComponentPath('datetime-picker'),
              },
              {
                title: 'Form 表单',
                path: 'form',
                filePath: getComponentPath('form'),
              },
              {
                title: 'Input 输入框',
                path: 'input',
                filePath: getComponentPath('input'),
              },
              {
                title: 'NumberKeyboard 数字键盘',
                path: 'number-keyboard',
                filePath: getComponentPath('number-keyboard'),
              },
              {
                title: 'PasswordInput 密码输入框',
                path: 'password-input',
                filePath: getComponentPath('password-input'),
              },
              {
                title: 'Picker 选择器',
                path: 'picker',
                filePath: getComponentPath('picker'),
              },
              {
                title: 'PopoutInput 弹出式输入框',
                path: 'popout-input',
                filePath: getComponentPath('popout-input'),
              },
              {
                title: 'Radio 单选按钮',
                path: 'radio',
                filePath: getComponentPath('radio'),
              },
              {
                title: 'Rate 评分',
                path: 'rate',
                filePath: getComponentPath('rate'),
              },
              {
                title: 'Search 搜索',
                path: 'search',
                filePath: getComponentPath('search'),
              },
              {
                title: 'Slider 滑动器选择器',
                path: 'slider',
                filePath: getComponentPath('slider'),
              },
              {
                title: 'Stepper 步进器',
                path: 'stepper',
                filePath: getComponentPath('stepper'),
              },
              {
                title: 'Switch 开关',
                path: 'switch',
                filePath: getComponentPath('switch'),
              },
              {
                title: 'Upload 上传',
                path: 'upload',
                filePath: getComponentPath('upload'),
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
                filePath: getComponentPath('avatar'),
              },
              {
                title: 'Accordion 手风琴',
                path: 'accordion',
                filePath: getComponentPath('accordion'),
              },
              {
                title: 'Badge 徽标',
                path: 'badge',
                filePath: getComponentPath('badge'),
              },
              {
                title: 'Card 卡片',
                path: 'card',
                filePath: getComponentPath('card'),
              },
              {
                title: 'Collapse 折叠',
                path: 'collapse',
                filePath: getComponentPath('collapse'),
              },
              {
                title: 'CountDown 倒计时',
                path: 'count-down',
                filePath: getComponentPath('count-down'),
              },
              {
                title: 'List 列表',
                path: 'list',
                filePath: getComponentPath('list'),
              },
              {
                title: 'Empty 空状态',
                path: 'empty',
                filePath: getComponentPath('empty'),
              },
              {
                title: 'NoticeBar 公告栏',
                path: 'notice-bar',
                filePath: getComponentPath('notice-bar'),
              },
              {
                title: 'Popout 弹出框',
                path: 'popout',
                filePath: getComponentPath('popout'),
              },
              {
                title: 'Popover 气泡弹出框',
                path: 'popover',
                filePath: getComponentPath('popover'),
              },
              {
                title: 'Popup 弹出层',
                path: 'popup',
                filePath: getComponentPath('popup'),
              },
              {
                title: 'ProgressBar 条形进度条',
                path: 'progress-bar',
                filePath: getComponentPath('progress-bar'),
              },
              {
                title: 'ProgressCircle 环形进度条',
                path: 'progress-circle',
                filePath: getComponentPath('progress-circle'),
              },
              {
                title: 'Swiper 滑块视图容器',
                path: 'swiper',
                filePath: getComponentPath('swiper'),
              },
              {
                title: 'Tag 标签',
                path: 'tag',
                filePath: getComponentPath('tag'),
              },
            ],
          },
          {
            type: 'group',
            title: '导航组件',
            items: [
              {
                title: 'Dropdown 下拉菜单',
                path: 'dropdown',
                filePath: getComponentPath('dropdown'),
              },
              {
                title: 'IndexBar 索引栏',
                path: 'index-bar',
                filePath: getComponentPath('index-bar'),
              },
              {
                title: 'Navbar 头部导航',
                path: 'navbar',
                filePath: getComponentPath('navbar'),
              },
              {
                title: 'Pagination 分页',
                path: 'pagination',
                filePath: getComponentPath('pagination'),
              },
              {
                title: 'Steps 步骤条',
                path: 'steps',
                filePath: getComponentPath('steps'),
              },
              {
                title: 'Tabbar 标签栏',
                path: 'tabbar',
                filePath: getComponentPath('tabbar'),
              },
              {
                title: 'Tabs 标签页',
                path: 'tabs',
                filePath: getComponentPath('tabs'),
              },
            ],
          },
          {
            type: 'group',
            title: '反馈组件',
            items: [
              {
                title: 'ActionSheet 动作面板',
                path: 'action-sheet',
                filePath: getComponentPath('action-sheet'),
              },
              {
                title: 'Dialog 对话框',
                path: 'dialog',
                filePath: getComponentPath('dialog'),
              },
              {
                title: 'Loading 加载',
                path: 'loading',
                filePath: getComponentPath('loading'),
              },
              {
                title: 'Notify 通知栏',
                path: 'notify',
                filePath: getComponentPath('notify'),
              },
              {
                title: 'Result 结果',
                path: 'result',
                filePath: getComponentPath('result'),
              },
              {
                title: 'ShareSheet 分享面板',
                path: 'share-sheet',
                filePath: getComponentPath('share-sheet'),
              },
              {
                title: 'Skeleton 骨架屏',
                path: 'skeleton',
                filePath: getComponentPath('skeleton'),
              },
              {
                title: 'Toast 轻提示',
                path: 'toast',
                filePath: getComponentPath('toast'),
              },
            ],
          },
          {
            type: 'group',
            title: '底层组件',
            items: [
              {
                title: 'Pressable 可按压的',
                path: 'pressable',
                filePath: getComponentPath('pressable'),
              },
            ],
          },
        ],
      },
    ],
  },
}
