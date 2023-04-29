<template>
    <div class="container mt-5">
        <h1 class="text-center mb-4">게시물 수정</h1>
        <form @submit.prevent="updateProduct">
            <div class="mb-3">
                <label for="title" class="form-label">제목</label>
                <input v-model="product.name" type="text" class="form-control" id="title" required>
            </div>
            <div class="mb-3">
                <label for="price" class="form-label">가격</label>
                <input v-model="product.price" type="text" class="form-control" id="price" required>
            </div>
            <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                <button type="submit" class="btn btn-primary">수정 완료</button>
                <button type="button" @click="cancelEdit" class="btn btn-secondary">취소</button>
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
                product: { id: null, name: "", price: 0 },
            };
        },
        async created() {
            const id = this.$route.params.id;
            const response = await api.get(`/products/${id}`);
            this.product = response.data;
        },
        methods: {
            async updateProduct() {
                try {
                    const authToken = localStorage.getItem("authToken"); // 저장된 토큰을 가져옵니다.
                    await api.put(`/products/${this.product.id}`, this.product);
                    this.$router.push({ name: "products" });

                } catch (error) {
                    console.log(error);
                }
            },
            cancelEdit() {
                history.back();
            }
        }
    };
</script>
