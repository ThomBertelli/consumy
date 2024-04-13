<script setup lang="ts">
import { RouterLink, useRouter} from 'vue-router'
import { auth } from '../auth'
import { ref } from 'vue'
import UserProfile from './UserProfile.vue'

const isLoggedIn = ref(auth.isLoggedIn())
const currentUser = ref(auth.currentUser())
const router = useRouter()


const singOut = function () {
    router.push('/')
    auth.signOut(() => {
        isLoggedIn.value = auth.isLoggedIn()
    })
    
}


</script>


<template>
    <div class="fixed-header">
        <header class="bg-black font-bold text-white">
            <nav class="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8 ">
                <RouterLink to="/">
                    <div>
                        <img class=" cursor-pointer h-20 w-auto" src="../assets/images/delivery.png" alt="">
                    </div>
                </RouterLink>
                <div>
                    <ul class=" cursor-pointer flex items-center gap-x-7 text-md">
                        <li>Sobre</li>
                        <li>Contato</li>
                        <li>Soluções</li>
                    </ul>
                </div>

                <div class="flex items-center gap-x-7">
                    <UserProfile></UserProfile>

                </div>
            </nav>
        </header>
    </div>
</template>

<style scoped>
/* Estilos adicionais para o cabeçalho fixo */
.fixed-header {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 999;
    /* Para garantir que o cabeçalho fique sempre no topo */
}
</style>