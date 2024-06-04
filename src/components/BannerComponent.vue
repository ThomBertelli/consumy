<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'

</script>


<template>
    <div class=" font-bold banner flex justify-center items-center h-screen w-screen bg-cover">

        <div class="text-center banner-text">
            <h1 class=" mx-auto text-4xl mt-5">Cadastre-se!</h1>
            <RouterLink to="/cadastrar">
                <ButtonPrime type="button" class=" bg-pink-700 hover:bg-pink-600 mt-4 font-bold">Cadastrar</ButtonPrime>
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
