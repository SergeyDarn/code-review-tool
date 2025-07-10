<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
    <RouterView class="app" />
</template>

<style lang="scss">
    body {
        margin: 20px 0;

        background-color: var(--background-color);
        color: var(--text-color);

        font-family: "Montserrat", sans-serif;
    }

    .app {
        max-width: 960px;
        margin: 0 auto;
    }
</style>
