<template>
  <!-- 工业语境：车间看板顶部导航与权限入口｜Flow 用法演示 -->
  <s-navbar title="报警中心" flow>
    <template #start>
      <s-navbar-item #icon>
        <demo-icon name="work-order" />
      </s-navbar-item>
    </template>
    <template #end>
      <s-navbar-item #icon>
        <demo-icon name="share" />
      </s-navbar-item>
      <s-navbar-item #icon>
        <demo-icon name="star" />
      </s-navbar-item>
      <s-navbar-item #icon>
        <demo-icon name="heart" />
      </s-navbar-item>
    </template>
  </s-navbar>
</template>
