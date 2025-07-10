<template>
    Code review page {{ reviewId }}
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

const route = useRoute();
const reviewId = route.params.reviewId as string
</script>
