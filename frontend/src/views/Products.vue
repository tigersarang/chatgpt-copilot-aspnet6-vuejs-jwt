<template>
    <div class="products">
      <h2>Products</h2>
      <button @click="fetchProducts">Refresh</button>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Price</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
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
  import axios from "axios";
  
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
          const response = await axios.get("https://localhost:7009/api/products");
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
          await axios.put(`https://localhost:7009/api/products/${this.editingProduct.id}`, this.editingProduct);
          this.fetchProducts();
          this.editingProduct = null;
        } catch (error) {
          console.log(error);
        }
      },
      async deleteProduct(id) {
        try {
          await axios.delete(`https://localhost:7009/api/products/${id}`);
          this.fetchProducts();
        } catch (error) {
          console.log(error);
        }
      },
      async addProduct() {
        try {
            const authToken = localStorage.getItem("authToken"); // 저장된 토큰을 가져옵니다.
            console.log(authToken);
          await axios.post("https://localhost:7009/api/products",  this.newProduct, {
          headers: {
            Authorization: `Bearer ${authToken}`, // 헤더에 토큰을 추가합니다.
            'Access-Control-Allow-Origin': '*', // 모든 URL에서 요청을 허용하는 설정입니다.
          },
          
        });
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
  