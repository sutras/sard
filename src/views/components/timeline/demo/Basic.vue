<template>
  <s-timeline>
    <s-timeline-item
      v-for="(item, index) in logistics"
      :key="index"
      :title="item.title"
      :time="item.time"
      :style="{
        color: index !== 1 ? 'var(--s-text-color-tertiary)' : '',
      }"
    >
      <template v-if="item.icon" #icon>
        <demo-icon :name="item.icon" :color="item.iconColor" />
      </template>
      <div v-if="item.tel">
        <template v-for="(subStr, i) in item.description.split(/(\${tel})/)" :key="i">
          <span v-if="subStr === '${tel}'" style="color: var(--s-color-primary)">
            {{ item.tel }}
          </span>
          <span v-else>{{ subStr }}</span>
        </template>
      </div>
      <template v-else>
        {{ item.description }}
      </template>
    </s-timeline-item>
  </s-timeline>
</template>

<script setup lang="ts">
const logistics = [
  {
    description: '收货地址：广东广州xxx1号店',
  },
  {
    icon: 'check',
    iconColor: 'var(--s-color-primary)',
    title: '已签收',
    description:
      '您的订单已由【xxx（广州xxx1号店）代收。如有疑问您可以联系配送员【xxx，${tel}】确认。感谢您在xxx购物，欢迎再次光临。】',
    tel: '13800138000',
    time: '2024-06-17 09:01:47',
  },
  {
    icon: 'delivery',
    title: '派送中',
    description: '您的订单正在配送途中（快递员：xxx，电话${tel}），请你耐心等待。',
    tel: '13800138000',
    time: '2024-06-17 08:01:25',
  },
  {
    icon: 'transport',
    title: '运输中',
    description: '您的订单已送达【广州xx营业部】',
    time: '2024-06-17 06:21:23',
  },
  {
    description: '您的订单已离开广州xx分拣中心，前往广州xx营业务途中',
    time: '2024-06-17 06:21:23',
  },
  {
    description: '您的订单在【广州xx分拣中心】准备送往【广州xx营业部】',
    time: '2024-06-17 04:27:51',
  },
  {
    description: '您的订单在【广州xx接货仓】分拣完成',
    time: '2024-06-16 21:07:28',
  },
  {
    icon: 'warehouse',
    title: '仓库处理中',
    description: '打包完成',
    time: '2024-06-16 20:58:13',
  },
  {
    description: '扫描完成',
    time: '2024-06-16 20:58:13',
  },
  {
    description: '拣货完成',
    time: '2024-06-16 19:18:06',
  },
  {
    description: '您的订单已经打印完成',
    time: '2024-06-16 18:53:15',
  },
  {
    icon: 'order',
    title: '已下单',
    description: '温馨提示：您的订单预计6月17日09:00-15:00送达',
    time: '2024-06-16 18:50:30',
  },
  {
    description: '您的订单已经进入广州仓库准备出库',
    time: '2024-06-16 18:20:49',
  },
  {
    description: '您的订单预计2024-06-16 18:20开始处理，请您耐心等待',
    time: '2024-06-16 18:20:48',
  },
  {
    description: '您提交了订单，请等待系统确认',
    time: '2021-06-16 18:20:30',
  },
]
</script>
