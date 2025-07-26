<template>
    <div class="home">
        <div class="home__title">
            Код-ревью  
        </div>

        <CodeReviewList class="home__reviews" />
    </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import useCodeReviewStore from '@/store/use-code-review-store';

import CodeReviewList from '@/components/CodeReviewList.vue';

const { loadReviews } = useCodeReviewStore();

onMounted(() => {
   loadReviews(); 
})

</script>

<style lang="scss">
    .home {
        &__title {
            margin-bottom: var(--spacing-large); 

            font-size: 40px;
            text-align: center;
        }
    }
</style>
