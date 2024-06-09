<script lang="ts" setup>

import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import ProductCard from './ProductCardComponent.vue'
import { useCartStore } from '../stores/cart';

const store = ref();
const products = ref([]);
const route = useRoute();
const apiCredential = import.meta.env.VITE_API_CREDENTIAL
const apiUrl = import.meta.env.VITE_API_URL;
const cartStore = useCartStore();


const fetchStore = async (id: string) => {
    try {
        const response = await fetch(`${apiUrl}/stores/${id}`, {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "X-API-KEY": `${apiCredential}`,
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            }
        }

        )
        if (!response.ok) {
            throw new Error('Erro ao buscar loja')
        }
        const data = await response.json()
        store.value = data

    } catch (error) {
        console.error('Erro ao buscar loja:', error)
    }
}

const fetchProducts = async (id: string) => {
    try {
        const response = await fetch(`${apiUrl}/stores/${id}/products?locale=pt-BR`, {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "X-API-KEY": `${apiCredential}`,
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            }
        }

        )
        if (!response.ok) {
            throw new Error('Erro ao buscar produtos da loja')
        }
        const data = await response.json()
        products.value = data.result.products

    } catch (error) {
        console.error('Erro ao buscar produtos da loja:', error)
    }
}

const setStoreInfo = (id) => {
  cartStore.setStoreInfo(id);
};

onMounted(() => {
    const storeId = route.params.storeId;
    fetchStore(storeId)
    fetchProducts(storeId)
    setStoreInfo(storeId)   
});



</script>

<template>
    <div  v-if="store" class="flex flex-col justify-center items-center w-screen pt-36">
        <div class="flex items-center gap-5">
            <img :src="store.logo_url" alt="" class="max-w-20 max-h-20">
            <h1>{{ store.name }}</h1>
        </div>

        <div class=" mt-10 px-10 items-center w-screen grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            <ProductCard v-for="product in products" :key="product.id" :product="product" />
        </div>

    </div>

</template>

<style scoped></style>
