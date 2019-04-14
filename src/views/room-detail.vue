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
    <md-progress-bar md-mode="indeterminate" class="md-accent" v-if="loading" :loading="loading" />
  </div>
</template>

<script>
import ChatInput from '@/components/chat-input.vue';
import ChatItem from '@/components/chat-item.vue';
import firebase from 'firebase/app';
import { usersCollection, roomsCollection } from '../main';

export default {
  name: 'room-detail',
  components: {
    ChatInput,
    ChatItem,
  },
  data: () => ({
    messages: [],
    user: null,
    loading: false,
  }),
  firestore() {
    return {
      user: usersCollection.doc(firebase.auth().currentUser.uid),
    };
  },
  created() {
    this.onUpdate();
  },
  watch: {
    '$route.params.id'() {
      this.onUpdate();
    },
  },
  methods: {
    onUpdate() {
      this.loading = true;
      roomsCollection
        .doc(this.$route.params.id)
        .get()
        .then((data) => {
          if (data.exists) {
            data.ref
              .collection('messages')
              .orderBy('createdAt')
              .onSnapshot((snapshot) => {
                this.messages = [];
                snapshot.forEach((s) => {
                  this.messages.push({ ...s.data(), id: s.id });
                });
                this.loading = false;
              });
          } else {
            this.$router.replace('/rooms');
          }
        });
    },
    onSubmit(data) {
      roomsCollection
        .doc(this.$route.params.id)
        .collection('messages')
        .add({
          ...data,
          creatorId: this.user.id,
          createdAt: +new Date(),
        });
    },
  },
};
</script>

<style lang="scss">
.md-app-scroller {
  position: relative;
}
.md-progress-bar {
  position: absolute !important;
  top: 0;
  right: 0;
  left: 0;
}
</style>
