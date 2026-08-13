<template>
  <s-row gap="10px" style="row-gap: 15px">
    <s-col v-for="i in 8" :key="i" :span="3">
      <div style="display: flex; flex-direction: column; align-items: center; row-gap: 8px">
        <s-skeleton-block height="60px" animated />
        <s-skeleton-block animated />
      </div>
    </s-col>
  </s-row>

  <div style="display: flex; gap: 20px; margin-top: 30px">
    <s-skeleton-block width="100px" height="80px" animated />
    <div style="display: flex; flex-direction: column; flex: 1">
      <s-skeleton-paragraph :rows="2" animated />
      <s-skeleton-block
        width="60px"
        height="30px"
        style="margin-inline-start: auto; margin-top: auto"
        animated
      />
    </div>
  </div>
</template>
