<template>
    <div class="comment-list">
        <div class="comment-list__top">
            <div class="comment-list__top-left">
                <slot name="top-left" />
            </div>

            <Button
                class="comment-list__add-comment"
                label="Добавить комментарий"
                @click="addComment"
            />

            <div class="comment-list__top-right">
                <div class="comment-list__count">
                    Всего: {{ props.comments.length }}
                </div> 

                <slot name="top-right" />
            </div>
        </div>

        <CommentItem
            v-for="comment in props.comments"
            class="comment-list__comment"
            :comment="comment"
            :key="`Comment${comment.id}`"
            @update="updateComment"
            @delete="deleteComment"
        />
    </div>
</template>

<script setup lang="ts">
import type { Comment } from '@/abstracts';

import CommentModel from '@/model/comment';

import Button from 'primevue/button';
import CommentItem from './CommentItem.vue';


interface Props {
    comments: Comment[];
}

interface Emits {
    'add-comment': [comment: Comment] 
    'update-comment': [comment: Comment]
    'delete-comment': [comment: Comment]
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

function addComment() {
    emit('add-comment', CommentModel.getNewComment())
}

function updateComment(comment: Comment) {
    emit('update-comment', comment);
}
function deleteComment(comment: Comment) {
    emit('delete-comment', comment);
}
</script>

<style lang="scss" scoped>
    @use '@/styles/mixins' as *;

    .comment-list {
        @media #{$from-tablet} {
            text-align: center;
        }

        &__top {
            position: relative;
            margin-bottom: var(--spacing);

            display: flex;
            justify-content: space-between;

            @media #{$till-tablet} {
                flex-wrap: wrap;
            }
        }

        &__top-left {
            @media #{$till-tablet} {
                margin-bottom: var(--spacing);
                width: 100%;
            }
        }

        &__top-right {
            display: flex;
            align-items: center;
            gap: var(--spacing-small-medium);

            margin-right: var(--spacing-small-medium);
        }

        &__add-comment {
            width: 250px;

            @media #{$from-tablet} {
                @include horizontal-align();
            }
        }

        &__count {
            color: var(--text-color-dark);
        }

        &__comment {
            margin-bottom: var(--spacing);
        }
    }
</style>

