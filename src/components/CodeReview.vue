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
                v-model="codeReview.name"
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

        <div class="code-review__actions">
            <CommentTypeFilters />     
        </div>

        <CommentList
            class="code-review__comments"
            :comments="processedComments"
            @add-comment="addComment"
            @update-comment="updateComment"
            @delete-comment="deleteComment"
        />
    </div>
</template>

<script setup lang="ts">
import { watch } from 'vue';
import { useRouter } from 'vue-router';
import { Page } from '@/abstracts';

import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import CommentList from './CommentList.vue';

import CodeReviewStorage from '@/model/CodeReviewStorage';
import CommentTypeFilters from '@/components/CommentTypeFilters.vue';
import useCodeReviewStore from '@/store/use-code-review-store';

const router = useRouter();

const {
    codeReview,
    processedComments,

    addComment,
    updateComment,
    deleteComment
} = useCodeReviewStore();

function deleteReview() {
    CodeReviewStorage.removeReview(codeReview.value.id);
    goHome(); 
}

function goHome() {
    router.push(Page.home);
}

const REVIEW_UPDATE_TIMEOUT = 500;
let reviewUpdateTimeoutId: number | null = null;

watch(codeReview, (updatedReview) => {
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

        &__actions {
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
