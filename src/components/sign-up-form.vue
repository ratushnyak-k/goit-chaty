<template>
  <div>
    <form novalidate @submit.prevent="validateUser">
      <md-card class=" md-size-50 md-large-size-100">
        <md-card-header>
          <div class="md-display-1">Sign up</div>
        </md-card-header>
        <md-card-content>
          <div class="md-small-size-50">
            <md-field :class="getValidationClass('firstName')">
              <label for="first-name">First Name</label>
              <md-input
                name="first-name"
                id="first-name"
                autocomplete="given-name"
                v-model="form.firstName"
                :disabled="sending"
              />
              <span class="md-error" v-if="!$v.form.firstName.required"
                >The first name is required</span
              >
            </md-field>
          </div>
          <div class=" md-small-size-100">
            <md-field :class="getValidationClass('lastName')">
              <label for="last-name">last Name</label>
              <md-input
                name="last-name"
                id="last-name"
                autocomplete="family-name"
                v-model="form.lastName"
                :disabled="sending"
              />
              <span class="md-error" v-if="!$v.form.lastName.required"
                >The last name is required</span
              >
            </md-field>
          </div>
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
        <md-card-actions>
          <md-button type="submit" class="md-primary md-raised" :disabled="sending"
            >Submit</md-button
          >
        </md-card-actions>
      </md-card>
    </form>
  </div>
</template>
<script>
import { validationMixin } from 'vuelidate';
import { required, email, minLength } from 'vuelidate/lib/validators';
export default {
  name: 'sign-up-form',
  mixins: [validationMixin],
  data: () => ({
    form: {
      firstName: null,
      lastName: null,
      password: null,
      email: null,
    },
    userSaved: false,
    sending: false,
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
        minLength: minLength(8),
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
  props: {
    onSubmit: {
      type: Function,
      required: true,
    },
  },
};
</script>
