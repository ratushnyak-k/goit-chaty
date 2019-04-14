<template>
   <div class="container">
    <h1 class="md-title">Sign up</h1>
    <sign-up-form :onSubmit="onSubmit" :sending="sending"></sign-up-form>
    <p class="md-body-1">Already have an account <router-link to="/sign-in">Sign in</router-link></p>
    <md-snackbar :md-active.sync="showSnack" md-persistent>
      <span>{{ error }}</span>
      <md-button class="md-primary" @click="showSnack = false">Close</md-button>
    </md-snackbar>
  </div>
</template>

<script>
import firebase from 'firebase/app';
import SignUpForm from '../components/sign-up-form';
import { usersCollection } from '../main';
import omit from 'lodash.omit';
export default {
  components: {
    SignUpForm,
  },
  data: () => ({
    sending: false,
    error: '',
    showSnack: false,
  }),
  methods: {
    onSubmit(data) {
      this.sending = true;
      firebase
        .auth()
        .createUserWithEmailAndPassword(data.email, data.password)
        .then(({ user }) =>
          usersCollection
            .doc(user.uid)
            .set(omit(data, 'password'))
            .then(() => {
              this.sending = false;
              this.$router.push('/rooms');
            })
        )
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

