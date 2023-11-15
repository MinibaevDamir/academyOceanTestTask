import Vue from "vue";
import Vuex from "vuex";
import courses from "@/mockups/courses";
import {
  SET_COURSE_DATA,
  SET_CURRENT_COURSE,
  UPDATE_USER_SCORE,
} from "@/constants/mutation_types";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    courses,
    currentCourse: {},
    userScore: JSON.parse(localStorage.getItem("userScore")) || {},
  },
  getters: {
    passedCourses: (state) => Object.keys(state.userScore).length,
  },
  mutations: {
    [SET_COURSE_DATA](state, data) {
      state.courses = data;
    },
    [SET_CURRENT_COURSE](state, course) {
      state.currentCourse = course;
    },
    [UPDATE_USER_SCORE](state, { courseId, score }) {
      if (!state.userScore[courseId]) {
        state.userScore[courseId] = [];
      }
      state.userScore[courseId].push(score);
    },
  },
  actions: {
    fetchCourseData() {
      const res = axios.get("YOUR_API");
      this.commit(SET_COURSE_DATA, res);
    },
    getCurrentCourseData({ state }, id) {
      const course = state.courses.find((el) => el.id == id);
      this.commit(SET_CURRENT_COURSE, course);
    },
    updateUserScore({ state }, { courseId, attemptTime }) {
      const attemptDate = new Date();
      this.commit(UPDATE_USER_SCORE, {
        courseId,
        score: { attemptTime, attemptDate },
      });
      localStorage.setItem("userScore", JSON.stringify(state.userScore));
    },
  },
  modules: {},
});
