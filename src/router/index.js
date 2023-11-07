import App from '../App.vue'; 
import { createRouter, createWebHistory } from 'vue-router';
import MovieDetails from '../components/MovieDetails.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: App },
    { path: '/movie/:id', component: MovieDetails, props: true } 
  ]
});

export default router;


