<script lang="ts" setup>
import { RouterLink } from 'vue-router'
import { storeToRefs } from 'pinia';
import { useAuthStore } from '@/stores/authStore';
import { onMounted } from 'vue';

const authStore = useAuthStore();
const { isLoggedIn, currentUser } = storeToRefs(authStore);

onMounted(()=>{
    authStore.checkAuth()
})


const signOut = () => {
    authStore.signOut();
};

</script>

<template>

    <div class=" bg-black text-white flex justify-between w-full p-5 items-center">
        <div class="flex items-center gap-10">
            <RouterLink :to="{name: 'home'}">
                <img class=" cursor-pointer h-20 w-auto" src="../assets/images/delivery.png" alt="">
            </RouterLink>
            <h1 class="font-bold">Delivery - Consumidor</h1>
        </div>
        <div class="flex flex-col ">
        <template v-if="isLoggedIn">
            <div class="flex flex-col items-center gap-2">
                <div>
                    <h3>Olá, {{ currentUser && currentUser.email }}</h3>     
                </div>
                <div class="flex gap-2">
                    <nav>
                        <ButtonPrime class="text-pink-700 hover:bg-pink-600"  outlined  @click="signOut">Sair</ButtonPrime>
                    </nav>
                </div>
            </div>
        </template>
        <template  v-else>
            <div class="flex gap-3">
                <nav>
                    <ButtonPrime outlined class=" ">
                        <RouterLink :to="{ name: 'signin'}"> Entrar </RouterLink>
                    </ButtonPrime>
                </nav>
                <nav>
                    <ButtonPrime class="bg-pink-700 hover:bg-pink-600">
                        <RouterLink :to="{name: 'signup'}"> Cadastrar </RouterLink>
                    </ButtonPrime>
                </nav>
            </div>
        </template>
    </div>
    </div>
</template>

<style scoped >
    
    
</style>
