<template>
    <RouterView class="app" />

    <Toast />
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router';
import Toast from 'primevue/toast';
</script>

<style lang="scss">
    @use '@/styles/main';

    .app {
        max-width: var(--app-max-width);
        margin: 0 auto;
    }
</style>
