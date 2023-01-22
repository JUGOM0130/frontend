import {
    createRouter,
    createWebHashHistory
} from 'vue-router'
const routes = [{
        path: '/',
        name: 'top',
        component: () => import('../pages/code/CodeMenus.vue')
    },
    {
        path: '/code_create',
        name: 'code_create',
        component: () => import('../pages/code/CodeCreate.vue')
    },
    {
        path: '/code_list',
        name: 'code_list',
        component: () => import('../pages/code/CodeList.vue')
    },
    {
        path: '/code_data_regist',
        name: 'code_data_regist',
        component: () => import('../pages/code/CodeDataRegist.vue')
    },
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router
