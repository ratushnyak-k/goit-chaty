import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/home.vue';
import RoomsList from './views/rooms-list.vue';
import RoomDetail from './views/room-detail.vue';
import SignUp from './views/sign-up.vue';
import SignIn from './views/sign-in.vue';
import firebase from 'firebase/app';

Vue.use(Router);

const router = new Router({
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
      meta: {
        requiresAuth: true,
      },
      children: [
        {
          path: ':id',
          name: 'room-detail',
          component: RoomDetail,
          meta: {
            requiresAuth: true,
          },
        },
      ],
    },
    {
      path: '/sign-up',
      name: 'sign-up',
      component: SignUp,
    },
    {
      path: '/sign-in',
      name: 'sign-in',
      component: SignIn,
    },
  ],
});

export default router;

router.beforeEach((to, from, next) => {
  firebase.auth().onAuthStateChanged((user) => {
    const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
    if (requiresAuth && !user) {
      next('/sign-in');
    } else {
      next();
    }
  });
});
