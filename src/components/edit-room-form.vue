<template>
  <form novalidate class="md-layout" @submit.prevent="validateRoom">
    <md-card class="md-layout-item">
      <md-card-header>
        <div class="md-title">{{ name ? `Edit ${name}` : 'Add room' }}</div>
      </md-card-header>

      <md-card-content>
        <div class="md-layout md-gutter">
          <div class="md-layout-item">
            <md-field :class="getValidationClass('room')">
              <label for="room-name">Room Name</label>

              <md-input
                name="room-name"
                id="room-name"
                autocomplete="given-name"
                v-model="form.room"
                :disabled="sending"
              />
              <span class="md-error" v-if="!$v.form.room.required">The Room name is required</span>
            </md-field>
          </div>
        </div>
      </md-card-content>

      <md-progress-bar md-mode="indeterminate" v-if="sending" />

      <md-card-actions>
        <md-button type="button" class="md-primary" :disabled="sending" @click="onClose">
          Close
        </md-button>
        <md-button type="submit" class="md-primary" :disabled="sending"
        >{{ name ? 'Edit' : 'Add' }} Room</md-button
        >
      </md-card-actions>
    </md-card>

    <md-snackbar :md-active.sync="roomSaved">
      The room {{ lastRoom }} was saved with success!
    </md-snackbar>
  </form>
</template>

<script>
  import { validationMixin } from 'vuelidate';
  import { required } from 'vuelidate/lib/validators';
  export default {
    name: 'edit-room-form',
    mixins: [validationMixin],
    props: {
      name: {
        type: String,
        required: false,
        default: '',
      },
      sending: {
        type: Boolean,
        required: false,
        default: false,
      },
      onClose: {
        type: Function,
        require: true,
      },
      onSubmit: {
        type: Function,
        require: true,
      },
    },
    data() {
      return {
        form: {
          room: '',
        },
        lastRoom: '',
        roomSaved: false,
      };
    },
    validations: {
      form: {
        room: {
          required,
          normalizer(value) {
            let str = value.toString();
            this.value = str.trim();
            return this.value;
          },
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
        this.lastRoom = this.form.room;
        this.onSubmit({ name: this.lastRoom });
        this.clearForm();
        this.roomSaved = true;
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
