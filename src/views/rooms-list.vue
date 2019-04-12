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
          <room-item v-for="room in rooms" :key="room.id">{{ room.name }}</room-item>
        </md-list>
        <md-button class="md-raised md-accent">Logout</md-button>
      </md-app-drawer>

      <md-app-content></md-app-content>
    </md-app>
  </div>
</template>

<style lang="scss" scoped>
.md-app {
  height: 100vh;
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
.md-list {
  overflow-x: auto;
  height: 100%;
}
.md-raised {
  margin-top: auto;
}
</style>

<script>
import RoomItem from '@/components/room-item.vue';

export default {
  name: 'rooms-list',
  components: {
    RoomItem,
  },
  data() {
    return {
      rooms: [
        { id: 1, name: 'Room name 1', creatorId: 1 },
        { id: 2, name: 'Room name 2', creatorId: 2 },
        { id: 3, name: 'Room name 3', creatorId: 3 },
        { id: 1, name: 'Room name 1', creatorId: 1 },
        { id: 2, name: 'Room name 2', creatorId: 2 },
        { id: 3, name: 'Room name 3', creatorId: 3 },
        { id: 1, name: 'Room name 1', creatorId: 1 },
        { id: 2, name: 'Room name 2', creatorId: 2 },
        { id: 3, name: 'Room name 3', creatorId: 3 },
        { id: 1, name: 'Room name 1', creatorId: 1 },
        { id: 2, name: 'Room name 2', creatorId: 2 },
        { id: 3, name: 'Room name 3', creatorId: 3 },
        { id: 1, name: 'Room name 1', creatorId: 1 },
        { id: 2, name: 'Room name 2', creatorId: 2 },
        { id: 3, name: 'Room name 3', creatorId: 3 },
      ],
    };
  },
};
</script>
