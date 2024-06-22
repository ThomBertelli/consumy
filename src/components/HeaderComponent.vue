<script lang="ts" setup>
import { RouterLink } from 'vue-router'
import { storeToRefs } from 'pinia';
import { useAuthStore } from '@/stores/authStore';
import { onMounted} from 'vue';

const authStore = useAuthStore();
const { isLoggedIn, currentUser } = storeToRefs(authStore);
const emit = defineEmits(['toggle-sidebar']);

onMounted(()=>{
    authStore.checkAuth()
})

const toggleSidebar = () => {
  emit('toggle-sidebar');
};


const signOut = () => {
    authStore.signOut();
    localStorage.clear()
};

</script>

<template>

    <div class=" fixed bg-black text-white flex justify-between w-full p-5 items-center">
        <div class="flex items-center gap-10">
            <RouterLink :to="{name: 'home'}">
                <img class=" cursor-pointer h-20 w-auto rounded-3xl" src="../assets/images/delivery-logo.png" alt="">
            </RouterLink>
            <h1 class="font-bold">Delivery - Consumidor</h1>
            <RouterLink :to="{name: 'stores'}">
                <p>Lojas</p>
            </RouterLink>
            <a :to="{name: 'abaout'}">
                <p>Sobre</p>
            </a>
            <a :to="{name: 'abaout'}">
                <p>Contato</p>
            </a>
        </div>
        <div class="flex flex-col ">
        <template v-if="isLoggedIn">
            <div class="flex flex-col items-center gap-2">
                <div>
                    <h3>Olá, {{ currentUser && currentUser.email }}</h3>     
                </div>
                <div class="flex gap-2">
                    <nav>
                        <ButtonPrime outlined  @click="signOut">Sair</ButtonPrime>
                    </nav>
                    <nav>
                        <ButtonPrime @click="toggleSidebar" >
                            <i class="pi pi-shopping-bag text-black text-2xl px-1"></i>
                        </ButtonPrime>
                    </nav>
                </div>
            </div>
        </template>
        <template  v-else>
            <div class="flex gap-3">
                <nav>
                    <ButtonPrime outlined >
                        <RouterLink :to="{ name: 'signin'}"> Entrar </RouterLink>
                    </ButtonPrime>
                </nav>
                <nav>
                    <ButtonPrime class="text-black">
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
