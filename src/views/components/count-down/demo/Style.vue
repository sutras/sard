<template>
  <s-count-down :time="30 * 60 * 60 * 1000" #default="{ time }">
    <div class="flex items-center">
      <s-button size="xs">
        {{ String(time.hours).padStart(2, '0') }}
      </s-button>
      <div class="mx-2 leading-0">:</div>
      <s-button size="xs">
        {{ String(time.minutes).padStart(2, '0') }}
      </s-button>
      <div class="mx-2 leading-0">:</div>
      <s-button size="xs">
        {{ String(time.seconds).padStart(2, '0') }}
      </s-button>
    </div>
  </s-count-down>
</template>
