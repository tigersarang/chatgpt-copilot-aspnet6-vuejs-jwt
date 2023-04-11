<template>
     <div class="container mt-5">
        <h1 class="text-center mb-4">게시물 상세</h1>
        <div class="mb-3">
            <label for="title" class="form-label">제목</label>
            <input type="text" class="form-control" id="title" value="게시물 제목" readonly>
        </div>
        <div class="mb-3">
            <label for="author" class="form-label">작성자</label>
            <input type="text" class="form-control" id="author" value="작성자" readonly>
        </div>
        <div class="mb-3">
            <label for="date" class="form-label">작성일</label>
            <input type="text" class="form-control" id="date" value="2023-04-11" readonly>
        </div>
        <div class="mb-3">
            <label for="content" class="form-label">내용</label>
            <textarea class="form-control" id="content" rows="10" readonly>게시물 내용이 여기에 표시됩니다.</textarea>
        </div>

        <h3 class="mb-3">댓글</h3>
        <div class="mb-3">
            <form>
                <label for="comment" class="form-label">댓글 작성</label>
                <div class="input-group">
                    <input type="text" class="form-control" id="comment" placeholder="댓글을 입력하세요...">
                    <button type="submit" class="btn btn-primary">댓글 작성</button>
                </div>
            </form>
        </div>

        <div class="mb-3">
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">댓글 작성자</h5>
                    <p class="card-text">댓글 내용이 표시됩니다.</p>
                </div>
            </div>
        </div>
        <!-- 댓글 카드를 필요한 만큼 반복합니다. -->

        <div class="d-grid gap-2 d-md-flex justify-content-md-end mb-5">
            <button type="button" class="btn btn-primary">수정</button>
            <button type="button" class="btn btn-danger">삭제</button>
            <button type="button" class="btn btn-secondary">목록</button>
        </div>
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
  