<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'

</script>


<template>
    <div class=" font-bold banner flex justify-center items-center h-screen w-screen bg-cover">

        <div class="text-center banner-text">
            <h1 class=" mx-auto text-4xl mt-2">Crie sua conta e desfrute dos melhores restaurantes da sua região, do conforto da sua casa.</h1>
            <RouterLink to="/signup">
                <ButtonPrime class="text-black font-bold" type="button">Criar Conta</ButtonPrime>
            </RouterLink>
        </div>
    </div>

</template>

<style scoped>
    .banner{
        padding: 50px;
        background-image: url('../assets/images/fundo-home.jpg');
    }
    .banner-text{
        background-color:rgba(255, 255, 255, 0.753);
        padding: 40px;
        border-radius: 25px;
    }

    
    


</style>
