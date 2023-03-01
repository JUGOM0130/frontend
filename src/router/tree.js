import {
    createRouter,
    createWebHashHistory
} from 'vue-router'

const routes = [{
        path: '/',
        name: 'tree',
        component: () => import('@/pages/tree/TreeApp.vue')
    },

]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router
