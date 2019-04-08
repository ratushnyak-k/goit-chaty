<template>
  <div id="app">
    <router-view />
    <room-item>Some super room name</room-item>
  </div>
</template>

<script>
import roomItem from './components/roomItem.vue';

export default {
  name: 'app',
  components: {
    roomItem,
  },
};
</script>
