<template>
     <div class="container mt-5">
        <h1 class="text-center mb-4">게시물 작성</h1>
        <form>
            <div class="mb-3">
                <label for="title" class="form-label">제목</label>
                <input type="text" class="form-control" id="title" required>
            </div>
            <div class="mb-3">
                <label for="author" class="form-label">작성자</label>
                <input type="text" class="form-control" id="author" required>
            </div>
            <div class="mb-3">
                <label for="content" class="form-label">내용</label>
                <textarea class="form-control" id="content" rows="10" required></textarea>
            </div>
            <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                <button type="submit" class="btn btn-primary">작성 완료</button>
                <button type="button" class="btn btn-secondary">취소</button>
            </div>
        </form>
    </div>
  </template>
  
  <script>
  import api from "@/services/api";
  
  
  export default {
    name: "Products",
    data() {
      return {
        products: [],
        newProduct: { name: "", price: 0 },
        editingProduct: null
      };
    },
    mounted() {
      this.fetchProducts();
    },
    methods: {
      async fetchProducts() {
        try {
          console.log("fetchProducts");
          const response = await api.get("/products");
          this.products = response.data;
        } catch (error) {
          console.log(error);
        }
      },
      editProduct(product) {
        this.editingProduct = { ...product };
      },
      async updateProduct() {
        try {
          await api.put(`/products/${this.editingProduct.id}`, this.editingProduct);
          this.fetchProducts();
          this.editingProduct = null;
        } catch (error) {
          console.log(error);
        }
      },
      async deleteProduct(id) {
        try {
          await api.delete(`/products/${id}`);
          this.fetchProducts();
        } catch (error) {
          console.log(error);
        }
      },
      async addProduct() {
        try {
            const authToken = localStorage.getItem("authToken"); // 저장된 토큰을 가져옵니다.
            console.log(authToken);
          await api.post("/products",  this.newProduct);
          this.fetchProducts();
          this.newProduct.name = "";
          this.newProduct.price = 0;
        } catch (error) {
          console.log(error);
        }
      },
      cancelEdit() {
        this.editingProduct = null;
      }
    }
  };
  </script>
  