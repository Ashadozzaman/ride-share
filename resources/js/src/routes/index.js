import { createRouter, createWebHistory } from 'vue-router'


const routes = [
//   { path: '/', component: HomeView },
//   { path: '/about', component: AboutView },
    {
        path: '/login',
        name: 'login',
        component: () => import('../pages/auth/LoginPage.vue')
    },
    {

        path: '/signup',
        name: 'signup',
        component: () => import('../pages/auth/SignUpPage.vue')
    }
]

export const router = createRouter({
//   history: createMemoryHistory('/app'),
    history: createWebHistory('/app'),
    routes,
})
