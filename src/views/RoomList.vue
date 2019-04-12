<template>
  <div>
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
      <md-dialog-title>{{ showDialogType }} room {{ dialogData.name }}</md-dialog-title>
      <EditRoom :onSubmit="dialogData.onSubmit" :onClose="onCloseDialog" :name="dialogData.name"></EditRoom>
    </md-dialog>

    <md-button class="md-mini md-plain" @click="onAddRoom">
      <md-icon>add</md-icon>
    </md-button>
    <md-button class="md-mini md-plain" @click="onEditRoom">
      <md-icon>edit</md-icon>
    </md-button>
    <md-button class="md-mini md-plain" @click="showDialogType = 'delete'">
      <md-icon>delete</md-icon>
    </md-button>
  </div>
</template>

<script>
import EditRoom from '@/components/edit-room-form';
export default {
  data: () => ({
    rooms: [],
    showDialogType: '',
    dialogData: {},
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
  components: {
    EditRoom,
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
