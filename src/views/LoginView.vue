<template>
  <div class="login__container">
    <form class="login__form" @submit="authorize">
      <span class="login__form__title">Login Form</span>
      <input
        type="email"
        class="login__form__email-input"
        id="email"
        required
      />
      <button type="submit" class="login__form__submit-btn">Submit</button>
    </form>
  </div>
</template>

<script>
export default {
  name: "LoginView",
  components: {},
  methods: {
    authorize() {
      localStorage.setItem("isLoggedIn", true);
      this.$router.push("/dashboard/");
    },
  },
};
</script>
<style lang="scss">
.login {
  &__container {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    min-height: 100vh;
  }
  &__form {
    background-color: $dark-cyan;
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 8px;
    gap: 24px;
    max-width: 640px;
    max-height: 320px;
    padding: 16px 24px;
    &__title {
      font-size: 20px;
      font-weight: 500;
      letter-spacing: 1.25px;
      color: $neutral-gray;
    }
    &__email-input {
      padding: 8px 12px;
      font-size: 14px;
      font-weight: 500;
      border-radius: 8px;
      background-color: $neutral-gray;
      outline: none;
      border: unset;
    }
    &__submit-btn {
      @include course_btn();
      padding: 8px;
      width: 100%;
      border-radius: 8px;
    }
  }
}
</style>
