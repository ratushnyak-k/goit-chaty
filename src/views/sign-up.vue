<template>
    <div>
    <h1>Sign up</h1>
    <SignUpForm :onSubmit="onSubmit"></SignUpForm>
    <p>Already have an account?<a href=" ">Sign in</a></p>
    </div>
</template>

<script>
import SignUpForm from '@/components/sign-up-form';
export default {
  name: 'SignUpForm',
   data() {
    return {
      sending:false;
    };
  },
    methods: {
        onSubmit(data) {
            console.log(data)
    },
    }
  },
};

</script>

<style lang="scss" scoped>

</style>