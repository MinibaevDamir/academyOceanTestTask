import { mount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import DashboardView from "@/views/DashboardView.vue"; // Adjust the path accordingly
import CourseItem from "@/components/CourseItem.vue";
import courses from "@/mockups/courses";
import userScore from "@/mockups/userScore";
const localVue = createLocalVue();
localVue.use(Vuex);

describe("DashboardView", () => {
  let wrapper;
  let store;

  beforeEach(() => {
    store = new Vuex.Store({
      state: {
        courses,
        userScore,
      },
      getters: {
        passedCourses: (state) => Object.keys(state.userScore).length, // Replace with actual getter logic
      },
    });

    wrapper = mount(DashboardView, {
      localVue,
      store,
    });
  });

  it("rendering correct passed courses information", () => {
    const infoElement = wrapper.find(".dashboard__info");
    expect(infoElement.text()).toContain("Passed courses: 1");
  });

  it("rendering correct number of CourseItem components", () => {
    const courseItems = wrapper.findAllComponents(CourseItem);
    expect(courseItems.length).toBe(courses.length);
    
  });
});
