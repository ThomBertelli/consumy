<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import StoreCard from './StoreCardComponent.vue';

const apiCredential = import.meta.env.VITE_API_CREDENTIAL
const apiUrl = import.meta.env.VITE_API_URL;
const stores = ref([]);
const totalPages = ref()
const pageNumber = ref(1)

const fetchStores = async () => {
    try {
        const response = await fetch(`${apiUrl}/stores?page=${pageNumber.value}`, {
            headers: {
                'Accept': 'application/json',
                "X-API-KEY": `${apiCredential}`,
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            }
        }

        )
        if (!response.ok) {
            throw new Error('Erro ao buscar lojas')
        }
        const data = await response.json()
        console.log(data)
        for (let store of data.result.stores) {
            if (!stores.value.includes(store)) {
                stores.value.push(store)
            }

        }


    } catch (error) {
        console.error('Erro ao buscar lojas:', error)
    }
}

const showMore = () =>{
    pageNumber.value++
    fetchStores()
}


onMounted(() => { fetchStores() })
</script>

<template>
    <div class=" pt-40 px-10 items-center w-screen grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-4">
        <StoreCard v-for="store in stores" :key="store.id" :store="store" />
        <div v-if="pageNumber < totalPages" class="mt-10" >
            <ButtonPrime outlined @click="showMore">Mostrar mais</ButtonPrime>
        </div>
    </div>

</template>

<style lang="css" scoped></style>
