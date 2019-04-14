<template>
  <form novalidate @submit.prevent="validateUser">
    <md-card class="md-layout-item">
      <md-card-content>
          <md-field :class="getValidationClass('firstName')">
            <label for="first-name">First Name</label>
            <md-input
              name="first-name"
              id="first-name"
              autocomplete="given-name"
              v-model="form.firstName"
              :disabled="sending"
            />
            <span class="md-error" v-if="!$v.form.firstName.required">
              The first name is required
            </span>
          </md-field>
    
          <md-field :class="getValidationClass('lastName')">
            <label for="last-name">last Name</label>
            <md-input
              name="last-name"
              id="last-name"
              autocomplete="family-name"
              v-model="form.lastName"
              :disabled="sending"
            />
            <span class="md-error" v-if="!$v.form.lastName.required">
              The last name is required
            </span>
          </md-field>
     
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
          <span class="md-error" v-if="!$v.form.email.required">The email is required</span>
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
          <span class="md-error" v-if="!$v.form.password.required">The password is required</span>
        </md-field>
      </md-card-content>
      <md-progress-bar md-mode="indeterminate" v-if="sending" />

      <md-card-actions>
        <md-button type="submit" class="md-primary md-raised" :disabled="sending">
          Submit
        </md-button>
      </md-card-actions>
    </md-card>
  </form>
</template>
<script>
import { validationMixin } from 'vuelidate';
import { required, email } from 'vuelidate/lib/validators';
export default {
  name: 'sign-up-form',
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
      firstName: null,
      lastName: null,
      password: null,
      email: null,
    },
  }),
  validations: {
    form: {
      firstName: {
        required,
      },
      lastName: {
        required,
      },
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
      this.form.firstName = null;
      this.form.lastName = null;
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
.md-card {
  margin-left: auto;
  margin-right: auto;
}
</style>


