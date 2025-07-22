<template>
    <div
        class="code-review-list"
        :class="{
            '_empty': !props.reviews.length
        }"
    >
        <div 
            v-if="props.reviews.length"
            class="code-review-list__list"
        >
            <CodeReviewItem
                v-for="review in props.reviews"
                class="code-review-list__item"
                :review="review"
                :key="`CodeReview{review.id}`"
            />
        </div>

        <div
            v-else
            class="code-review-list__empty"
        >
            У тебя пока нет ревью :(
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
        &._empty {
            text-align: center;
        }

        &__new-review {
            --p-button-lg-font-size: 20px;

            width: 250px;
        }

        &__empty {
            margin-bottom: 30px;

            font-size: 22px;
            line-height: 1.4;
            color: var(--text-color-dark);
        }

        &__item {
            margin-bottom: var(--spacing);
        }
    }
</style>
