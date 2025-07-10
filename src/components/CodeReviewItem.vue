<template>
    <div class="code-review-item">
        <div class="code-review-item__name">
            {{ props.review.name }}
        </div>
    </div>
</template>

<script setup lang="ts">
import type { CodeReviewBase } from '@/abstracts';

interface Props {
    review: CodeReviewBase
}

const props = defineProps<Props>()
</script>

<style lang="scss">
    .code-review-item {
        padding: 20px;
        // TODO: move to a variable
        border: 1px solid darkgray;
        border-radius: 8px;

        &__name {
            font-size: 22px;
        }
    }
</style>
