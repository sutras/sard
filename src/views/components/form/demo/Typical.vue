<template>
  <doc-page gray title="典型表单">
    <s-form :model="form" label-width="120px">
      <s-form-item label="Activity name">
        <s-input inlaid v-model="form.name" placeholder="Please input Activity name" />
      </s-form-item>
      <s-form-item label="Activity zone">
        <s-picker-input
          v-model="form.region"
          placeholder="please select your zone"
          title="please select your zone"
          :columns="[
            {
              label: 'Zone one',
              value: 'shanghai',
            },
            {
              label: 'Zone two',
              value: 'beijing',
            },
          ]"
        />
      </s-form-item>
      <s-form-item label="Activity time">
        <s-datetime-picker-input v-model="form.date1" type="yMd" placeholder="Pick a date" />
      </s-form-item>
      <s-form-item label="">
        <s-datetime-picker-input v-model="form.date2" type="hms" placeholder="Pick a time" />
      </s-form-item>
      <s-form-item label="Active date range">
        <s-datetime-range-picker-input
          v-model="form.date3"
          type="hms"
          :tabs="['start', 'end']"
          placeholder="Pick a time"
        />
      </s-form-item>
      <s-form-item label="Instant delivery">
        <s-switch v-model="form.delivery" />
      </s-form-item>
      <s-form-item label="Activity type">
        <s-checkbox-input
          v-model="form.type"
          placeholder="Pick Activity type"
          :options="[
            { label: 'Online activities', value: 'Online activities' },
            { label: 'Promotion activities', value: 'Promotion activities' },
            { label: 'Offline activities', value: 'Offline activities' },
            { label: 'Simple brand exposure', value: 'Simple brand exposure' },
          ]"
        />
      </s-form-item>
      <s-form-item label="Resources">
        <s-radio-input
          v-model="form.resource"
          placeholder="Pick Resources"
          :options="[
            { label: 'Sponsor', value: 'Sponsor' },
            { label: 'Venue', value: 'Venue' },
          ]"
        />
      </s-form-item>
      <s-form-item label="Activity form" label-valign="start">
        <s-input
          inlaid
          v-model="form.desc"
          type="textarea"
          placeholder="Please input Activity form"
          show-count
        />
      </s-form-item>
      <s-form-item>
        <s-button @click="onSubmit">Create</s-button>
        <s-button style="margin-top: 10px" variant="outlined">Cancel</s-button>
      </s-form-item>
    </s-form>
  </doc-page>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { toast } from 'sard'

// do not use same name with ref
const form = reactive({
  name: '',
  region: '',
  date1: undefined,
  date2: undefined,
  date3: undefined,
  delivery: false,
  type: [],
  resource: '',
  desc: '',
})

const onSubmit = () => {
  toast('submit!')
}
</script>
