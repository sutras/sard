<template>
  <!-- 工业语境：设备运行/待机/维保/停机四态色｜Flower 用法演示 -->
  <s-flex vertical gap="large">
    <s-flex justify="evenly" gap="medium">
      <s-cool-icon shape="flower" background="var(--s-color-success)" color="#fff">
        <demo-icon name="pump" />
      </s-cool-icon>

      <s-cool-icon shape="flower" background="var(--s-color-primary)" color="#fff">
        <demo-icon name="motor" />
      </s-cool-icon>

      <s-cool-icon shape="flower" background="var(--s-color-warning)" color="#fff">
        <demo-icon name="pipe" />
      </s-cool-icon>

      <s-cool-icon shape="flower" background="var(--s-color-danger)" color="#fff">
        <demo-icon name="cnc" />
      </s-cool-icon>
    </s-flex>

    <s-flex justify="evenly" gap="medium">
      <s-cool-icon
        shape="flower"
        background="color-mix(in srgb, var(--s-color-success) 16%, transparent)"
        color="var(--s-color-success)"
      >
        <demo-icon name="pump" />
      </s-cool-icon>

      <s-cool-icon
        shape="flower"
        background="color-mix(in srgb, var(--s-color-primary) 16%, transparent)"
        color="var(--s-color-primary)"
      >
        <demo-icon name="motor" />
      </s-cool-icon>

      <s-cool-icon
        shape="flower"
        background="color-mix(in srgb, var(--s-color-warning) 16%, transparent)"
        color="var(--s-color-warning)"
      >
        <demo-icon name="pipe" />
      </s-cool-icon>

      <s-cool-icon
        shape="flower"
        background="color-mix(in srgb, var(--s-color-danger) 16%, transparent)"
        color="var(--s-color-danger)"
      >
        <demo-icon name="cnc" />
      </s-cool-icon>
    </s-flex>
  </s-flex>
</template>
