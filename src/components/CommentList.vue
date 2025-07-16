<template>
    <div class="comment-list">
        <Button
            class="comment-list__add-comment"
            label="Добавить комментарий"
            @click="addComment"
        />

        <CommentItem
            v-for="comment in props.comments"
            class="comment-list__comment"
            :comment="comment"
            :key="`Comment${comment.created}`"
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
    .comment-list {
        text-align: center;

        &__add-comment {
            width: 300px;
            margin-bottom: var(--spacing);
        }

        &__comment {
            margin-bottom: var(--spacing);
        }
    }
</style>

