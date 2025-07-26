<template>
    <div class="code-review">
        <div class="code-review__top">
            <Button
                class="code-review__go-home"
                icon="pi pi-arrow-left"
                aria-label="Вернуться на главную"
                size="small"
                severity="secondary"
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

        <div class="code-review__comments-wr">
            <CommentList
                class="code-review__comments"
                :comments="processedComments"
                @add-comment="addComment"
                @update-comment="updateComment"
                @delete-comment="deleteComment"
            >
                <template #top-left>
                    <Search class="code-review__search" />
                </template>

                <template #top-right>
                    <Button
                        class="code-review__export"
                        icon="pi pi-download"
                        aria-label="Экспортировать json с ревью"
                        size="small"
                        severity="secondary"
                        variant="outlined"
                        @click="exportReview"
                    />
                </template>
            </CommentList>
        </div>
    </div>
</template>

<script setup lang="ts">
import { watch } from 'vue';
import { useRouter } from 'vue-router';
import { Page } from '@/abstracts';

import CodeReviewStorage from '@/model/code-review-storage';
import useCodeReviewStore from '@/store/use-code-review-store';

import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import CommentList from './CommentList.vue';
import CommentTypeFilters from '@/components/CommentTypeFilters.vue';
import Search from '@/components/Search.vue';

const router = useRouter();

const {
    codeReview,
    processedComments,

    addComment,
    updateComment,
    deleteComment,

    exportReview
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
        }

        &__actions {
            display: flex;
            gap: var(--spacing);
            flex-direction: column;

            margin: var(--spacing-medium) 0;
        }

        &__go-home,
        &__delete {
            @include vertical-align();
        }

        &__delete {
            right: 0;
        }

        &__go-home {
            --p-button-secondary-background: var(--material-level-1);
            --p-button-secondary-border-color: var(--material-level-1);
        }

        &__name {
            @include input-without-border();

            display: block;
            margin: 0 auto;
            max-width: 70%;
            
            text-align: center;

            @media #{$till-tablet} {
                --p-inputtext-lg-font-size: 28px;
            }

            @media #{$from-tablet} {
                --p-inputtext-lg-font-size: 36px;
            }
        }

        &__comments-wr {
            position: relative;
        }
    }
</style>
