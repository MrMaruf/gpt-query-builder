import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import CopyToClipboard from '../CopyToClipboard.vue'

describe('CopyToClipboard', () => {
  it('renders properly', () => {
    const wrapper = mount(CopyToClipboard, { props: { name:"Vitest", toCopy: 'text to copy' } })
    expect(wrapper.text()).toContain('Copy Vitest to clipboard')
  })
})
