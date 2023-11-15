<template>
  <div class="dashboard">
    <div class="dashboard__info">Passed courses: {{ passedCourses }}</div>
    <div class="dashboard__divider"></div>
    <div class="dashboard__courses">
      <CourseItem
        v-for="(course, index) in courses"
        :course="course"
        :key="index"
      />
    </div>
  </div>
</template>
<script>
import { mapState, mapGetters } from "vuex";
import CourseItem from "@/components/CourseItem.vue";
export default {
  name: "DashboardView",
  computed: {
    ...mapState(["courses"]),
    ...mapGetters(["fastestAttempt", "passedCourses"]),
  },
  components: { CourseItem },
  // methods: {
  //   ...mapActions(["fetchCourseData"]),
  // },
  // mounted() {
  //   this.fetchCourseData();
  // },
};
</script>
<style lang="scss">
.dashboard {
  display: flex;
  flex-direction: column;
  padding: 32px;
  &__info {
    width: 100%;
    font-size: 16px;
    font-weight: 500;
    color: #f5f7f8;
  }
  &__divider {
    width: 100%;
    margin: 16px 0;
    height: 1px;
    background-color: #f5f7f8;
  }
  &__courses {
    display: grid;
    gap: 16px;
    grid-template-columns: repeat(3, 1fr);
    @media screen and (max-width: 1024px) {
      grid-template-columns: repeat(2, 1fr);
    }
    @media screen and (max-width: 768px) {
      grid-template-columns: unset;
    }
  }
}
</style>
