<template>
    <div class="comment-type-filter">
        <CommentTypeList
            class="comment-type-filter__list"
            :list="types"
            :active-types="activeCommentTypes"
            @click="toggleActiveCommentType($event.type)"
        /> 
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { CommentType as ICommentType } from '@/abstracts';

import CommentTypeList from '@/components/CommentTypeList.vue';

import useCodeReviewStore from '@/store/use-code-review-store';
import CommentType from '@/model/CommentType';

const types = CommentType.getViewItems();

const {
    activeCommentType,
    toggleActiveCommentType
} = useCodeReviewStore();

const activeCommentTypes = computed<ICommentType[]>(() => {
    const type = activeCommentType.value;
 
    return type ? [type] : [];
})
</script>

<style lang="scss">

</style>
