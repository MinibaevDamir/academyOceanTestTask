import { mount, createLocalVue } from "@vue/test-utils";
import LoginView from "@/views/LoginView.vue"; // Adjust the path accordingly

const localVue = createLocalVue();

describe("LoginView", () => {
  it("should authorize user on form submission", async () => {
    const wrapper = mount(LoginView, {
      localVue,
      mocks: {
        $router: {
          push: jest.fn(),
        },
      },
    });

    const setItem = jest.spyOn(Storage.prototype, "setItem");

    const emailInput = wrapper.find(".login__form__email-input");
    await emailInput.setValue("testMethod@example.com");

    await wrapper.find(".login__form").trigger("submit.prevent");

    expect(setItem).toHaveBeenCalledWith("isLoggedIn", true);

    expect(wrapper.vm.$router.push).toHaveBeenCalledWith("/dashboard/");
  });
});
