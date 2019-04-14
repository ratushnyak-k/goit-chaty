<template>
  <div>
    <md-empty-state class="md-accent" md-rounded md-icon="error" md-label="Page Not Found">
      <span>{{ 'Go To ' }}<router-link to="/">Home Page</router-link></span>
    </md-empty-state>
  </div>
</template>

<script>
export default {
  name: 'not-found',
};
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
