<template>
 <div class="container">
        <div class="row justify-content-center mt-5">
            <div class="col-lg-4">
                <div class="card">
                    <div class="card-header text-center">Login</div>
                    <div class="card-body">
                      <form @submit.prevent="submitForm">
                            <div class="mb-3">
                                <label for="username" class="form-label">Email address</label>
                                <input type="text" class="form-control" id="username" v-model="loginData.username"  required>
                                <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
                            </div>
                            <div class="mb-3">
                                <label for="password" class="form-label">Password</label>
                                <input type="password" class="form-control" v-model="loginData.password"  id="password" required>
                            </div>
                            <button type="submit" class="btn btn-primary">Submit</button>
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
          const response = await api.post("/auth/login", this.loginData);

        // 로그인 성공 후 처리
        localStorage.setItem("authToken", response.data.token); // 토큰을 로컬 스토리지에 저장
//        this.$store.commit("setToken", response.data.token); // 스토어에 토큰을 저장 (선택사항)
//        this.router.push({ name: "Home" }); // 홈 화면으로 리다이렉트

        } catch (error) {
          console.log(error);
        }
      }
    }
  };
  </script>
  