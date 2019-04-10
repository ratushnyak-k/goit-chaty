<template>
  <div>
    <form novalidate class="md-layout" @submit.prevent="validateRoom">
      <md-card class="md-layout-item md-size-50 md-small-size-100">
        <md-card-header>
          <div class="md-title" v-if="name">Edit Room</div>
          <div class="md-title" v-if="!name">Add Room</div>
        </md-card-header>

        <md-card-content>
          <div class="md-layout md-gutter">
            <div class="md-layout-item md-small-size-100">
              <md-field :class="getValidationClass('room')">
                <label for="room-name">Room Name </label>

                <md-input
                  name="room-name"
                  id="room-name"
                  autocomplete="given-name"
                  v-model="form.room"
                  :disabled="sending"
                />
                <span class="md-error" v-if="!$v.form.room.required"
                  >The Room name is required</span
                >
                <span class="md-error" v-else-if="!$v.form.room.minlength">Invalid room name</span>
              </md-field>
            </div>
          </div>
        </md-card-content>

        <md-progress-bar md-mode="indeterminate" v-if="sending" />

        <md-card-actions>
          <md-button type="submit" class="md-primary" :disabled="sending" v-if="name"
            >Edit Room</md-button
          >
          <md-button type="submit" class="md-primary" :disabled="sending" v-if="!name"
            >Add Room</md-button
          >
        </md-card-actions>
      </md-card>

      <md-snackbar :md-active.sync="roomSaved"
        >The room {{ lastRoom }} was saved with success!</md-snackbar
      >
    </form>
  </div>
</template>

<script>
import { validationMixin } from 'vuelidate';
import { required, minLength } from 'vuelidate/lib/validators';

export default {
  name: 'FormValidation',
  mixins: [validationMixin],
  props: {
    name: { type: String },
    onSubmit: {
      type: Function,
      require: true,
    },
  },

  data: function() {
    return {
      form: {
        room: '',
      },
      sending: false,
      lastRoom: '',
      roomSaved: false,
    };
  },
  mounted: function() {
    this.form.room = this.name; /*this.$route.params.name||''*/
  },
  validations: {
    form: {
      room: {
        required,
        normalizer: function(value) {
          this.value = (value || '').toString().trim();
          return this.value;
        },
        minLength: minLength(3),
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
      this.form.room = null;
    },

    editRoom() {
      this.sending = true;
      this.lastRoom = this.form.room;

      /* === Instead of this timeout, here you can call your API === */

      window.setTimeout(() => {
        this.sending = false;
        this.roomSaved = true;
        this.onSubmit({ value: this.lastRoom });
        this.clearForm();
      }, 1500);
    },

    validateRoom() {
      this.$v.$touch();

      if (!this.$v.$invalid) {
        this.editRoom();
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
