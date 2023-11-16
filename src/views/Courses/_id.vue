<template>
  <div class="course">
    <div class="course__header">
      <div class="course__header__lesson-topic">
        {{ currentLesson.lessonTopic }}
      </div>
      <button class="course__header__dashboard-btn" @click="goToDashboard">
        Go To Dashboard
      </button>
    </div>
    <div class="course__content" v-html="currentLesson.textOfLesson"></div>
    <div
      :class="[
        'course__action-wrapper',
        showBackBtn ? 'justify-between' : 'justify-end',
      ]"
    >
      <button
        class="course__action-wrapper__back-btn"
        @click="back"
        v-if="showBackBtn"
      >
        Get Back
      </button>
      <button class="course__action-wrapper__next-btn" @click="next">
        {{ nextBtnText }}
      </button>
    </div>
  </div>
</template>
<script>
import { mapState, mapActions } from "vuex";

export default {
  name: "CourseView",
  data() {
    return {
      currentLesson: {},
      lessonNumber: 1,
      attemptTime: 0,
      courseId: this.$route.params.id,
    };
  },
  computed: {
    ...mapState(["currentCourse", "userScore"]),
    nextBtnText() {
      return this.lessonNumber === this.currentCourse.lessons?.length
        ? "Finish Course"
        : "Next Lesson";
    },
    showBackBtn() {
      return this.lessonNumber !== 1;
    },
  },
  methods: {
    ...mapActions(["getCurrentCourseData", "updateUserScore"]),
    getCurrentLessonContent() {
      this.currentLesson = this.currentCourse.lessons[this.lessonNumber - 1];
    },
    setCurrentLesson(value) {
      this.lessonNumber = value;
      this.getCurrentLessonContent();
    },
    next() {
      if (this.lessonNumber !== this.currentCourse.lessons.length) {
        this.setCurrentLesson(this.lessonNumber + 1);
      } else {
        this.finishCourse();
      }
    },
    back() {
      this.setCurrentLesson(this.lessonNumber - 1);
    },
    goToDashboard() {
      this.$router.push("/dashboard");
    },
    finishCourse() {
      this.updateUserScore({
        courseId: this.courseId,
        attemptTime: this.attemptTime,
      });
      this.goToDashboard();
    },
  },
  mounted() {
    this.getCurrentCourseData(this.courseId);
    this.getCurrentLessonContent();
    setInterval(() => {
      this.attemptTime = this.attemptTime + 0.25;
    }, 250);
  },
};
</script>
<style lang="scss">
.justify-end {
  justify-content: flex-end;
}
.justify-between {
  justify-content: space-between;
}
.course {
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 32px;
  color: $neutral-gray;
  &__header,
  &__action-wrapper {
    display: flex;
    padding: 16px;
  }
  &__header {
    justify-content: space-between;
    &__lesson-topic {
      letter-spacing: 0.75px;
      font-size: 28px;
      font-weight: 600;
    }
    &__dashboard-btn {
      background-color: $moss-green;
      cursor: pointer;
      color: $neutral-gray;
      font-size: 14px;
      padding: 12px 16px;
      letter-spacing: 1.25px;
      border-radius: 16px;
      font-weight: 600;
      border: unset;
    }
  }
  &__content {
    background-color: $neutral-gray;
    color: $charcoal-gray;
    padding: 32px;
    border-radius: 32px;
  }
  &__action-wrapper {
    &__next-btn,
    &__back-btn {
      @include course_btn();
      padding: 12px 16px;
      border-radius: 16px;
    }
    &__back-btn {
      background-color: $neutral-gray;
      color: $charcoal-gray;
    }
  }
}
</style>
