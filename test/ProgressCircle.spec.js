/* eslint-disable */
import { mount } from '@vue/test-utils'
import ProgressCircle from '@/components/ProgressCircle.vue'

describe('ProgressCirlce', () => {
  const build = () => {
    const wrapper = mount(ProgressCircle)

    return {
      wrapper,
      update: () => wrapper.find('.circle__content')
    }
  }
  it('calls "submitted" event when submitting form', () => {
    const { wrapper, update } = build()

    update().trigger('click')

    expect(wrapper.emitted().submitted[0]).toEqual([expectedUser])
  })
})
