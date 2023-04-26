<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container">
            <router-link class="navbar-brand" to="/">홈</router-link>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNavDropdown">
                <ul class="navbar-nav">
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            프로그램
                        </a>
                        <ul class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                            <li>
                                <router-link class="dropdown-item" to="/products">제품</router-link>
                            </li>
                            <li><a class="dropdown-item" href="#">프로그램 2</a></li>
                            <li><a class="dropdown-item" href="#">프로그램 3</a></li>
                        </ul>
                    </li>
                    <li class="nav-item">
                        <router-link v-if="!isLoggedIn" class="nav-link" to="/login">로그인</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link v-if="!isLoggedIn" class="nav-link" to="/register">회원가입</router-link>
                    </li>
                    <li class="nav-item">
                        <button @click="logout" v-if="isLoggedIn">로그아웃</button>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>

<script>
    import { onUnmounted, ref } from "vue";
import EventBus from "../events/eventBus";
    import { getToken, removeRefreshToken, removeToken } from "../services/auth";

    export default {
        setup() {
            const isLoggedIn = ref(!!getToken());

            const updateLoginStatus = () => {
                isLoggedIn.value = !!getToken();
            };

            const logout = () => {
                removeToken();
                removeRefreshToken();
                updateLoginStatus();
            };

            EventBus.on('login', updateLoginStatus);
            EventBus.on('logout', updateLoginStatus);

            onUnmounted(() => {
                EventBus.off('login', updateLoginStatus);
                EventBus.off('logout', updateLoginStatus);
            });

            return { isLoggedIn, logout };
        }
    };
</script>