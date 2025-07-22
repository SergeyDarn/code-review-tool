<template>
    <div class="seach">
        <InputText 
            v-model="searchValue"
            class="search__input" 
            id="search"
            placeholder="Поиск"
            autocomplete="off"
            size="small"
        />
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import useCodeReviewStore from '@/store/use-code-review-store';

import InputText from 'primevue/inputtext';

const { searchValue: searchValueStore, setSearch } = useCodeReviewStore();

const searchValue = computed({
    get() {
        return searchValueStore.value;
    },
    set(file: string) {
        setSearch(file);
    }
})
</script>

<style lang="scss" scoped>
    @use '@/styles/mixins' as *;

    .search {
        &__input {
            @media #{$till-tablet} {
                width: 250px;
            }

            @media #{$from-tablet} {
                width: 165px;
            }
        }
    }
</style>
