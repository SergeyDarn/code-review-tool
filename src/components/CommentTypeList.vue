<template>
    <div class="comment-type-list">
        <CommentTypeItem
            v-for="type in props.list"
            class="comment-type-list__item"
            :type="type"
            :is-active="isActiveType(type.type)"
            :key="`CommentType${type.type}`"
            @click="click"
        />
    </div>
</template>

<script lang="ts" setup>
import type { CommentType, CommentTypeView } from '@/abstracts';

import CommentTypeItem from '@/components/CommentTypeItem.vue';

interface Props {
    list: CommentTypeView[]
    activeTypes: CommentType[]
}

interface Emits {
    click: [type: CommentTypeView] 
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

function isActiveType(type: CommentType) {
    return props.activeTypes.includes(type);
}

function click(type: CommentTypeView) {
   emit('click', type); 
}
</script>

<style lang="scss">
    .comment-type-list {
        display: flex;
        gap: var(--spacing-small);
        flex-wrap: wrap;
    } 
</style>
