<template>
    <Tag 
        class="comment-type-item"
        :class="{
            '_active': isActive
        }"
        :style="{
            '--color': type.color 
        }"
        rounded
        @click="click"
    >
        {{ type.label }}
    </Tag>
</template>

<script setup lang="ts">
import type { CommentTypeView } from '@/abstracts';

import Tag from 'primevue/tag';

interface Props {
    type: CommentTypeView
    isActive: boolean
}

interface Emits {
    click: [type: CommentTypeView]
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

function click() {
    emit('click', props.type);
}
</script>

<style lang="scss" scoped>
    @use '@/styles/mixins' as *;

    .comment-type-item {
        --p-tag-padding: 5px 10px;
        --p-tag-font-size: 15px;
        --p-tag-font-weight: 500;

        @include pointer();    

        color: var(--text-color);
        border: 1px solid var(--color);
        background-color: transparent;

        transition: all 0.3s ease-in;

        &:hover {
            filter: brightness(85%);
        }

        &._active {
            background-color: var(--color);
          
            color: var(--p-tag-primary-color);
            border-color: transparent;
        }
    }    
</style>
