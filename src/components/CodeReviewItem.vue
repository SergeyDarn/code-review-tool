<template>
    <router-link
        class="code-review-item"
        :to="CodeReviewModel.getReviewPage(props.review.id)"
    >
        <div class="code-review-item__name">
            {{ props.review.name || CodeReviewModel.getDefaultReviewTitle() }}
        </div>

        <div class="code-review-item__count">
            Комментариев: {{ props.review.commentsCount }}
        </div>
    </router-link>
</template>

<script setup lang="ts">
import type { CodeReviewBase } from '@/abstracts';
import CodeReviewModel from '@/model/code-review';

interface Props {
    review: CodeReviewBase
}

const props = defineProps<Props>();
</script>

<style lang="scss">
    .code-review-item {
        display: block;
        padding: 20px;
       
        background-color: var(--item-background-color);
        border: 1px solid var(--border-color);
        border-radius: 8px;
        transition: border-color 0.3s ease-in;

        &:hover {
            border-color: var(--p-primary-color);
        }

        &__name {
            margin-bottom: 10px;
            font-size: 22px;
        }

        &__count {
            color: var(--text-color-dark);
        }
    }
</style>
