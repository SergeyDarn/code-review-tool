import { Page } from '@/abstracts'
import { createRouter, createWebHistory } from 'vue-router'

import Home from '../views/Home.vue'
import CodeReviewPage from '../views/CodeReviewPage.vue';

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
            component: CodeReviewPage,
        },
    ],
})

export default router
