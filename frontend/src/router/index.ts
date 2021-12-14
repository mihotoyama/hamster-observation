import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import Home from '../views/Home.vue';
import Nanika from '../views/Nanika.vue';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/nanika',
    name: 'Nanika',
    component: Nanika,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
