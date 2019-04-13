<template>
  <div>
    <md-list v-if="messages.length">
      <chat-item
        :message="message"
        v-for="message in messages"
        :key="message.createdAt"
      ></chat-item>
    </md-list>
    <p v-else>No messages yet</p>
    <chat-input :onSubmit="onSubmit"></chat-input>
  </div>
</template>

<script>
import ChatInput from '@/components/chat-input.vue';
import ChatItem from '@/components/chat-item.vue';

export default {
  name: 'room-detail',
  components: {
    ChatInput,
    ChatItem,
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
