<template>
  <div>
    <div v-if="messages.length">
      <div class="message" v-for="message in messages" :key="message.createdAt">
        {{ message.value }}
      </div>
    </div>
    <p v-else>No messages yet</p>
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
