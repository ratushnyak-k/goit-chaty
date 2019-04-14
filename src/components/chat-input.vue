<template>
  <form @submit.prevent="addMessage">
    <md-field>
      <label for="text_message">Type message...</label>
      <md-input name="text_message" type="text" v-model.trim="value" :disabled="loading" />
    </md-field>
  </form>
</template>

<script>
export default {
  name: 'chat-input',
  props: {
    onSubmit: {
      type: Function,
      required: true,
    },
    loading: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  data() {
    return { value: '' };
  },

  methods: {
    addMessage() {
      if (this.value) {
        this.onSubmit({ value: this.value });
        this.value = '';
      }
    },
  },
};
</script>
