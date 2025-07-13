<template>
    <div class="comment-list">
        <Button
            class="comment-list__add-comment"
            label="Добавить комментарий"
            @click="addComment"
        />

        <CommentItem
            v-for="(comment, i) in props.comments"
            class="comment-list__comment"
            :comment="comment"
            :key="`Comment${comment.created}`"
            @update="updateComment($event, i)"
            @delete="deleteComment(i)"
        />
    </div>
</template>

<script setup lang="ts">

import Button from 'primevue/button';
import CommentItem from './CommentItem.vue';

import { getNewComment } from '@/utils/new-review';
import type { Comment as IComment } from '@/abstracts';


interface Props {
    comments: IComment[];
}

interface Emits {
    'add-comment': [comment: IComment] 
    'update-comment': [comment: IComment, index: number]
    'delete-comment': [index: number]
}
const props = defineProps<Props>();
const emit = defineEmits<Emits>();

function addComment() {
    emit('add-comment', getNewComment())
}

function updateComment(comment: IComment, index: number) {
    emit('update-comment', comment, index);
}

function deleteComment(index: number) {
    emit('delete-comment', index);
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

