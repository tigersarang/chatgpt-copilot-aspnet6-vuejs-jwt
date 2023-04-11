<template>
    <div class="container mt-5">
      <h1 class="text-center mb-4">제품 리스트</h1>

      <div class="d-flex mb-3">
            <input class="form-control me-2" type="search" placeholder="검색" aria-label="Search">
            <button @click="fetchProducts" class="btn btn-outline-success" type="submit">검색</button>
        </div>
              
        <table class="table table-striped">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Name</th>
            <th scope="col">Price</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          <!-- 반복문을 사용하여 게시물 정보를 표시합니다. -->                       
          <tr v-for="product in products" :key="product.id">
            <td>{{ product.id }}</td>
            <td>{{ product.name }}</td>
            <td>{{ product.price }}</td>
            <td>
              <button @click="editProduct(product)">Edit</button>
              <button @click="deleteProduct(product.id)">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
  
      <nav aria-label="Page navigation example">
            <ul class="pagination justify-content-center">
                <li class="page-item"><a class="page-link" href="#">이전</a></li>
                <li class="page-item"><a class="page-link" href="#">1</a></li>
                <li class="page-item"><a class="page-link" href="#">2</a></li>
                <li class="page-item"><a class="page-link" href="#">3</a></li>
                <li class="page-item"><a class="page-link" href="#">다음</a></li>
            </ul>
        </nav>

        
        <div class="d-grid gap-2 d-md-flex justify-content-md-end">
            <button class="btn btn-primary" type="button">글쓰기</button>
        </div>        
      <div v-if="editingProduct">
        <h3>Edit Product</h3>
        <label>Name: <input v-model="editingProduct.name" /></label>
        <label>Price: <input v-model="editingProduct.price" /></label>
        <button @click="updateProduct">Update</button>
        <button @click="cancelEdit">Cancel</button>
      </div>
  
      <div>
        <h3>Add Product</h3>
        <label>Name: <input v-model="newProduct.name" /></label>
        <label>Price: <input v-model="newProduct.price" /></label>
        <button @click="addProduct">Add</button>
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
  