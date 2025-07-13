<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
    <RouterView class="app" />
</template>

<style lang="scss">
    @use '@/styles/main';

    body {
        margin: var(--spacing);

        background-color: var(--background-color);
        color: var(--text-color);

        font-family: "Montserrat", sans-serif;
    }

    .app {
        max-width: var(--app-max-width);
        margin: 0 auto;
    }
</style>
