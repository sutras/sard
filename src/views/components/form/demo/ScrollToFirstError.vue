<template>
  <doc-page gray title="滚动到第一个错误字段" padding="0">
    <s-form
      :model="formState"
      ref="formRef"
      scroll-to-first-error
      :scroll-into-view-options="{
        block: position,
        behavior: 'smooth',
      }"
    >
      <s-form-item
        v-for="(item, i) in formState"
        :key="item.key"
        :name="[i, 'value']"
        :label="item.label"
        required
        :style="{
          scrollMarginTop: '50px',
          scrollMarginBottom: footerHeight + 'px',
        }"
      >
        <s-input type="textarea" min-height="150px" v-model="item.value" />
      </s-form-item>
    </s-form>

    <div :style="{ height: footerHeight + 'px' }"></div>
    <div ref="footer" class="footer">
      <s-row gap="10px">
        <s-col>
          <s-button block @click="onSubmit">Submit</s-button>
        </s-col>
        <s-col>
          <s-button block variant="outlined" @click="onReset">reset</s-button>
        </s-col>
      </s-row>
      <div style="padding: 10px 0">
        <s-radio-group v-model="position" direction="horizontal">
          <s-radio value="start">start</s-radio>
          <s-radio value="center">center</s-radio>
          <s-radio value="end">end</s-radio>
          <s-radio value="nearest">nearest</s-radio>
        </s-radio-group>
      </div>
    </div>
  </doc-page>
</template>

<script setup lang="ts">
import { ref, toRaw, onMounted, useTemplateRef } from 'vue'
import { toast, type FormExpose, type ScrollIntoViewPosition, type FieldValidateError } from 'sard'

const formState = ref(
  Array(10)
    .fill(0)
    .map((_, i) => {
      return {
        label: 'Item' + i,
        name: 'item' + i,
        value: '',
        key: i,
      }
    }),
)

const formRef = ref<FormExpose>()

const onSubmit = () => {
  formRef.value
    ?.validate()
    .then(() => {
      toast('success')
      console.log('formState: ', toRaw(formState))
    })
    .catch((error: FieldValidateError[]) => {
      console.log('Validate Failed:', error)
    })
}

const onReset = () => {
  formRef.value?.reset()
}

const position = ref<ScrollIntoViewPosition>('nearest')

const footerHeight = ref(0)

const footerRef = useTemplateRef('footer')

onMounted(() => {
  footerHeight.value = footerRef.value!.getBoundingClientRect().height
})
</script>

<style lang="scss" scoped>
.footer {
  position: fixed;
  bottom: 0;
  right: 0;
  left: 0;
  z-index: 1;
  display: flex;
  flex-direction: column;
  gap: 15px;
  padding: 10px 16px;
  padding-bottom: calc(10px + var(--s-safe-bottom));
  border-top: 1px var(--s-border-color) solid;
  background: var(--s-bg-color-elevated);
}
</style>
