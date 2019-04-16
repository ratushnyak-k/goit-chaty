<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style lang="scss">
body,
#app {
  height: 100%;
}

@media screen and (max-width: 600px) {
  .md-dialog-container,
  .container {
    justify-content: center;
    .md-layout {
      padding: 0 15px !important;
    }
  }
}
</style>
