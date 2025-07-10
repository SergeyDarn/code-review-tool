<template>
    <div class="comment-item">
        Comment: 

        {{ props.comment }} 
    </div>
</template>

<script setup lang="ts">
import type { Comment } from '@/abstracts';


interface Props {
    comment: Comment
}

const props = defineProps<Props>()
</script>

<style lang="scss">
    .comment-item {
        padding: 20px 0;
    }
</style>
