import Vue from 'vue';
import Router from 'vue-router';

import HomePage from '../home/HomePage.vue';
import MainBuild from '../build/MainBuild.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [{
    path: '/',
    name: 'Home',
    components: {
      default: HomePage,
    },
  }, {
    path: '/mainbuild',
    name: 'MainBuild',
    components: {
      default: MainBuild,
    },
  }],
});
