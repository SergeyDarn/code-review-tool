<template>
    <div class="code-review-page">
        <CodeReview
            :review="review"
        />
    </div>
</template>


<script lang="ts">
import { Page } from '@/abstracts';
import CodeReviewStorage from '@/model/CodeReviewStorage';

export default {
    beforeRouteEnter(to, from, next) {
        const reviewId = to.params.reviewId as string
        const isValidReviewId = CodeReviewStorage.hasReview(reviewId);

        if (!reviewId || !isValidReviewId) {
            next(Page.home);
            return
        }

        next();
    }
}
</script>

<script setup lang="ts">
import { useRoute } from 'vue-router';
import type { CodeReview as ICodeReview } from '@/abstracts';

import CodeReview from '@/components/CodeReview.vue';

const route = useRoute();
const reviewId = route.params.reviewId as string

const review = CodeReviewStorage.getReview(reviewId) as ICodeReview;
</script>
