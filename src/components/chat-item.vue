<template>
  <md-list-item>
    <md-avatar class="md-avatar-icon md-large md-accent">
      <md-ripple>{{ avatarName }}</md-ripple>
    </md-avatar>
    <div class="md-list-item-text">
      <div class="inform_creator">
        <b>{{ fullName }}</b>
        <span>{{ timeCreation }}</span>
      </div>
      <p>{{ message.value }}</p>
    </div>
  </md-list-item>
</template>
<script>
export default {
  name: 'chat-item',
  props: {
    message: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      user: null,
    };
  },

  computed: {
    timeCreation() {
      return new Date(this.message.createdAt).toLocaleTimeString('en-US');
    },
    fullName() {
      if (!this.user) {
        return null;
      }
      return this.user.firstName + ' ' + this.user.lastName;
    },
    avatarName() {
      if (!this.user) {
        return null;
      }
      return this.user.firstName[0] + this.user.lastName[0];
    },
  },
};
</script>

<style scoped>
p {
  white-space: normal;
}
.inform_creator span {
  font-size: 12px;
  color: #4d4d4d;
}
</style>
