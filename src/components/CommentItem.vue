<template>
    <div class="comment-item">
        <Button
            v-if="comment.isOpen"
            class="comment-item__delete"
            icon="pi pi-trash"
            aria-label="Удалить комментарий"
            size="small"
            severity="danger"
            variant="outlined"
            @click="deleteComment"
        />

        <div class="comment-item__top">
            <Select
                v-model="comment.type"
                class="comment-item__type-select"
                option-label="label"
                option-value="type"
                input-id="commentType"
                size="small"
                :options="CommentType.getViewItems()"
            >
                <template #value>
                    <div
                        class="comment-item__selected-type"
                        :style="{
                            '--color': CommentType.getColor(comment.type)
                        }"
                    >
                        {{ CommentType.getLabel(comment.type) }}
                    </div>
                </template> 

                <template #option="{ option }">
                    <div 
                        class="comment-item__type-item"
                        :style="{
                            '--color': option.color
                        }"
                    >
                        {{ option.label }} 
                    </div>
                </template>
            </Select>

            <InputText 
                v-model="comment.name"
                class="comment-item__name" 
                placeholder="Суть комментария"
                size="large"
            />

            <Button
                class="comment-item__toggle"
                :icon="`pi ${comment.isOpen ? 'pi-angle-up' : 'pi-angle-down'}`"
                aria-label="Открыть или закрыть комментарий"
                size="small"
                severity="secondary"
                @click="comment.isOpen = !comment.isOpen"
            />
        </div>

        <div
            v-if="comment.isOpen"
            class="comment-item__content"
        >
            <InputText
                v-model="comment.file"
                class="comment-item__file"
                id="file"
                placeholder="Файл"
                size="small"
            />

            <CodeTextarea
                v-model="comment.badCode"
                :language="fileExtension"
                label="Код для улучшения"
            /> 

            <Textarea
                v-if="showComment"
                v-model="comment.comment"
                class="comment-item__comment"
                rows="3"
                id="comment"
                size="small"
                placeholder="Комментарий"
                autoResize
            />

            <CodeTextarea
                v-if="showGoodCode"
                v-model="comment.goodCode"
                :language="fileExtension"
                label="Как улучшить код"
            /> 

            <div
                v-if="!showComment || !showGoodCode"
                class="comment-item__buttons"
            >
                <Button
                    v-if="!showComment"
                    class="comment-item__button"
                    label="Добавить описание"
                    size="small"
                    @click="showComment = true"
                />

                <Button
                    v-if="!showGoodCode"
                    class="comment-item__button _secondary"
                    label="Добавить пример кода"
                    size="small"
                    severity="secondary" 
                    @click="showGoodCode = true"
                />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { type Comment } from '@/abstracts';

import CommentType from '@/model/comment-type';
import { getExtensionFromFile } from '@/utils/file';
import { copyObject } from '@/utils/object';

import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import Select from 'primevue/select';
import Textarea from 'primevue/textarea';
import CodeTextarea from '@/components/CodeTextarea.vue';


interface Props {
    comment: Comment
}

interface Emits {
    update: [comment: Comment]
    delete: [comment: Comment]
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>();


const comment = ref<Comment>(
    copyObject(props.comment)
);
const showComment = ref(!!comment.value.comment);
const showGoodCode = ref(!!comment.value.goodCode);

const fileExtension = computed<string>(() => {
    return getExtensionFromFile(comment.value.file);
})

function deleteComment() {
    emit('delete', comment.value);
}

watch(comment, (updateComment) => {
    emit('update', updateComment);    
}, { deep: true });
</script>

<style lang="scss" scoped>
    @use '@/styles/mixins' as *;

    .comment-item {
        --gap: 15px;

        position: relative;
        padding: var(--spacing-small-medium) var(--spacing);

        background-color: var(--item-background-color);
        border: 1px solid var(--border-color-dark);
        border-radius: var(--item-border-radius);

        &__file,
        &__comment {
            width: 100%;
        }

        &__top {
            position: relative;
            display: flex;
            align-items: center;
        }

        &__content {
            display: flex;
            flex-direction: column;
            gap: var(--gap);

            margin-top: var(--gap);
          
            @media #{$till-tablet} {
               max-width: 85%; 
            }

            @media #{$from-tablet} { 
                max-width: 80%;
            }
        }
        
        &__toggle {
            --p-button-secondary-background: var(--material-level-3);
            --p-button-secondary-border-color: var(--material-level-3);

            @include vertical-align(); 
            right: -5px;
        }

        &__delete {
            position: absolute;
            right: var(--gap);
            bottom: var(--gap); 
        }

        &__type-select {
            margin-right: var(--gap);
        }

        &__type-item,
        &__selected-type {
            position: relative;
            padding-left: 17px;

            &::before {
                @include vertical-align();

                content: ''; 
                left: 0;
                
                width: 10px;
                height: 10px;
                
                border-radius: 3px;
                background-color: var(--color);
            }
        }

        &__type-item {
            font-size: 14px;
        }

        &__name {
            @include input-without-border();

            width: 100%;
        }

        &__file-label {
            font-size: 14px;
        }

        &__buttons {
            display: flex;
            gap: var(--gap);
        }

        &__button {
            width: calc(
                var(--body-max-width)
                * var(--comment-width-percent)
                / 2
                - var(--gap)
            );

            &._secondary {
                --p-button-secondary-background: var(--material-level-3);
                --p-button-secondary-border-color: var(--material-level-3);
            }
        }
    }
</style>
