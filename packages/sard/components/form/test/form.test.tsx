import { describe, expect, test } from 'vitest'
import { mount } from '@vue/test-utils'
import { nextTick, reactive } from 'vue'

import Form from '../form.vue'
import FormItem from '../form-item.vue'
import Input from '../../input/input.vue'
import { type FormExpose } from '../common'

describe('Form', () => {
  test('direction', async () => {
    const wrapper = mount(
      <Form direction="horizontal" labelAlign="start" labelValign="start" starPosition="start">
        <FormItem label="Name" required>
          <Input />
        </FormItem>
      </Form>,
    )

    expect(
      wrapper
        .find(
          '.s-form-item.s-form-item--horizontal.s-form-item--align-start.s-form-item--valign-start.s-form-item--star-start',
        )
        .exists(),
    ).toBeTruthy()

    await wrapper.setProps({
      direction: 'vertical',
      labelAlign: 'center',
      labelValign: 'center',
      starPosition: 'end',
    })
    expect(
      wrapper
        .find(
          '.s-form-item.s-form-item--vertical.s-form-item--align-center.s-form-item--valign-center.s-form-item--star-end',
        )
        .exists(),
    ).toBeTruthy()

    await wrapper.setProps({
      labelAlign: 'end',
      labelValign: 'end',
    })
    expect(
      wrapper.find('.s-form-item.s-form-item--align-end.s-form-item--valign-end').exists(),
    ).toBeTruthy()
  })

  test('validate', async () => {
    const wrapper = mount({
      setup() {
        const formModel = reactive({
          name: '',
          nickName: '',
          age: '',
        })

        return () => (
          <Form
            direction="horizontal"
            model={formModel}
            rules={{
              name: [
                {
                  required: true,
                  message: 'Please input Activity name',
                  trigger: 'change',
                },
              ],
            }}
            ref="formRef"
          >
            <FormItem label="Name" name="name">
              <Input v-model={formModel.name} />
            </FormItem>
            <FormItem label="NickName" name="nickname" required>
              <Input v-model={formModel.nickName} />
            </FormItem>
            <FormItem label="age">
              <Input v-model={formModel.age} />
            </FormItem>
          </Form>
        )
      },
    })

    await nextTick()

    expect(wrapper.find('.s-form-item:nth-child(1) .s-form-item__star').exists()).toBeTruthy()
    expect(wrapper.find('.s-form-item:nth-child(2) .s-form-item__star').exists()).toBeTruthy()
    expect(wrapper.find('.s-form-item:nth-child(3) .s-form-item__star').exists()).not.toBeTruthy()

    await (wrapper.vm.$refs.formRef as FormExpose)
      .validate()
      .catch(() => {
        void 0
      })
      .finally(() => {
        expect(wrapper.find('.s-form-item:nth-child(1) .s-form-item__error').text()).toBe(
          'Please input Activity name',
        )
        expect(wrapper.find('.s-form-item:nth-child(2) .s-form-item__error').exists()).toBeTruthy()
        expect(
          wrapper.find('.s-form-item:nth-child(3) .s-form-item__error').exists(),
        ).not.toBeTruthy()
      })
  })
})
