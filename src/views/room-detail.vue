<template>
  <div>
    <p v-if="messages.length === 0">No messages yet</p>
    <div class="message" v-for="message in messages" :key="message.createdAt">
      {{ message.value }}
    </div>
    <chat-input :onSubmit="onSubmit"></chat-input>
  </div>
</template>

<script>
import ChatInput from '@/components/chat-input.vue';

export default {
  name: 'room-detail',
  components: {
    ChatInput,
  },
  data() {
    return {
      messages: [],
    };
  },
  methods: {
    onSubmit({ value }) {
      this.messages.push({ value, createdAt: +new Date() });
    },
  },
};
</script>
