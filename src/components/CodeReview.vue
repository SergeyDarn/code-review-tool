<template>
    <div class="code-review">
        <div class="code-review__top">
            <Button
                class="code-review__go-home"
                icon="pi pi-arrow-left"
                aria-label="Вернуться на главную"
                size="small"
                severity="secondary"
                variant="outlined"
                @click="goHome"
            />
        
            <InputText 
                v-model="review.name"
                class="code-review__name" 
                placeholder="Название для ревью"
                size="large"
            />

            <Button
                class="code-review__delete"
                icon="pi pi-trash"
                aria-label="Удалить ревью"
                size="small"
                severity="danger"
                variant="outlined"
                @click="deleteReview"
            />
        </div>

        <CommentList
            class="code-review__comments"
            :comments="review.comments"
            @add-comment="addComment"
            @update-comment="updateComment"
            @delete-comment="deleteComment"
        />
    </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import { Page, type CodeReview, type Comment } from '@/abstracts';

import CodeReviewStorage from '@/model/CodeReviewStorage';

import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import CommentList from './CommentList.vue';
import ObjectUtils from '@/utils/object-utils';

interface Props {
    review: CodeReview
}

const router = useRouter();
const props = defineProps<Props>();
const review = ref<CodeReview>(
    ObjectUtils.copyObject(props.review)
);

function deleteReview() {
    CodeReviewStorage.removeReview(review.value.id);
    goHome(); 
}

function addComment(comment: Comment) {
    review.value.comments = [ comment, ...review.value.comments ];
}

function updateComment(comment: Comment, index: number) {
    review.value.comments[index] = {
        ...comment,
        updated: new Date().toString()
    };
}

function deleteComment(index: number) {
    review.value.comments.splice(index, 1);
}


function goHome() {
    router.push(Page.home);
}


const REVIEW_UPDATE_TIMEOUT = 500;
let reviewUpdateTimeoutId: number | null = null;

watch(review, (updatedReview) => {
    if (reviewUpdateTimeoutId !== null) {
        clearTimeout(reviewUpdateTimeoutId);
    }

    reviewUpdateTimeoutId = setTimeout(() => {
        CodeReviewStorage.setReview(updatedReview)
    }, REVIEW_UPDATE_TIMEOUT); 
}, { deep: true });
</script>

<style lang="scss" scoped>
    @use '@/styles/mixins' as *;

    .code-review {
        &__top {
            position: relative;

            display: flex;
            margin-bottom: calc(var(--spacing) * 2);
        }

        &__go-home,
        &__delete {
            @include vertical-align();
        }

        &__delete {
            right: 0;
        }

        &__name {
            --p-inputtext-lg-font-size: 36px;

            @include input-without-border();

            display: block;
            margin: 0 auto;
            max-width: 70%;
            
            text-align: center;
        }
    }
</style>
