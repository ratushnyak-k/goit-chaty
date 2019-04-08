<template>
  <md-list-item>
    <slot></slot>
    <div v-if="(showActionButtons = 'true')">
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
    onEditClick: Function,
    onDeleteClick: Function,
  },
};
</script>

<style scoped>
.md-list-item {
  list-style: none;
}
.md-list-item:hover {
  color: rgb(0, 153, 255);
}
</style>
