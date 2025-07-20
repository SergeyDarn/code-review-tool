<template>
    <div class="code-review-list">
        <div class="code-review-list__list">
            <CodeReviewItem
                v-for="review in props.reviews"
                class="code-review-list__item"
                :review="review"
                :key="`CodeReview{review.id}`"
            />
        </div>

        <Button 
            class="code-review-list__new-review"
            label="Начать новое ревью" 
            @click="startReview"
        />
    </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import type { CodeReviewBase } from '@/abstracts';

import CodeReview from '@/model/code-review';

import Button from 'primevue/button';
import CodeReviewItem from './CodeReviewItem.vue';


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
        &__new-review {
            --p-button-lg-font-size: 20px;

            width: 250px;
        }

        &__item {
            margin-bottom: var(--spacing);
        }
    }
</style>
