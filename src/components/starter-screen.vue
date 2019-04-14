<template>
  <md-empty-state md-icon="chat" md-label="Wellcom To Chaty">
    <md-button class="md-primary md-raised" @click="onAddRoom">Create first room</md-button>
  </md-empty-state>
</template>

<script>
export default {
  name: 'starter-screen',
  props: {
    onAddRoom: {
      type: Function,
      required: true,
    },
  },
};
</script>
