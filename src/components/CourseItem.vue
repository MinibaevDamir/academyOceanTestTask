<template>
  <div class="course-item">
    <div class="course-item__title">
      {{ course.title }}
    </div>
    <div class="course-item__description">
      {{ course.description }}
    </div>
    <div class="course-item__lessons">Lessons: {{ course.lessons.length }}</div>
    <div class="course-item__user-info" v-if="userCourseInfo">
      <div class="course-item__user-info__attempts">
        User Attemps: {{ userCourseInfo.length }}
      </div>
      <div class="course-item__user-info__date-attempt">
        Date of last attempt: {{ lastAttemptDate }}
      </div>
      <div class="course-item__user-info__course-time">
        Pass Time: {{ course.passTime }}
      </div>
    </div>
    <button @click="goToCourse" class="course-item__pass-btn">
      Pass the course
    </button>
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  name: "CourseItem",
  props: {
    course: Object,
  },
  data() {
    return {
      userCourseInfo: null,
      lastAttemptDate: "",
    };
  },
  computed: {
    ...mapState(["userScore"]),
  },
  methods: {
    goToCourse() {
      this.$router.push(`/courses/${this.course.id}`);
    },
    getInfoAboutUserCourseScore() {
      if (
        Object.keys(this.userScore).length &&
        this.userScore[this.course.id]
      ) {
        this.userCourseInfo = this.userScore[this.course.id];
        let date = new Date(
          this.userCourseInfo[this.userCourseInfo.length - 1].attemptDate
        );
        this.lastAttemptDate =
          date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear();
      }
    },
  },
  mounted() {
    this.getInfoAboutUserCourseScore();
  },
};
</script>
<style lang="scss">
.course-item {
  background-color: #0f8b8d;
  padding: 32px;
  display: flex;
  border-radius: 16px;
  flex-direction: column;
  color: #f5f7f8;
  gap: 16px;
  &__title {
    font-size: 24px;
    font-weight: 600;
  }
  &__description {
    letter-spacing: 0.25px;
  }
  &__lessons {
    font-weight: 500;
  }
  &__lessons,
  &__user-info,
  &__pass-btn {
    align-self: flex-end;
  }
  &__pass-btn {
    background-color: #8b9e2e;
    cursor: pointer;
    color: #f5f7f8;
    font-size: 14px;
    padding: 12px 16px;
    letter-spacing: 1.25px;
    border-radius: 16px;
    font-weight: 600;
    border: unset;
  }
  &__user-info {
    display: flex;
    flex-direction: column;
    gap: 4px;
    font-size: 14px;
  }
}
</style>
