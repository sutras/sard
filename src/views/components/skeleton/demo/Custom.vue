<template>
  <s-flex vertical gap="30px">
    <s-grid :columns="4" gap="15px">
      <s-grid-item v-for="i in 8" :key="i">
        <s-flex vertical gap="8px">
          <s-skeleton-block height="60px" animated />
          <s-skeleton-block animated />
        </s-flex>
      </s-grid-item>
    </s-grid>

    <s-flex gap="20px">
      <s-skeleton-block width="100px" height="80px" animated />
      <s-flex flex="1" vertical>
        <s-skeleton-paragraph :rows="2" animated />
        <s-skeleton-block width="60px" height="30px" class="ms-auto mt-auto" animated />
      </s-flex>
    </s-flex>
  </s-flex>
</template>
