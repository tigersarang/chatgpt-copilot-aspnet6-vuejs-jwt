<template>
    <div class="login">
      <h2>Login</h2>
      <form @submit.prevent="submitForm">
        <div>
          <label for="username">Username:</label>
          <input type="text" id="username" v-model="loginData.username" required />
        </div>
        <div>
          <label for="password">Password:</label>
          <input type="password" id="password" v-model="loginData.password" required />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  </template>
  
  <script>
  import axios from "axios";
  
  export default {
    name: "Login",
    data() {
      return {
        loginData: {
          username: "",
          password: ""
        }
      };
    },
    methods: {
      async submitForm() {
        try {
          const response = await axios.post("https://localhost:7009/api/auth/login", this.loginData);

        // 로그인 성공 후 처리
        localStorage.setItem("authToken", response.data.token); // 토큰을 로컬 스토리지에 저장
        this.$store.commit("setToken", response.data.token); // 스토어에 토큰을 저장 (선택사항)
        this.router.push({ name: "Home" }); // 홈 화면으로 리다이렉트

        } catch (error) {
          console.log(error);
        }
      }
    }
  };
  </script>
  