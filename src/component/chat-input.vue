<template>
  <form @submit.prevent="addMessage">
    <md-field>
      <label for="text_message">Type message...</label>
      <md-input name="text_message" type="text" v-model="value" />
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
  },
  data() {
    return { value: '' };
  },

  methods: {
    addMessage() {
      const newMessage = this.value.trim();
      if (newMessage !== 0) {
        this.onSubmit({ value: newMessage });
      }
      this.value = '';
    },
  },
};
</script>
