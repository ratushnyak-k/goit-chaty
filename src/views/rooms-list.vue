<template>
  <div class="page-container">
    <md-app md-waterfall md-mode="fixed">
      <md-app-toolbar class="md-primary">
        <span class="md-title">ROOM</span>
      </md-app-toolbar>

      <md-app-drawer md-permanent="full">
        <md-toolbar class="md-transparent" md-elevation="0">
          Rooms
          <md-button class="md-icon-button">
            <md-icon>add</md-icon>
          </md-button>
        </md-toolbar>
        <md-divider></md-divider>

        <md-list>
          <room-item v-for="room in rooms" v-bind:key="room.id" v-bind:name="room.name">{{
            room.name
          }}</room-item>
        </md-list>
        <md-button class="md-raised md-accent">Logout</md-button>
      </md-app-drawer>

      <md-app-content> </md-app-content>
    </md-app>
  </div>
</template>

<style lang="scss" scoped>
.md-app {
  max-height: 400px;
  border: 1px solid rgba(#000, 0.12);
}

.md-drawer {
  width: 230px;
  max-width: calc(100vw - 125px);
}
.md-app-drawer {
  display: flex;
  flex-direction: column;
}
.md-raised {
  margin-top: auto;
}
</style>

<script>
import roomItem from '@/components/room-item.vue';

export default {
  name: 'rooms-list',
  components: {
    roomItem,
  },
  data: function() {
    return {
      rooms: [
        { id: 1, name: 'Room name 1', creatorId: 1 },
        { id: 2, name: 'Room name 2', creatorId: 2 },
        { id: 3, name: 'Room name 3', creatorId: 3 },
      ],
    };
  },
};
</script>
