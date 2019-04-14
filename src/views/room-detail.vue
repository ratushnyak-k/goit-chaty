<template>
  <div class="room-scr">
    <div class="form-content">
      <md-list v-if="messages.length">
        <chat-item
          :message="message"
          v-for="message in messages"
          :key="message.createdAt"
        ></chat-item>
      </md-list>
      <p v-else>No messages yet</p>
    </div>
    <chat-input :onSubmit="onSubmit"></chat-input>
    <md-progress-bar md-mode="indeterminate" v-if="loading" />
  </div>
</template>

<style lang="css" scoped>
.room-scr {
  display: flex;
  flex-direction: column;
  height: 100%;
}
.form-content {
  margin-top: auto;
}
</style>

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
        .collection('messages')
        .orderBy('createdAt')
        .onSnapshot((snapshot) => {
          this.messages = [];
          snapshot.forEach((s) => {
            this.messages.push({ ...s.data(), id: s.id });
          });

          const scroller = this.$el.querySelector('.form-content');
          setTimeout(() => {
            scroller.scrollTo(0, scroller.scrollHeight);
          });
          this.loading = false;
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
        })
        .then(() => {
          const scroller = this.$el.querySelector('.form-content');
          scroller.scrollTo(0, scroller.scrollHeight);
        });
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
.form-content {
  overflow: auto;
  margin-top: auto;
  max-height: calc(100% - 80px);
}
</style>
