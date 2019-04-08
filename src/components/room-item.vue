<template>
    <ul>
      <li>
        <slot></slot>
        <div v-show="showActionButtons">
          <md-button :md-ripple="false" @click="onEdit">Edit</md-button>
          <md-button :md-ripple="false" @click="onDelete">Delet</md-button>
        </div>
      </li>
    </ul>
</template>

<script>
export default {
  name: 'roomItem',
  props: {
    showActionButtons: {
      type: Boolean,
      required: false
    },
    onEditClick: Function,
    onDeleteClick: Function,
  },
  data() {
    return {

    };
  },
  methods: {
    onEdit() {
      this.onEditClick();
    },
    onDelete() {
      this.onDeleteClick();
    },
  },
};
</script>
 
