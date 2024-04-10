<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { auth } from '../auth'
import { ref } from 'vue'

const currentUser = ref(auth.currentUser())

const singOut = function () {
    auth.signOut(() => {
        currentUser.value = auth.currentUser()
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
                    <template v-if="currentUser">
                        <h3>Olá, {{ currentUser.email }} !</h3>
                        <nav>
                            <a @click="singOut">
                                <button type="button"
                                    class="cursor-pointer bg-pink-700 hover:bg-pink-600 px-5 py-3 rounded-lg text-lg hover:scale-105">Sair</button>
                            </a>
                        </nav>
                    </template>

                    <template v-else>
                        <nav>
                            <RouterLink to="/entrar">
                                <button type="button"
                                    class="cursor-pointer bg-pink-700 hover:bg-pink-600 px-5 py-3 rounded-lg text-lg hover:scale-105">Entrar</button>
                            </RouterLink>
                        </nav>
                    </template>

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