<template>
    <div id="app">
        <Header />

        <router-view />
    </div>
</template>

<script>
    import { getToken, removeToken } from "./services/auth";
    import Header from "./views/Header.vue";

    export default {
        name: "App",
        components: {
            Header,
        },
    };
</script>

<style>
    nav {
        display: flex;
        gap: 10px;
    }
</style>
