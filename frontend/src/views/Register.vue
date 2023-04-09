<template>
    <div class="register">
      <h2>Register</h2>
      <form @submit.prevent="submitForm">
        <div>
          <label for="username">Username:</label>
          <input type="text" id="username" v-model="registerData.username" required />
        </div>
        <div>
          <label for="password">Password:</label>
          <input type="password" id="password" v-model="registerData.password" required />
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  </template>
  
  <script>
  import api from "@/services/api";
  
  
  export default {
    name: "Register",
    data() {
      return {
        registerData: {
          username: "",
          password: ""
        }
      };
    },
    methods: {
      async submitForm() {
        try {
          const response = await api.post("/auth/register", this.registerData);
          // 회원 가입 성공 후 처리
        } catch (error) {
          console.log(error);
        }
      }
    }
  };
  </script>
  