<template>
  <div>
    <md-empty-state
      class="md-accent"
      md-rounded
      md-icon="error"
      md-label="Page Not Found">
      <router-link to="/home">Go To Home Page</router-link>
    </md-empty-state>
  </div>
</template>

<script>
  export default {
    name: 'EmptyStateColors'
  }
</script>

<style lang="scss" scoped>
  div {
     position: absolute;
     left: 50%;
     top: 50%;
     transform: translate(-50%, -50%);
    text-align: center;
  }

  .md-empty-state {
    display: inline-block;
    vertical-align: middle;

    + .md-empty-state {
      margin-left: 16px;
    }
  }
</style>