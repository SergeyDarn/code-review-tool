<template>
    <div class="code-review">
        <InputText 
            v-model="review.name"
            class="code-review__name" 
            placeholder="Code review name"
            size="large"
        />

        Code review id: {{ review.id }}
    </div>
</template>

<script setup lang="ts">
import type { CodeReview } from '@/abstracts';
import CodeReviewStorage from '@/model/CodeReviewStorage';

import InputText from 'primevue/inputtext';

import { ref, watch } from 'vue';

interface Props {
    review: CodeReview
}

const props = defineProps<Props>();
const review = ref<CodeReview>(
    JSON.parse(JSON.stringify(props.review))
);

const REVIEW_UPDATE_TIMEOUT = 500;
let reviewUpdateTimeout: number | null = null;


watch(review, (updatedReview) => {
    if (reviewUpdateTimeout !== null) {
        clearTimeout(reviewUpdateTimeout);
    }

    reviewUpdateTimeout = setTimeout(() => {
        CodeReviewStorage.setReview(updatedReview)
    }, REVIEW_UPDATE_TIMEOUT); 
}, { deep: true });
</script>

<style lang="scss" scoped>
    .code-review {
        &__name {
            --p-inputtext-background: transparent;
            --p-inputtext-lg-font-size: 40px;

            display: block;
            margin: 0 auto var(--spacing); 
            
            text-align: center;
            border: none;

            &:enabled:focus {
                outline: none;
            }
        }
    }
</style>
