import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import App from '../App.vue'

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, ms)
  });
}

describe('App', () => {
  it('mounts renders properly', () => {
    const wrapper = mount(App)
    expect(wrapper.text()).toContain('branas.io')
  })

  it("Deve criar uma conta", async () => {
    const wrapper = mount(App, {});
    await wrapper.get(".input-name").setValue("John Doe");
    await wrapper.get(".input-email").setValue("john.doe@example.com");
    await wrapper.get(".input-document").setValue("123.456.789-09");
    await wrapper.get(".input-password").setValue("THOmoraes123");
    await wrapper.get(".button-signup").trigger("click");

    await sleep(200);

    expect(wrapper.get(".span-message").text()).toBe("success");
    expect(wrapper.get(".span-account-id").text()).toBeDefined();
  });

  it("Não deve criar uma conta se o nome for inválido", async () => {
    const wrapper = mount(App, {});
    await wrapper.get(".input-name").setValue("John");
    await wrapper.get(".input-email").setValue("john.doe@example.com");
    await wrapper.get(".input-document").setValue("123.456.789-09");
    await wrapper.get(".input-password").setValue("THOmoraes123");
    await wrapper.get(".button-signup").trigger("click");

    await sleep(200);

    expect(wrapper.get(".span-message").text()).toBe("Invalid name");
    expect(wrapper.get(".span-account-id").text()).toBe("");
  });
})
