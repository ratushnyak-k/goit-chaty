<template>
  <md-list-item>
    <router-link :to="linkTo">{{ data.name }}</router-link>
    <div v-if="showActionButtons" class="action-buttons">
      <md-button class="md-icon-button md-list-action" @click="onEditClick">
        <md-icon>edit</md-icon>
      </md-button>
      <md-button class="md-icon-button md-list-action" @click="onDeleteClick">
        <md-icon>delete</md-icon>
      </md-button>
    </div>
  </md-list-item>
</template>

<script>
export default {
  name: 'room-item',
  props: {
    data: {
      type : Object,
      required: true,
      },

    showActionButtons: {
      type: Boolean,
      required: false,
      default: false,
    },
    onEditClick: {
      type: Function,
      required: false,
      default: () => {},
    },
    onDeleteClick: {
      type: Function,
      required: false,
      default: () => {},
    },
  },
  computed: {
    linkTo  () {
      return `/rooms/${this.data.id}`
    }
  },
};
</script>

<style scoped lang="scss">
.action-buttons {
  display: none;
}
.md-list-item {
  &:hover {
    .action-buttons {
      display: block;
    }
  }
}
</style>
