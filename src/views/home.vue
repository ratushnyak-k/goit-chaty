<template>
  <div class="page">
    <div class="form">
      <h1>Course "FE 9+10 Advanced"</h1>
      <router-link to="/sign-in">Link to Demo</router-link>
      <h2>Students</h2>
      <md-list class="md-list">
        <md-list-item class="md-list-item" v-for="item in students" :key="item">
          {{ item }}
        </md-list-item>
      </md-list>
      <h2>Used Technologies</h2>
      <md-list class="md-list">
        <md-list-item v-for="item in technologies" :key="item">{{ item }}</md-list-item>
      </md-list>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      students: [
        'Губарь Сергей',
        'Федько Евгений',
        'Колганов Артем',
        'Черина Юлия',
        'Вощевская Светлана',
      ],
      technologies: [
        'firebase',
        'lodash',
        'vue',
        'vue-material',
        'vue-router',
        'vuefire',
        'vuelidate',
        'prettier',
        'vue-cli',
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
.form {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 600px;
  width: 100%;
  margin: 0 auto 20px auto;
}
.md-list {
  width: 100%;
}
</style>
