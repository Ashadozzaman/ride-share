import { createRouter, createWebHistory } from 'vue-router'
import { isAdmin } from '../middleware/isAdmin'


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
    },
    {

        path: '/dashboard',
        name: 'dashboard',
        component: () => import('../pages/admin/AdminPage.vue'),
        children: [
            {
                path: '/users',
                component: () => import('../pages/admin/users/UserPage.vue'),
                beforeEnter: isAdmin
            },
            {
                path: '/vehicles',
                component: () => import('../pages/admin/vehicles/VehiclePage.vue')
            },
            {
                path: '/welcome',
                component: () => import('../pages/admin/welcome/WelcomePage.vue')
            },
            {
                path:'/profile',
                component: () => import('../pages/admin/users/Profile.vue')
            },
            {
                path:'/map',
                component: () => import('../pages/admin/map/MapPage.vue')
            }
        ]
    }
]

export const router = createRouter({
//   history: createMemoryHistory('/app'),
    history: createWebHistory('/app'),
    routes,
})
