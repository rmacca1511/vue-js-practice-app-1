import Vue from 'vue';
import Router from 'vue-router';

import HomePage from '../home/HomePage.vue';

// import Exercise1 from '../build/Exercise1.vue';
// import Exercise2 from '../build/Exercise2.vue';
// import Exercise3 from '../build/Exercise3.vue';
// import Exercise4 from '../build/Exercise4.vue';
// import Exercise5 from '../build/Exercise5.vue';
// import Exercise6 from '../build/Exercise6.vue';
// import Exercise7 from '../build/Exercise7.vue';

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
