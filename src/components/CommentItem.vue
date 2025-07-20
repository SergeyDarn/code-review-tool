<template>
    <div class="comment-item">
        <div class="comment-item__i">
            <Button
                class="comment-item__delete"
                icon="pi pi-trash"
                aria-label="Удалить комментарий"
                size="small"
                severity="danger"
                variant="outlined"
                @click="deleteComment"
            />

            <div class="comment-item__top">
                <FloatLabel
                    class="comment-item__type-wrapper"
                    variant="on"
                >
                    <Select
                        v-model="comment.type"
                        class="comment-item__type"
                        option-label="label"
                        option-value="type"
                        input-id="commentType"
                        size="small"
                        :options="CommentType.getViewItems()"
                    />

                    <label class="comment-item__type-label">
                        Тип
                    </label>
                </FloatLabel>

                <InputText 
                    v-model="comment.name"
                    class="comment-item__name" 
                    placeholder="Суть комментария"
                    size="large"
                />
            </div>

            <FloatLabel
                class="comment-item__file-wrapper"
                variant="on"
            >
                <InputText
                    v-model="comment.file"
                    class="comment-item__file"
                    id="file"
                    size="small"
                />

                <label
                    class="comment-item__file-label"
                    for="file"
                >
                    Файл
                </label>
            </FloatLabel>

            <CodeTextarea
                v-model="comment.badCode"
                :language="fileExtension"
                label="Код для улучшения"
            /> 

            <FloatLabel
                v-if="showComment"
                class="comment-item__comment-wrapper"
                variant="on"
            >
                <Textarea
                    v-model="comment.comment"
                    class="comment-item__comment"
                    rows="3"
                    id="comment"
                    size="small"
                    autoResize
                />

                <label
                    class="comment-item__comment-label"
                    for="comment"
                >
                    Комментарий
                </label>
            </FloatLabel>
 
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
                    class="comment-item__button"
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
import FloatLabel from 'primevue/floatlabel';
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

<style lang="scss">
    .p-select-list {
        --p-select-list-padding: 5px 0;
    }

    .p-select-option {
        --p-select-option-padding: 10px 8px;
    }

    .p-select-option-label {
        font-size: 14px;
    }
</style>

<style lang="scss" scoped>
    @use '@/styles/mixins' as *;

    .comment-item {
        --gap: 15px;

        position: relative;
        padding: 15px 20px;

        // TODO: move to variables
        border: 1px solid #52525b;
        border-radius: 8px;

        &__file,
        &__comment {
            width: 100%;
        }

        &__i {
            display: flex;
            flex-direction: column;
            gap: var(--gap);

            // TODO: create mixins
            @media (min-width: 900px) {
                max-width: 80%;
            }
        }

        &__top {
            display: flex;
            align-items: center;
        }

        &__delete {
            position: absolute;
            top: 15px;
            right: 15px;
        }

        &__type {
            margin-right: var(--gap);
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
        }
    }
</style>
