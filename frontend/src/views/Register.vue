<template>
    <div class="container">
        <div class="row justify-content-center mt-5">
            <div class="col-lg-6">
                <div class="card">
                    <div class="card-header text-center">Sign Up</div>
                    <div class="card-body">
                      <form @submit.prevent="submitForm">
                            <div class="mb-3">
                                <label for="username" class="form-label">Username</label>
                                <input type="text" class="form-control" v-model="registerData.username" id="username" required>
                            </div>
                            <div class="mb-3">
                                <label for="password" class="form-label">Password</label>
                                <input type="password" class="form-control" v-model="registerData.password" id="password" required>
                            </div>
                            <div class="mb-3">
                                <label for="confirmPassword" class="form-label">Confirm Password</label>
                                <input type="password" class="form-control" id="confirmPassword" required>
                            </div>
                            <button type="submit" class="btn btn-primary">Sign Up</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
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
            this.$router.push({ name: "home" }); // 홈 화면으로 리다이렉트
        } catch (error) {
          console.log(error);
        }
      }
    }
  };
  </script>
  