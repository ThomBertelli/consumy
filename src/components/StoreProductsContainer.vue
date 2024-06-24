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
const totalPages = ref()
const pageNumber = ref(1)
const storeId = route.params.storeId;

const fetchStore = async () => {
    try {
        const response = await fetch(`${apiUrl}/stores/${storeId}`, {
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

const fetchProducts = async () => {

    try {
        const response = await fetch(`${apiUrl}/stores/${storeId}/products?page=${pageNumber.value}&locale=pt-BR`, {
            headers: {
                'Accept': 'application/json',
                "Authorization": `Bearer ${localStorage.getItem("token")}`,
                "X-API-KEY": `${apiCredential}`,

            },
        }

        )
        if (!response.ok) {

            throw new Error('Erro ao buscar produtos')
        }
        const data = await response.json()
        totalPages.value = data.result.pagination.pages
        for(let product of data.result.products){
            console.log(product)
            if (!products.value.includes(product)){
                products.value.push(product)
            }
        }

    } catch (error) {
        console.error('Erro ao buscar produtos:', error)
    }
}

const setStoreInfo = () => {
  cartStore.setStoreInfo(storeId);
};

onMounted(() => {
    
    fetchStore()
    fetchProducts()
    setStoreInfo()   
});

const showMore = () =>{
    pageNumber.value++
    fetchProducts()
}

</script>

<template>
    <div  v-if="store" class="flex flex-col justify-center items-center w-screen pt-36">
        <div class="flex items-center gap-5">
            <img :src="store.logo_url" alt="" class="max-w-20 max-h-20">
            <h1>{{ store.name }}</h1>
        </div>

        <div class=" mt-10 px-10 items-center w-screen grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            <ProductCard class="z-1" v-for="product in products" :key="product.id" :product="product" />
        </div>
        <div v-if="pageNumber < totalPages" class="my-10" >
            <ButtonPrime outlined @click="showMore">Mostrar mais</ButtonPrime>
        </div>
    </div>

</template>

<style scoped></style>
