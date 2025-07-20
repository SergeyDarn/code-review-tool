<template>
    <div class="comment-list">
        <div class="comment-list__top">
            <div class="comment-list__count">
                Всего: {{ props.comments.length }}
            </div> 

            <Button
                class="comment-list__add-comment"
                label="Добавить комментарий"
                @click="addComment"
            />
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

<style lang="scss">
    @use '@/styles/mixins' as *;

    .comment-list {
        text-align: center;

        &__top {
            position: relative;
            margin-bottom: var(--spacing);
        }

        &__count {
            @include vertical-align();
            right: 15px;

            // TODO: use variable
            color: #999;
        }

        &__add-comment {
            width: 250px;
        }

        &__comment {
            margin-bottom: var(--spacing);
        }
    }
</style>

