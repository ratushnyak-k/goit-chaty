<template>
  <div class="page-container">
    <md-app md-waterfall md-mode="fixed">
      <md-app-toolbar class="md-primary">
        <div class="md-toolbar-row">
          <div class="md-toolbar-section-start">
            <md-button class="md-icon-button menu-btn" @click="menuVisible = !menuVisible">
              <md-icon>menu</md-icon>
            </md-button>

            <room-item
              v-if="activeRoom && $route.params.id"
              :onEditClick="onEditRoom"
              :onDeleteClick="onDeleteRoom"
              showActionButtons
              :data="activeRoom"
              :key="activeRoom.id"
            />
          </div>
        </div>
      </md-app-toolbar>

      <md-app-drawer md-permanent="full" :md-active.sync="menuVisible">
        <md-list>
          <md-list-item>
            <md-avatar class="md-avatar-icon md-large md-accent">
              <md-ripple>{{ avatarName }}</md-ripple>
            </md-avatar>
            <div class="md-list-item-text">
              <div class="inform_creator">
                <b>{{ fullName }}</b>
              </div>
            </div>
          </md-list-item>
        </md-list>

        <md-toolbar class="md-transparent" md-elevation="0">
          Rooms
          <md-button class="md-icon-button" @click="onAddRoom">
            <md-icon>add</md-icon>
          </md-button>
        </md-toolbar>
        <md-divider></md-divider>

        <md-list>
          <md-list-item v-for="room in rooms" :key="room.id">
            <room-item
              :onEditClick="onEditRoom"
              :onDeleteClick="onDeleteRoom"
              showActionButtons
              :data="room"
            />
          </md-list-item>
        </md-list>
        <md-button class="md-raised md-accent" @click="logOut">Logout</md-button>
      </md-app-drawer>

      <md-app-content>
        <md-dialog-confirm
          v-if="showDeleteDialog"
          :md-active.sync="showDeleteDialog"
          md-title="Are you sure?"
          md-content="Do you really want to remove this room?"
          md-confirm-text="Delete"
          md-cancel-text="Cancel"
          @md-cancel="onCloseDialog"
          @md-confirm="dialogData.onSubmit"
        />

        <md-dialog :md-active.sync="showAddEditDialog" v-if="showAddEditDialog">
          <edit-room-form
            :onSubmit="dialogData.onSubmit"
            :onClose="onCloseDialog"
            :name="dialogData.name"
          ></edit-room-form>
        </md-dialog>
        <starter-screen
          class="str_scr"
          :onAddRoom="onAddRoom"
          v-if="!$route.params.id"
        ></starter-screen>
        <router-view></router-view>
      </md-app-content>
    </md-app>
  </div>
</template>

<script>
import RoomItem from '@/components/room-item';
import EditRoomForm from '@/components/edit-room-form';
import StarterScreen from '@/components/starter-screen';
import firebase from 'firebase/app';
import { roomsCollection, usersCollection } from '../main.js';
export default {
  name: 'rooms-list',
  components: {
    RoomItem,
    EditRoomForm,
    StarterScreen,
  },
  data: () => ({
    showDialogType: '',
    dialogData: {},
    rooms: [],
    user: null,
    userId: firebase.auth().currentUser.uid,
    menuVisible: false,
  }),
  firestore() {
    return {
      rooms: roomsCollection.orderBy('name', 'asc'),
      user: usersCollection.doc(this.userId),
    };
  },
  computed: {
    showAddEditDialog: {
      get() {
        return ['add', 'edit'].includes(this.showDialogType);
      },
      set(value) {
        this.showDialogType = value;
      },
    },
    showDeleteDialog: {
      get() {
        return this.showDialogType === 'delete';
      },
      set(value) {
        this.showDialogType = value;
      },
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
    activeRoom() {
      return this.rooms.find((item) => item.id === this.$route.params.id);
    },
  },

  methods: {
    logOut() {
      firebase.auth().signOut();
    },
    add({ name }) {
      roomsCollection.add({ name, creatorId: this.userId });
    },
    update({ id, name }) {
      roomsCollection.doc(id).set({ name });
    },
    delete({ id }) {
      roomsCollection.doc(id).delete();
    },
    onAddRoom() {
      this.showDialogType = 'add';
      this.dialogData = {
        onSubmit: ({ name }) => {
          this.onCloseDialog();
          this.add({ name });
        },
        name: '',
      };
    },
    onEditRoom({ id, name }) {
      this.showDialogType = 'edit';
      this.dialogData = {
        name,
        onSubmit: ({ name }) => {
          this.onCloseDialog();
          this.update({ id, name });
        },
      };
    },
    onDeleteRoom({ id }) {
      this.showDialogType = 'delete';
      this.dialogData = {
        name: 'Room name',
        onSubmit: () => {
          this.onCloseDialog();
          this.delete({ id });
        },
      };
    },
    onCloseDialog() {
      this.showDialogType = '';
      this.dialogData = {};
    },
  },
};
</script>

<style lang="scss" scoped>
.md-app {
  height: 100vh;
  border: 1px solid rgba(#000, 0.12);
}

.md-drawer {
  width: 300px;
  max-width: calc(100vw - 125px);
}
.md-app-drawer {
  display: flex;
  flex-direction: column;
}
.md-list {
  overflow-x: auto;
}
.md-raised {
  margin-top: auto;
  margin-bottom: 25px;
}
.str_scr {
  height: 100%;
}

.md-content {
  padding: 0;
}

@media screen and (min-width: 600px) {
  .menu-btn {
    display: none;
  }
}
</style>
