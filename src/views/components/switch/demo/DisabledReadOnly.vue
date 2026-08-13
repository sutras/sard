<template>
  <doc-title>只读</doc-title>
  <s-switch readonly />
  <s-switch :model-value="true" readonly class="ms-2" />

  <doc-title>禁用</doc-title>
  <s-switch disabled />
  <s-switch :model-value="true" disabled class="ms-2" />
</template>
