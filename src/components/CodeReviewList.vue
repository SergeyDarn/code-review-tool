<template>
    <div
        class="code-review-list"
        :class="{
            '_empty': !codeReviews.length
        }"
    >
        <div 
            v-if="codeReviews.length"
            class="code-review-list__list"
        >
            <CodeReviewItem
                v-for="review in codeReviews"
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

        <div class="code-review-list__actions">
            <Button 
                class="code-review-list__action _new-review"
                label="Начать новое ревью" 
                @click="startReview"
            />

            <FileUpload
                class="code-review-list__action _import-review"
                mode="basic"
                choose-label="Импортировать ревью"
                :choose-button-props="{
                    severity: 'secondary',
                    size: 'small',
                    variant: 'outline'
                }"
                choose-icon="pi pi-upload"
                auto
                custom-upload
                @select="importReview"
            />
        </div>
    </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';

import CodeReview from '@/model/code-review';
import { useToast } from 'primevue/usetoast';

import Button from 'primevue/button';
import FileUpload, { type FileUploadSelectEvent } from 'primevue/fileupload';
import CodeReviewItem from './CodeReviewItem.vue';
import useCodeReviewStore from '@/store/use-code-review-store';


const router = useRouter();

const toast = useToast();
const { 
    codeReviews,
    importReview: importReviewStore
} = useCodeReviewStore(toast);

function startReview() {
    const reviewId = CodeReview.startReview();
   
    router.push(CodeReview.getReviewPage(reviewId))
}

function importReview(ev: FileUploadSelectEvent) {
    importReviewStore(ev.files[0]);
}
</script>

<style lang="scss">
    @use '@/styles/mixins' as *;
    
    .code-review-list {
        &._empty {
            text-align: center;
        }

        &._empty & {
            &__actions {
                flex-direction: column;
                align-items: center;
            }
        }

        &__actions {
            display: flex;
            gap: var(--spacing);

            @media #{$till-tablet} {
                flex-direction: column; 
            }
        }

        &__action {
            width: 250px;
            min-height: 42px;

            &._new-review {
                --p-button-lg-font-size: 20px;
            }

            &._import-review {
                font-size: 16px;
            }
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
