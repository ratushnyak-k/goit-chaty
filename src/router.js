import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import About from './views/About.vue';
import RoomsList from './views/rooms-list.vue';
import RoomList from './views/RoomList.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/about',
      name: 'about',
      component: About,
    },
    {
      path: '/rooms',
      name: 'rooms',
      component: RoomsList,
    },
    {
      path: '/room-list',
      name: 'room-list',
      component: RoomList,
    },
  ],
});
