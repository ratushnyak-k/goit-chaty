<template>
  <form>
    <label for="text_message">Type message...</label>
    <input name="text_message" type="text" v-model="value">
  </form>
</template>

<script>
export default {
  name: 'chat-input',
  props: { onSubmit: { type: Function } },
  data: function() {
    return { value: '' };
  },

  methods: {
    addMessage() {
      const newMessage = this.value.trim();
      if (newMessage != 0) {
        return this.onSubmit({ value: this.value });
        this.value = '';
      }
    },
  },
};
</script>


<style lang="scss" scoped>
.input {
  width: 100%;
  padding: 8px 10px;
  border: 1px solid $vue-blue;
}
</style>