<template>
    <div class="code-review-page">
        <CodeReview v-if=codeReview />
    </div>
</template>


<script lang="ts">
import { Page, type CodeReview as ICodeReview } from '@/abstracts';
import CodeReviewStorage from '@/model/CodeReviewStorage';
import useCodeReviewStore from '@/store/use-code-review-store';

const { setCodeReview } = useCodeReviewStore();

export default {
    beforeRouteEnter(to, from, next) {
        const reviewId = to.params.reviewId as string
        const isValidReviewId = CodeReviewStorage.hasReview(reviewId);

        if (!reviewId || !isValidReviewId) {
            next(Page.home);
            return;
        }
        
        const review = CodeReviewStorage.getReview(reviewId) as ICodeReview;

        setCodeReview(review);
        next();
    },

    beforeRouteLeave() {
        setCodeReview(null); 
    }
}
</script>

<script setup lang="ts">
import CodeReview from '@/components/CodeReview.vue';

const { codeReview } = useCodeReviewStore();
</script>
