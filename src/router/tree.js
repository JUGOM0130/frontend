import {
    createRouter,
    createWebHashHistory
} from 'vue-router'

const routes = [{
        path: '/',
        name: 'tree',
        component: () => import('@/pages/tree/TreeTest.vue')
    },{
        path: '/create',
        name: 'treecreate',
        component: () => import('@/pages/tree/TreeRootCreate.vue')
    },

]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router
