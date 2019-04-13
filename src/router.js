import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/home.vue';
import RoomsList from './views/rooms-list.vue';
import RoomDetail from './views/room-detail.vue';

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
      path: '/rooms',
      name: 'rooms',
      component: RoomsList,
      children: [
        {
          path: ':id',
          name: 'room-detail',
          component: RoomDetail,
        },
      ],
    },
  ],
});
