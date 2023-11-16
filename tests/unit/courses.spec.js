import { mount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import CourseView from "@/views/Courses/_id.vue"; // Adjust the path accordingly
import courses from "@/mockups/courses";
import userScore from "@/mockups/userScore";

const localVue = createLocalVue();
localVue.use(Vuex);

describe("CourseView", () => {
  let wrapper;
  let store;

  beforeEach(() => {
    store = new Vuex.Store({
      state: {
        currentCourse: courses[0],
        userScore,
      },
      actions: {
        getCurrentCourseData: jest.fn(),
        updateUserScore: jest.fn(),
      },
    });

    wrapper = mount(CourseView, {
      localVue,
      store,
      mocks: {
        $route: {
          params: { id: 1 },
        },
        $router: {
          push: jest.fn(),
        },
      },
    });
  });

  it("renders course information correctly", () => {
    expect(wrapper.find(".course__header__lesson-topic").text()).toBe(
      "Lesson 1: Understanding Physical Geography"
    );
    expect(wrapper.find(".course__content").text()).toContain(
      "Unlocking the Secrets of Earth's Physical Features"
    );
  });

  it("renders next button text based on lesson number", async () => {
    // Initial state
    expect(wrapper.find(".course__action-wrapper__next-btn").text()).toBe(
      "Next Lesson"
    );

    // Set lesson number to the last lesson
    await wrapper.setData({
      lessonNumber: 2,
    });
    expect(wrapper.find(".course__action-wrapper__next-btn").text()).toBe(
      "Finish Course"
    );
  });

  it('emits router push when "Go To Dashboard" button is clicked', async () => {
    await wrapper.find(".course__header__dashboard-btn").trigger("click");
    expect(wrapper.vm.$router.push).toHaveBeenCalledWith("/dashboard");
  });

  it('emits router push when "Next Lesson" button is clicked', async () => {
    await wrapper.find(".course__action-wrapper__next-btn").trigger("click");
    expect(wrapper.vm.lessonNumber).toBe(2);
  });

  it('emits router push when "Get Back" button is clicked', async () => {
    // Set lesson number to 2
    await wrapper.setData({ lessonNumber: 2 });
    await wrapper.find(".course__action-wrapper__back-btn").trigger("click");
    expect(wrapper.vm.lessonNumber).toBe(1);
  });

  // Add more tests as needed for specific component behaviors
});
