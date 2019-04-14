<template>
  <div class="container">
    <h1 class="md-title">Sign in</h1>
    <sign-in-form :onSubmit="onSubmit" :sending="sending"></sign-in-form>
    <p class="md-body-1">Don`t have an account?<router-link to="/sign-up"> Sign up</router-link></p>
    <md-snackbar :md-active.sync="showSnack" md-persistent>
      <span>{{ error }}</span>
      <md-button class="md-primary" @click="showSnack = false">Close</md-button>
    </md-snackbar>
  </div>
</template>

<script>
import SignInForm from '../components/sign-in-form';
import firebase from 'firebase/app';
import 'firebase/auth';

export default {
  components: {
    SignInForm,
  },
  data: () => ({
    sending: false,
    error: '',
    showSnack: false,
  }),
  methods: {
    onSubmit(data, clear) {
      this.sending = true;
      firebase
        .auth()
        .signInWithEmailAndPassword(data.email, data.password)
        .then(() => {
          this.sending = false;
          this.$router.push('/rooms');
        })
        .catch((error) => {
          this.showSnack = true;
          this.error = error;
          this.sending = false;
        });
    },
  },
};
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
}
.md-title,
.md-body-1 {
  text-align: center;
}
</style>
