<template>
  <div class="page-container">
    <md-app md-waterfall md-mode="fixed">
      <md-app-toolbar class="md-primary">
        <span class="md-title">ROOM</span>
      </md-app-toolbar>

      <md-app-drawer md-permanent="full">
        <md-toolbar class="md-transparent" md-elevation="0">
          Rooms 
          <md-button class="md-icon-button" @click="onAddRoom">
            <md-icon>add</md-icon>
          </md-button>
        </md-toolbar>
        <md-divider></md-divider>

        <md-list>
          <room-item v-for="room in rooms" :key="room.id">{{ room.name }} 
            <md-button class="md-icon-button" @click="onEditRoom">
              <md-icon>edit</md-icon>
            </md-button>
            <md-button class="md-icon-button" @click="showDialogType = 'delete'">
              <md-icon>delete</md-icon>
            </md-button></room-item>
        </md-list>
        <md-button class="md-raised md-accent">Logout</md-button>
      </md-app-drawer>

      <md-app-content>
        <md-dialog-confirm
        :md-active.sync="showDeleteDialog"
        md-title="Confirm delete Room?"
        md-content="Confirm delete Room"
        md-confirm-text="Delete"
        md-cancel-text="Cancel"
        @md-cancel="onCloseDialog"
        @md-confirm="onDeleteRoom"
        />

        <md-dialog
        :md-active.sync="showAddEditDialog"
        :md-close-on-esc="true"
        :md-click-outside-to-close="true"
        >
        <EditRoom :onSubmit="dialogData.onSubmit" :onClose="onCloseDialog" :name="dialogData.name"></EditRoom>
        </md-dialog>
        
      </md-app-content>
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
import EditRoom from '@/components/edit-room-form';
export default {
  name: 'rooms-list',
  components: {
    RoomItem,
    EditRoom,
  },
  data: () => ({

    showDialogType: '',
    dialogData: {},
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
  }),
  computed: {
    showAddEditDialog: {
      get() {
        return ['add', 'edit'].includes(this.showDialogType);
      },
      set() {},
    },
    showDeleteDialog: {
      get() {
        return this.showDialogType === 'delete';
      },
      set() {},
    },
  },
  methods: {
    onAddRoom() {
      this.showDialogType = 'add';
      this.dialogData = {
        onSubmit: (formData) => {
          console.log(formData);
          this.onCloseDialog();
        },
        name: '',
      };
    },
    onEditRoom() {
      this.showDialogType = 'edit';
      this.dialogData = {
        name: 'Room name',
        id: 1,
        onSubmit: (formData) => {
          console.log(formData);
          this.onCloseDialog();
        },
      };
    },
    onDeleteRoom() {
      this.showDialogType = '';
    },
    onCloseDialog() {
      this.showDialogType = '';
      this.dialogData = {};
    },
  },
};
</script>
