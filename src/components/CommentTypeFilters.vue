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
import { CommentType } from '@/abstracts';

import CommentTypeModel from '@/model/comment-type';
import useCodeReviewStore from '@/store/use-code-review-store';

import CommentTypeList from '@/components/CommentTypeList.vue';


const types = CommentTypeModel.getViewItems();

const {
    activeCommentType,
    toggleActiveCommentType
} = useCodeReviewStore();

const activeCommentTypes = computed<CommentType[]>(() => {
    const type = activeCommentType.value;
 
    return type ? [type] : [];
})
</script>

<style lang="scss">

</style>
