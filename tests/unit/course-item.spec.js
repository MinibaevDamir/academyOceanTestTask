import { mount, createLocalVue } from "@vue/test-utils";
import CourseItem from "@/components/CourseItem.vue"; // Adjust the path accordingly
import courses from "@/mockups/courses";
import userScore from "@/mockups/userScore";
import Vuex from "vuex";
const localVue = createLocalVue();
localVue.use(Vuex);

describe("CourseItem", () => {
  let wrapper;
  let store;
  beforeEach(() => {
    store = new Vuex.Store({
      state: {
        userScore,
      },
    });
    wrapper = mount(CourseItem, {
      localVue,
      store,
      propsData: {
        course: courses[0],
      },
      mocks: {
        $router: {
          push: jest.fn(),
        },
      },
      data() {
        return {
          userCourseInfo: null,
          lastAttemptDate: "16/11/2023", // Replace with actual data
        };
      },
    });
  });

  it("renders course information correctly", () => {
    expect(wrapper.find(".course-item__title").text()).toBe(
      "Exploring Our World: A Journey Through Geography"
    );
    expect(wrapper.find(".course-item__lessons").text()).toContain(
      "Lessons: 2"
    );
  });

  it("renders user information if available", () => {
    expect(wrapper.find(".course-item__user-info__attempts").text()).toContain(
      "User Attemps: 5"
    );
    expect(
      wrapper.find(".course-item__user-info__date-attempt").text()
    ).toContain("Date of last attempt: 16/10/2023");
    expect(
      wrapper.find(".course-item__user-info__course-time").text()
    ).toContain("Pass Time: 1 hour");
  });

  it('emits router push when "Pass the course" button is clicked', async () => {
    await wrapper.find(".course-item__pass-btn").trigger("click");
    expect(wrapper.vm.$router.push).toHaveBeenCalledWith(
      `/courses/1`
    );
  });
});
