import Vue from 'vue';
import App from './App.vue';
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import router from './router';
import VueMaterial from 'vue-material';
import 'vue-material/dist/vue-material.min.css';
import 'vue-material/dist/theme/default.css';
import { firestorePlugin } from 'vuefire';
import Fragment from 'vue-fragment';

Vue.use(VueMaterial);
Vue.config.productionTip = false;

const config = {
  apiKey: 'AIzaSyDcnoXN3fMpPx8rmNixneyNCqUy16gq0c8',
  authDomain: 'chaty-ff67c.firebaseapp.com',
  databaseURL: 'https://chaty-ff67c.firebaseio.com',
  projectId: 'chaty-ff67c',
  storageBucket: 'chaty-ff67c.appspot.com',
  messagingSenderId: '154609273563',
};
Vue.use(firestorePlugin);
firebase.initializeApp(config);
export const db = firebase.firestore();
export const usersCollection = db.collection('users');
export const roomsCollection = db.collection('rooms');
Vue.use(Fragment.Plugin);

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');
