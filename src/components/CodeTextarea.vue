<template>
    <FloatLabel
        class="code-textarea"
        variant="on"
        :class="{
            '_has-value': code
        }"
    >
        <CodeEditor
            v-model="code"
            class="code-textarea__code"
            width="100%"
            font-size="12px"
            :languages="[[language]]"
            :tab-spaces="4"
            :header="false"
            :key="`Code${language}`"
        />

        <label class="code-textarea__label">
            {{ label }}
        </label>
    </FloatLabel>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import stripIndent from 'strip-indent';

import FloatLabel from 'primevue/floatlabel';
import 'highlight.js';
import CodeEditor from 'simple-code-editor';

interface Props {
    language: string
    label: string 
}

const props = defineProps<Props>();
const code = defineModel({
    set(code: string) {
        return stripIndent(code)
    }
});

const language = computed(() => {
    return props.language || 'typescript';
});
</script>

<style lang="scss" scoped>
    @use '@/styles/mixins' as *;

    .code-textarea {
        &._has-value & {
            &__label {
                @include label-top();
            }
        }

        &__code {
            :deep(.code-area) {
                border: 1px solid var(--p-inputtext-border-color);
                border-radius: var(--p-inputtext-border-radius) !important;
            }
        }
    }    
</style>
