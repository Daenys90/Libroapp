import { createRouter, createWebHistory} from 'vue-router'
import AutoresView from '../views/AutoresView.vue'
import GenerosView from '@/views/GenerosView.vue'
import LibrosView from '@/views/LibrosView.vue'
import DetalleLibro from '@/views/DetalleLibro.vue'
import RegisterView from '@/views/RegisterView.vue'
import LoginView from '@/views/LoginView.vue'

const router = createRouter({
history: createWebHistory(import.meta.env.BASE_URL),
routes: [
  {
    path: '/',
    name: 'home',
    redirect: '/libros'
    },
    {
    path: '/libros',
    component: LibrosView
    },
    {
    path: '/libros/:id',
    component: DetalleLibro
    },
    { 
    path: '/autores',
    name: 'autores',
    component: AutoresView
    },
     {
    path: '/generos',
    name: 'generos',
    component: GenerosView
    },
    {
      path: '/register',
      component: RegisterView
    },
    {
      path: '/login',
      component: LoginView
    }
    ],
})

export default router