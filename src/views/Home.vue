<template>
    <div class="home">
        <div class="home__title">
            Code review
        </div>

        <CodeReviewList :reviews="codeReviews" />
    </div>
</template>

<script setup lang="ts">
import CodeReviewList from '@/components/CodeReviewList.vue';
import codeReviews from '@/data/code-reviews';


// Code Review List
// Code Review Short Item (with link)

// Code Review Extended Item (separate page)
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
