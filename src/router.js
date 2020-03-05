import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import NetEA from './cards/netea/index.vue';
import LeadHounds from './cards/lead-hounds/index.vue';

Vue.use(Router);

export default new Router({
  routes: [
    getRoute('netea', NetEA),
    getRoute('lead-hounds', LeadHounds),
    {
      path: '/',
      name: 'home',
      component: Home
    }
  ]
});

function getRoute(name, component) {
  return {
    name,
    path: `/${name}/:catalog`,
    component
  };
}
