<template>
    <router-link
        class="code-review-item"
        :to="CodeReview.getReviewPage(props.review.id)"
    >
        <div class="code-review-item__name">
            {{ props.review.name || CodeReview.getDefaultReviewTitle() }}
        </div>
    </router-link>
</template>

<script setup lang="ts">
import type { CodeReviewBase } from '@/abstracts';
import CodeReview from '@/model/CodeReview';

interface Props {
    review: CodeReviewBase
}

const props = defineProps<Props>();
</script>

<style lang="scss">
    .code-review-item {
        display: block;
        padding: 20px;
        // TODO: move to a variable
        border: 1px solid darkgray;
        border-radius: 8px;
        transition: border-color 0.3s ease-in;

        &:hover {
            border-color: var(--p-primary-color);
        }

        &__name {
            font-size: 22px;
        }
    }
</style>
