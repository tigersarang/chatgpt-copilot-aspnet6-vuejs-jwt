<template>
  <div id="app">
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container">
            <router-link class="navbar-brand"  to="/">홈</router-link>
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
                        <router-link class="nav-link" to="/login">로그인</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link" to="/register">회원가입</router-link>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
    
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App"
};
</script>

<style>
nav {
  display: flex;
  gap: 10px;
}
</style>
