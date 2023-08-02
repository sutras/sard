export default defineAppConfig({
  pages: ['pages/index/index'],
  subPackages: [
    {
      root: 'packageA',
      pages: [
        'pages/accordion/index',
        'pages/action-sheet/index',
        'pages/avatar/index',
        'pages/badge/index',
        'pages/button/index',
        'pages/calendar/index',
        'pages/cascader/index',
        'pages/cell/index',
        'pages/checkbox/index',
        'pages/collapse/index',
        'pages/config-provider/index',
        'pages/count-down/index',
        'pages/datetime-picker/index',
        'pages/dialog/index',
        'pages/dropdown/index',
        'pages/form/index',
        'pages/empty/index',
        'pages/grid/index',
        'pages/icon/index',
        'pages/index-bar/index',
        'pages/input/index',
        'pages/loading/index',
        'pages/locale/index',
        'pages/mesh/index',
        'pages/navbar/index',
        'pages/notice-bar/index',
        'pages/notify/index',
        'pages/number-keyboard/index',
        'pages/pagination/index',
        'pages/password-input/index',
        'pages/picker/index',
        'pages/popout/index',
        'pages/popover/index',
        'pages/popup/index',
        'pages/progress-bar/index',
        'pages/progress-circle/index',
        'pages/radio/index',
        'pages/rate/index',
        'pages/result/index',
        'pages/search/index',
        'pages/share-sheet/index',
        'pages/skeleton/index',
        'pages/slider/index',
        'pages/stepper/index',
        'pages/steps/index',
        'pages/style/index',
        'pages/swiper/index',
        'pages/switch/index',
        'pages/tabbar/index',
        'pages/tabs/index',
        'pages/tag/index',
        'pages/toast/index',
        'pages/upload/index',
      ],
    },
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black',
  },
})
