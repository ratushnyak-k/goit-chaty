<template>
  <md-list-item>
    <slot></slot>
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
