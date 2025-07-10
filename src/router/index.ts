import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import { Page } from '@/abstracts'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: Page.home,
            name: 'home',
            component: Home,
        },
        {
            path: `${Page.codeReview}/:reviewId`,
            name: 'codeReview',
            component: () => import('../views/CodeReviewPage.vue')
        }
        // {
        //     path: '/about',
        //     name: 'about',
        //     // route level code-splitting
        //     // this generates a separate chunk (About.[hash].js) for this route
        //     // which is lazy-loaded when the route is visited.
        //     component: () => import('../views/AboutView.vue'),
        // },
    ],
})

export default router
