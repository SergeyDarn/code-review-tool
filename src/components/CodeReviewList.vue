<template>
    <div class="code-review-list">
        <div class="code-review-list__list">
            <CodeReviewItem
                v-for="review in props.reviews"
                :review="review"
                :key="`CodeReview{review.id}`"
            />
        </div>

        <Button 
            class="code-review-list__new"
            label="Start new review" 
            size="large"
            @click="startReview"
        />
    </div>
</template>

<script setup lang="ts">
import type { CodeReviewBase } from '@/abstracts';
import { useRouter } from 'vue-router';

import Button from 'primevue/button';

import CodeReviewItem from './CodeReviewItem.vue';
import CodeReview from '@/model/CodeReview';
 


interface Props {
    reviews: CodeReviewBase[]
}

const props = defineProps<Props>();
const router = useRouter();

function startReview() {
    const reviewId = CodeReview.startReview();
   
    router.push(CodeReview.getReviewPage(reviewId))
}

</script>

<style lang="scss" scoped>
    .code-review-list {
        &__new {
            --p-button-lg-font-size: 24px;

            margin-top: var(--spacing);
        }
    }
</style>
