<template>
    <div class="home">
        <div class="home__title">
            Код-ревью  
        </div>

        <CodeReviewList
            class="home__reviews"
            :reviews="codeReviews"
        />
    </div>
</template>

<script setup lang="ts">
import type { CodeReview } from '@/abstracts';

import CodeReviewStorage from '@/model/code-review-storage';

import CodeReviewList from '@/components/CodeReviewList.vue';

const codeReviews = Object.values(CodeReviewStorage.getReviews()) as CodeReview[];
</script>

<style lang="scss">
    .home {
        &__title {
            margin-bottom: var(--spacing); 

            font-size: 40px;
            text-align: center;
        }
    }
</style>
