import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import CardReader from './views/CardReader.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/:system/:catalog',
      name: 'card-reader',
      component: CardReader
    },
    {
      path: '/',
      name: 'home',
      component: Home
    }
  ]
});
