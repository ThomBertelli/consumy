<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'

</script>


<template>
    <div class=" font-bold banner flex justify-center items-center h-screen w-screen bg-cover">

        <div class="text-center banner-text">
            <h1 class=" mx-auto text-4xl mt-5">Cadastre-se!</h1>
            <RouterLink to="/cadastrar">
                <button type="button" class=" mt-4 font-bold text-white cursor-pointer bg-pink-700 hover:bg-pink-600 px-5 py-3 rounded-lg text-2xl hover:scale-105">Cadastrar</button>
            </RouterLink>
        </div>
    </div>

</template>

<style scoped>
    .banner{
        
        background-image: url('../assets/images/fundo-home.jpg');
    }
    .banner-text{
        background-color:rgba(255, 255, 255, 0.753);
        padding: 100px;
        border-radius: 25px;
    }

</style>
