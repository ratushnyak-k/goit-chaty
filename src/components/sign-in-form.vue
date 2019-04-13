<template>
  <form novalidate class="md-layout" @submit.prevent="validateUser">
    <md-card class="md-layout-item">
      <md-card-content>
        <md-field :class="getValidationClass('email')">
          <label for="email">Email</label>
          <md-input
            type="email"
            name="email"
            id="email"
            autocomplete="email"
            v-model="form.email"
            :disabled="sending"
          />
          <span class="md-error" v-if="!$v.form.email.required">The field is required</span>
          <span class="md-error" v-else-if="!$v.form.email.email">Invalid email</span>
        </md-field>
        <md-field :class="getValidationClass('password')">
          <label for="password">Password</label>
          <md-input
            type="password"
            name="password"
            id="password"
            autocomplete="password"
            v-model="form.password"
            :disabled="sending"
          />
          <span class="md-error" v-if="!$v.form.password.required">The field is required</span>
        </md-field>
      </md-card-content>

      <md-progress-bar md-mode="indeterminate" v-if="sending" />

      <md-card-actions>
        <md-button type="submit" class="md-raised md-primary" :disabled="sending">Submit</md-button>
      </md-card-actions>
    </md-card>
  </form>
</template>

<script>
import { validationMixin } from 'vuelidate';
import { required, email } from 'vuelidate/lib/validators';

export default {
  name: 'sign-in-form',
  mixins: [validationMixin],
  props: {
    onSubmit: {
      type: Function,
      required: true,
    },
    sending: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  data: () => ({
    form: {
      email: '',
      password: '',
    },
  }),
  validations: {
    form: {
      password: {
        required,
      },
      email: {
        required,
        email,
      },
    },
  },
  methods: {
    getValidationClass(fieldName) {
      const field = this.$v.form[fieldName];

      if (field) {
        return {
          'md-invalid': field.$invalid && field.$dirty,
        };
      }
    },
    clearForm() {
      this.$v.$reset();
      this.form.password = null;
      this.form.email = null;
    },

    validateUser() {
      this.$v.$touch();

      if (!this.$v.$invalid) {
        this.onSubmit({ ...this.form });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.md-progress-bar {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
}
</style>
