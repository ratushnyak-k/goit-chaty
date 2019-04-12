<template>
  <div>
    <h2>Edit room example</h2>
    <EditRoom :onSubmit="onSubmit1" :name="room"></EditRoom>

    <h2>Add room example</h2>
    <EditRoom :onSubmit="onSubmit2"></EditRoom>
  </div>
</template>

<script>
import EditRoom from '@/components/edit-room-form';
export default {
  data: () => ({
    room: 'super chat',
    showDialog: false,
  }),
  components: {
    EditRoom,
  },
  methods: {
    onSubmit1(data) {
      console.log(data);
    },
    onSubmit2(data) {
      console.log(data);
    },
  },
};
</script>
