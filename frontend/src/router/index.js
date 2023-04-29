import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import Products from "../views/Products.vue";
import ProductCreate from "../views/ProductCreate.vue";
import ProductEdit from "../views/ProductEdit.vue";

const routes = [
    {
        path: "/",
        name: "home",
        component: Home
    },
    {
        path: "/login",
        name: "login",
        component: Login
    },
    {
        path: "/register",
        name: "register",
        component: Register
    },
    {
        path: "/products",
        name: "products",
        component: Products
    },
    {
        path: "/productCreate",
        name: "productCreate",
        component: ProductCreate
    },
    {
        path: "/productEdit/:id",
        name: "productEdit",
        component: ProductEdit
    },
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
});

export default router;
