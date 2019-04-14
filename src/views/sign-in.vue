<template>
  <div>
    <h1 class="md-title">Sign in</h1>
    <sign-in-form :onSubmit="onSubmitChild" :sending="sending"></sign-in-form>
    <p class="md-body-1">Don`t have an account?<router-link to="/sign-up"> Sign up</router-link></p>
  </div>
</template>

<script>
import SignInForm from '@/components/sign-in-form';
export default {
  components: {
    SignInForm,
  },
  data() {
    return {
      sending: false,
    };
  },
  methods: {
    onSubmitChild(data) {
      console.log(data);
    },
  },
};
</script>

<style>
.md-title,
.md-body-1 {
  text-align: center;
}
</style>
