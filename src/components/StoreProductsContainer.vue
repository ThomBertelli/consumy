<script lang="ts" setup>

import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';

const store = ref();
const route = useRoute();
const apiCredential = import.meta.env.VITE_API_CREDENTIAL
const apiUrl = import.meta.env.VITE_API_URL;

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
            throw new Error('Erro ao buscar lojas')
        }
        const data = await response.json()
        store.value = data

    } catch (error) {
        console.error('Erro ao buscar lojas:', error)
    }
}



onMounted(() => {
    const storeId = route.params.storeId;
    fetchStore(storeId)
});


</script>

<template>
    <div  v-if="store" class="flex flex-col justify-center items-center h-screen w-screen">
        <div class="flex items-center gap-5 h-32">
            <img :src="store.logo_url" alt="" class="max-w-20 max-h-20">
            <h1>{{ store.name }}</h1>
        </div>

        <div class=" pt-40 px-10 items-center w-screen grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-4">
        </div>

    </div>

</template>

<style scoped></style>
