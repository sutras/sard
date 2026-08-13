<template>
  <s-card title="Card title">
    <template #extra>
      <s-button variant="link" compact>More</s-button>
    </template>
    <p>Card content</p>
    <p>Card content</p>
    <p>Card content</p>
    <template #footer>
      <div class="flex items-center justify-around">
        <s-button variant="link" color="secondary" auto-height #icon>
          <demo-icon name="chat-dots" />
        </s-button>
        <s-divider vertical />
        <s-button variant="link" color="secondary" auto-height #icon>
          <demo-icon name="cart" />
        </s-button>
        <s-divider vertical />
        <s-button variant="link" color="secondary" auto-height #icon>
          <demo-icon name="list-task" />
        </s-button>
      </div>
    </template>
  </s-card>
</template>
