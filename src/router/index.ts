import NotFound from '@/components/not-found.vue'
import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: () => import('@/views/index/index.vue'),
    },
    {
      path: '/components',
      children: [
        {
          path: 'accordion',
          component: () => import('@/views/components/accordion/index.vue'),
        },
        {
          path: 'action-sheet',
          component: () => import('@/views/components/action-sheet/index.vue'),
        },
        {
          path: 'alert',
          component: () => import('@/views/components/alert/index.vue'),
        },
        {
          path: 'avatar',
          component: () => import('@/views/components/avatar/index.vue'),
        },
        {
          path: 'back-top',
          component: () => import('@/views/components/back-top/index.vue'),
        },
        {
          path: 'back-top/demo/Basic',
          component: () => import('@/views/components/back-top/demo/Basic.vue'),
        },
        {
          path: 'back-top/demo/CustomContent',
          component: () => import('@/views/components/back-top/demo/CustomContent.vue'),
        },
        {
          path: 'back-top/demo/Duration',
          component: () => import('@/views/components/back-top/demo/Duration.vue'),
        },
        {
          path: 'back-top/demo/Position',
          component: () => import('@/views/components/back-top/demo/Position.vue'),
        },
        {
          path: 'back-top/demo/ScrollView',
          component: () => import('@/views/components/back-top/demo/ScrollView.vue'),
        },
        {
          path: 'back-top/demo/VisibleHeight',
          component: () => import('@/views/components/back-top/demo/VisibleHeight.vue'),
        },
        {
          path: 'badge',
          component: () => import('@/views/components/badge/index.vue'),
        },
        {
          path: 'barcode',
          component: () => import('@/views/components/barcode/index.vue'),
        },
        {
          path: 'button',
          component: () => import('@/views/components/button/index.vue'),
        },
        {
          path: 'calendar-input',
          component: () => import('@/views/components/calendar-input/index.vue'),
        },
        {
          path: 'calendar-popout',
          component: () => import('@/views/components/calendar-popout/index.vue'),
        },
        {
          path: 'calendar',
          component: () => import('@/views/components/calendar/index.vue'),
        },
        {
          path: 'card',
          component: () => import('@/views/components/card/index.vue'),
        },
        {
          path: 'cascader-input',
          component: () => import('@/views/components/cascader-input/index.vue'),
        },
        {
          path: 'cascader-popout',
          component: () => import('@/views/components/cascader-popout/index.vue'),
        },
        {
          path: 'cascader',
          component: () => import('@/views/components/cascader/index.vue'),
        },
        {
          path: 'checkbox-input',
          component: () => import('@/views/components/checkbox-input/index.vue'),
        },
        {
          path: 'checkbox-popout',
          component: () => import('@/views/components/checkbox-popout/index.vue'),
        },
        {
          path: 'checkbox',
          component: () => import('@/views/components/checkbox/index.vue'),
        },
        {
          path: 'collapse',
          component: () => import('@/views/components/collapse/index.vue'),
        },
        {
          path: 'color-picker-input',
          component: () => import('@/views/components/color-picker-input/index.vue'),
        },
        {
          path: 'color-picker-popout',
          component: () => import('@/views/components/color-picker-popout/index.vue'),
        },
        {
          path: 'color-picker',
          component: () => import('@/views/components/color-picker/index.vue'),
        },
        {
          path: 'compact',
          component: () => import('@/views/components/compact/index.vue'),
        },
        {
          path: 'cool-icon',
          component: () => import('@/views/components/cool-icon/index.vue'),
        },
        {
          path: 'count-down',
          component: () => import('@/views/components/count-down/index.vue'),
        },
        {
          path: 'count-to',
          component: () => import('@/views/components/count-to/index.vue'),
        },
        {
          path: 'crop-image',
          component: () => import('@/views/components/crop-image/index.vue'),
        },
        {
          path: 'date-strip',
          component: () => import('@/views/components/date-strip/index.vue'),
        },
        {
          path: 'datetime-picker-input',
          component: () => import('@/views/components/datetime-picker-input/index.vue'),
        },
        {
          path: 'datetime-picker-popout',
          component: () => import('@/views/components/datetime-picker-popout/index.vue'),
        },
        {
          path: 'datetime-picker',
          component: () => import('@/views/components/datetime-picker/index.vue'),
        },
        {
          path: 'datetime-range-picker-input',
          component: () => import('@/views/components/datetime-range-picker-input/index.vue'),
        },
        {
          path: 'datetime-range-picker-popout',
          component: () => import('@/views/components/datetime-range-picker-popout/index.vue'),
        },
        {
          path: 'datetime-range-picker',
          component: () => import('@/views/components/datetime-range-picker/index.vue'),
        },
        {
          path: 'descriptions',
          component: () => import('@/views/components/descriptions/index.vue'),
        },
        {
          path: 'dialog',
          component: () => import('@/views/components/dialog/index.vue'),
        },
        {
          path: 'divider',
          component: () => import('@/views/components/divider/index.vue'),
        },
        {
          path: 'dnd',
          component: () => import('@/views/components/dnd/index.vue'),
        },
        {
          path: 'dropdown',
          component: () => import('@/views/components/dropdown/index.vue'),
        },
        {
          path: 'ellipsis',
          component: () => import('@/views/components/ellipsis/index.vue'),
        },
        {
          path: 'empty',
          component: () => import('@/views/components/empty/index.vue'),
        },
        {
          path: 'fab',
          component: () => import('@/views/components/fab/index.vue'),
        },
        {
          path: 'floating-bubble',
          component: () => import('@/views/components/floating-bubble/index.vue'),
        },
        {
          path: 'floating-panel',
          component: () => import('@/views/components/floating-panel/index.vue'),
        },
        {
          path: 'floating-panel/demo/Anchors',
          component: () => import('@/views/components/floating-panel/demo/Anchors.vue'),
        },
        {
          path: 'floating-panel/demo/Basic',
          component: () => import('@/views/components/floating-panel/demo/Basic.vue'),
        },
        {
          path: 'floating-panel/demo/ContentDraggable',
          component: () => import('@/views/components/floating-panel/demo/ContentDraggable.vue'),
        },
        {
          path: 'form',
          component: () => import('@/views/components/form/index.vue'),
        },
        {
          path: 'form/demo/BasicLogin',
          component: () => import('@/views/components/form/demo/BasicLogin.vue'),
        },
        {
          path: 'form/demo/ChangePassword',
          component: () => import('@/views/components/form/demo/ChangePassword.vue'),
        },
        {
          path: 'form/demo/ComplexDynamicFormItem',
          component: () => import('@/views/components/form/demo/ComplexDynamicFormItem.vue'),
        },
        {
          path: 'form/demo/CustomControl',
          component: () => import('@/views/components/form/demo/CustomControl.vue'),
        },
        {
          path: 'form/demo/CustomValidate',
          component: () => import('@/views/components/form/demo/CustomValidate.vue'),
        },
        {
          path: 'form/demo/DialogForm',
          component: () => import('@/views/components/form/demo/DialogForm.vue'),
        },
        {
          path: 'form/demo/DirectionAlign',
          component: () => import('@/views/components/form/demo/DirectionAlign.vue'),
        },
        {
          path: 'form/demo/DisabledReadOnly',
          component: () => import('@/views/components/form/demo/DisabledReadOnly.vue'),
        },
        {
          path: 'form/demo/DynamicFormItem',
          component: () => import('@/views/components/form/demo/DynamicFormItem.vue'),
        },
        {
          path: 'form/demo/DynamicNested',
          component: () => import('@/views/components/form/demo/DynamicNested.vue'),
        },
        {
          path: 'form/demo/DynamicValidate',
          component: () => import('@/views/components/form/demo/DynamicValidate.vue'),
        },
        {
          path: 'form/demo/ForgetPassword',
          component: () => import('@/views/components/form/demo/ForgetPassword.vue'),
        },
        {
          path: 'form/demo/LabelWidth',
          component: () => import('@/views/components/form/demo/LabelWidth.vue'),
        },
        {
          path: 'form/demo/Login',
          component: () => import('@/views/components/form/demo/Login.vue'),
        },
        {
          path: 'form/demo/MobileLogin',
          component: () => import('@/views/components/form/demo/MobileLogin.vue'),
        },
        {
          path: 'form/demo/MultiFormLinkage',
          component: () => import('@/views/components/form/demo/MultiFormLinkage.vue'),
        },
        {
          path: 'form/demo/Nested',
          component: () => import('@/views/components/form/demo/Nested.vue'),
        },
        {
          path: 'form/demo/Plain',
          component: () => import('@/views/components/form/demo/Plain.vue'),
        },
        {
          path: 'form/demo/Popup',
          component: () => import('@/views/components/form/demo/Popup.vue'),
        },
        {
          path: 'form/demo/ScrollToFirstError',
          component: () => import('@/views/components/form/demo/ScrollToFirstError.vue'),
        },
        {
          path: 'form/demo/ToastValidateError',
          component: () => import('@/views/components/form/demo/ToastValidateError.vue'),
        },
        {
          path: 'form/demo/Typical',
          component: () => import('@/views/components/form/demo/Typical.vue'),
        },
        {
          path: 'form/demo/Validate',
          component: () => import('@/views/components/form/demo/Validate.vue'),
        },
        {
          path: 'grid',
          component: () => import('@/views/components/grid/index.vue'),
        },
        {
          path: 'icon',
          component: () => import('@/views/components/icon/index.vue'),
        },
        {
          path: 'image',
          component: () => import('@/views/components/image/index.vue'),
        },
        {
          path: 'indexes',
          component: () => import('@/views/components/indexes/index.vue'),
        },
        {
          path: 'indexes/demo/FullPage',
          component: () => import('@/views/components/indexes/demo/FullPage.vue'),
        },
        {
          path: 'infinite-list',
          component: () => import('@/views/components/infinite-list/index.vue'),
        },
        {
          path: 'input',
          component: () => import('@/views/components/input/index.vue'),
        },
        {
          path: 'keyboard',
          component: () => import('@/views/components/keyboard/index.vue'),
        },
        {
          path: 'keyboard-popout',
          component: () => import('@/views/components/keyboard-popout/index.vue'),
        },
        {
          path: 'layout',
          component: () => import('@/views/components/layout/index.vue'),
        },
        {
          path: 'list',
          component: () => import('@/views/components/list/index.vue'),
        },
        {
          path: 'load-more',
          component: () => import('@/views/components/load-more/index.vue'),
        },
        {
          path: 'load-more/demo/FullPage',
          component: () => import('@/views/components/load-more/demo/FullPage.vue'),
        },
        {
          path: 'loading',
          component: () => import('@/views/components/loading/index.vue'),
        },
        {
          path: 'lucky-draw',
          component: () => import('@/views/components/lucky-draw/index.vue'),
        },
        {
          path: 'marquee',
          component: () => import('@/views/components/marquee/index.vue'),
        },
        {
          path: 'menu',
          component: () => import('@/views/components/menu/index.vue'),
        },
        {
          path: 'motion',
          component: () => import('@/views/components/motion/index.vue'),
        },
        {
          path: 'navbar',
          component: () => import('@/views/components/navbar/index.vue'),
        },
        {
          path: 'notice-bar',
          component: () => import('@/views/components/notice-bar/index.vue'),
        },
        {
          path: 'notify',
          component: () => import('@/views/components/notify/index.vue'),
        },
        {
          path: 'overlay',
          component: () => import('@/views/components/overlay/index.vue'),
        },
        {
          path: 'pagination',
          component: () => import('@/views/components/pagination/index.vue'),
        },
        {
          path: 'password-input',
          component: () => import('@/views/components/password-input/index.vue'),
        },
        {
          path: 'picker-input',
          component: () => import('@/views/components/picker-input/index.vue'),
        },
        {
          path: 'picker-popout',
          component: () => import('@/views/components/picker-popout/index.vue'),
        },
        {
          path: 'picker',
          component: () => import('@/views/components/picker/index.vue'),
        },
        {
          path: 'picker-view',
          component: () => import('@/views/components/picker-view/index.vue'),
        },
        {
          path: 'popout-input',
          component: () => import('@/views/components/popout-input/index.vue'),
        },
        {
          path: 'popout',
          component: () => import('@/views/components/popout/index.vue'),
        },
        {
          path: 'popover',
          component: () => import('@/views/components/popover/index.vue'),
        },
        {
          path: 'popup',
          component: () => import('@/views/components/popup/index.vue'),
        },
        {
          path: 'preview-image',
          component: () => import('@/views/components/preview-image/index.vue'),
        },
        {
          path: 'progress-bar',
          component: () => import('@/views/components/progress-bar/index.vue'),
        },
        {
          path: 'progress-circle',
          component: () => import('@/views/components/progress-circle/index.vue'),
        },
        {
          path: 'pull-down-refresh',
          component: () => import('@/views/components/pull-down-refresh/index.vue'),
        },
        {
          path: 'pull-down-refresh/demo/Page',
          component: () => import('@/views/components/pull-down-refresh/demo/Page.vue'),
        },
        {
          path: 'pull-down-refresh/demo/ScrollView',
          component: () => import('@/views/components/pull-down-refresh/demo/ScrollView.vue'),
        },
        {
          path: 'pull-down-refresh/demo/Slot',
          component: () => import('@/views/components/pull-down-refresh/demo/Slot.vue'),
        },
        {
          path: 'puzzle-verify',
          component: () => import('@/views/components/puzzle-verify/index.vue'),
        },
        {
          path: 'qrcode',
          component: () => import('@/views/components/qrcode/index.vue'),
        },
        {
          path: 'radio-input',
          component: () => import('@/views/components/radio-input/index.vue'),
        },
        {
          path: 'radio-popout',
          component: () => import('@/views/components/radio-popout/index.vue'),
        },
        {
          path: 'radio',
          component: () => import('@/views/components/radio/index.vue'),
        },
        {
          path: 'rate',
          component: () => import('@/views/components/rate/index.vue'),
        },
        {
          path: 'read-more',
          component: () => import('@/views/components/read-more/index.vue'),
        },
        {
          path: 'result',
          component: () => import('@/views/components/result/index.vue'),
        },
        {
          path: 'rotate-verify',
          component: () => import('@/views/components/rotate-verify/index.vue'),
        },
        {
          path: 'scroll-list',
          component: () => import('@/views/components/scroll-list/index.vue'),
        },
        {
          path: 'scroll-spy',
          component: () => import('@/views/components/scroll-spy/index.vue'),
        },
        {
          path: 'search',
          component: () => import('@/views/components/search/index.vue'),
        },
        {
          path: 'segmented',
          component: () => import('@/views/components/segmented/index.vue'),
        },
        {
          path: 'select-input',
          component: () => import('@/views/components/select-input/index.vue'),
        },
        {
          path: 'select-popout',
          component: () => import('@/views/components/select-popout/index.vue'),
        },
        {
          path: 'select',
          component: () => import('@/views/components/select/index.vue'),
        },
        {
          path: 'share-sheet',
          component: () => import('@/views/components/share-sheet/index.vue'),
        },
        {
          path: 'sidebar',
          component: () => import('@/views/components/sidebar/index.vue'),
        },
        {
          path: 'sidebar/demo/Scene1',
          component: () => import('@/views/components/sidebar/demo/Scene1.vue'),
        },
        {
          path: 'sidebar/demo/Scene2',
          component: () => import('@/views/components/sidebar/demo/Scene2.vue'),
        },
        {
          path: 'signature',
          component: () => import('@/views/components/signature/index.vue'),
        },
        {
          path: 'skeleton',
          component: () => import('@/views/components/skeleton/index.vue'),
        },
        {
          path: 'slide-verify',
          component: () => import('@/views/components/slide-verify/index.vue'),
        },
        {
          path: 'slider',
          component: () => import('@/views/components/slider/index.vue'),
        },
        {
          path: 'space',
          component: () => import('@/views/components/space/index.vue'),
        },
        {
          path: 'status-bar',
          component: () => import('@/views/components/status-bar/index.vue'),
        },
        {
          path: 'stepper',
          component: () => import('@/views/components/stepper/index.vue'),
        },
        {
          path: 'steps',
          component: () => import('@/views/components/steps/index.vue'),
        },
        {
          path: 'sticky',
          component: () => import('@/views/components/sticky/index.vue'),
        },
        {
          path: 'style',
          component: () => import('@/views/components/style/index.vue'),
        },
        {
          path: 'swipe-action',
          component: () => import('@/views/components/swipe-action/index.vue'),
        },
        {
          path: 'swiper',
          component: () => import('@/views/components/swiper/index.vue'),
        },
        {
          path: 'switch',
          component: () => import('@/views/components/switch/index.vue'),
        },
        {
          path: 'tabbar-pit',
          component: () => import('@/views/components/tabbar-pit/index.vue'),
        },
        {
          path: 'tabbar',
          component: () => import('@/views/components/tabbar/index.vue'),
        },
        {
          path: 'table',
          component: () => import('@/views/components/table/index.vue'),
        },
        {
          path: 'table/demo/FullScreen',
          component: () => import('@/views/components/table/demo/FullScreen.vue'),
        },
        {
          path: 'tabs',
          component: () => import('@/views/components/tabs/index.vue'),
        },
        {
          path: 'tag',
          component: () => import('@/views/components/tag/index.vue'),
        },
        {
          path: 'text',
          component: () => import('@/views/components/text/index.vue'),
        },
        {
          path: 'timeline',
          component: () => import('@/views/components/timeline/index.vue'),
        },
        {
          path: 'toast',
          component: () => import('@/views/components/toast/index.vue'),
        },
        {
          path: 'tree',
          component: () => import('@/views/components/tree/index.vue'),
        },
        {
          path: 'tree/demo/Accordion',
          component: () => import('@/views/components/tree/demo/Accordion.vue'),
        },
        {
          path: 'tree/demo/Async',
          component: () => import('@/views/components/tree/demo/Async.vue'),
        },
        {
          path: 'tree/demo/Basic',
          component: () => import('@/views/components/tree/demo/Basic.vue'),
        },
        {
          path: 'tree/demo/CheckStrictly',
          component: () => import('@/views/components/tree/demo/CheckStrictly.vue'),
        },
        {
          path: 'tree/demo/DefaultExpandedAndChecked',
          component: () => import('@/views/components/tree/demo/DefaultExpandedAndChecked.vue'),
        },
        {
          path: 'tree/demo/Draggable',
          component: () => import('@/views/components/tree/demo/Draggable.vue'),
        },
        {
          path: 'tree/demo/Editable',
          component: () => import('@/views/components/tree/demo/Editable.vue'),
        },
        {
          path: 'tree/demo/Filter',
          component: () => import('@/views/components/tree/demo/Filter.vue'),
        },
        {
          path: 'tree/demo/Lazy',
          component: () => import('@/views/components/tree/demo/Lazy.vue'),
        },
        {
          path: 'tree/demo/LeafOnly',
          component: () => import('@/views/components/tree/demo/LeafOnly.vue'),
        },
        {
          path: 'tree/demo/Selectable',
          component: () => import('@/views/components/tree/demo/Selectable.vue'),
        },
        {
          path: 'tree/demo/Single',
          component: () => import('@/views/components/tree/demo/Single.vue'),
        },
        {
          path: 'tree/demo/StrictFilter',
          component: () => import('@/views/components/tree/demo/StrictFilter.vue'),
        },
        {
          path: 'upload',
          component: () => import('@/views/components/upload/index.vue'),
        },
        {
          path: 'waterfall',
          component: () => import('@/views/components/waterfall/index.vue'),
        },
        {
          path: 'waterfall/demo/Basic',
          component: () => import('@/views/components/waterfall/demo/Basic.vue'),
        },
        {
          path: 'waterfall/demo/BigImage',
          component: () => import('@/views/components/waterfall/demo/BigImage.vue'),
        },
        {
          path: 'waterfall/demo/Columns',
          component: () => import('@/views/components/waterfall/demo/Columns.vue'),
        },
        {
          path: 'waterfall/demo/Dynamic',
          component: () => import('@/views/components/waterfall/demo/Dynamic.vue'),
        },
        {
          path: 'waterfall/demo/KnownSize',
          component: () => import('@/views/components/waterfall/demo/KnownSize.vue'),
        },
        {
          path: 'waterfall/demo/MaxWait',
          component: () => import('@/views/components/waterfall/demo/MaxWait.vue'),
        },
        {
          path: 'waterfall/demo/TrueCase',
          component: () => import('@/views/components/waterfall/demo/TrueCase.vue'),
        },
        {
          path: 'watermark',
          component: () => import('@/views/components/watermark/index.vue'),
        },
        {
          path: 'watermark/demo/Custom',
          component: () => import('@/views/components/watermark/demo/Custom.vue'),
        },
      ],
    },
    { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound },
  ],
  scrollBehavior(to, from, savedPosition) {
    // 如果有 savedPosition（浏览器前进/后退），则保持原位置
    if (savedPosition) {
      return savedPosition
    }
    // 否则滚动到顶部
    return { top: 0 }
  },
})

export default router
