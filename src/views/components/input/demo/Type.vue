<template>
  <s-input v-model="text" placeholder="text" type="text" />
  <s-input v-model="tel" placeholder="tel" type="tel" />
  <s-input v-model="digit" placeholder="digit" type="digit" />
  <s-input v-model="number" placeholder="number" type="number" />
  <s-input v-model="password" placeholder="password" type="password" />
  <s-input v-model="password" placeholder="password show-eye" type="password" show-eye />
  <s-input
    v-model="password"
    placeholder="password show-eye clearable"
    type="password"
    show-eye
    clearable
  />
  <s-input v-model="password" placeholder="password" :type="isPlainText ? 'text' : 'password'">
    <template #append>
      <div @click="isPlainText = !isPlainText">
        {{ isPlainText ? '显示密文' : '显示明文' }}
      </div>
    </template>
  </s-input>
  <s-input
    v-model="password"
    placeholder="password clearable"
    :type="isPlainText ? 'text' : 'password'"
    clearable
  >
    <template #append>
      <div @click="isPlainText = !isPlainText">
        {{ isPlainText ? '显示密文' : '显示明文' }}
      </div>
    </template>
  </s-input>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const text = ref('')
const tel = ref('')
const digit = ref('')
const number = ref('')
const password = ref('')

const isPlainText = ref(false)
</script>
