<script lang="ts" setup>
import { ref } from 'vue';


const email = defineModel('email')
const password = defineModel('password')
const confirmPassword = defineModel('confirmPassword')
const visibility = ref("password")
const confirmVisibility = ref("password")

const togglePasswordVisibility = () => {
    visibility.value = visibility.value === 'password' ? 'text' : 'password';
}

const toggleConfirmPasswordVisibility = () => {
    confirmVisibility.value = confirmVisibility.value === 'password' ? 'text' : 'password';
}

const submitForm = () => {

    console.log('Dados do formulário:', { email: email.value, password: password.value, confirmPassword: confirmPassword.value });
}
</script>

<template>
    <div class="backimage flex justify-center items-center h-screen">
        <form @submit.prevent="submitForm" class=" form-layout max-w-md mx-auto flex flex-col items-center">
            <div class="mb-4">
                <label for="email" class="block text-pink-700 text-lg font-bold mb-2">Email</label>
                <input v-model="email" type="email" id="email" name="email"
                    class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    required>
            </div>
            <div class="mb-4 relative">
                <label for="password" class="block text-pink-700 text-lg font-bold mb-2">Senha</label>
                <div class="flex items-center">
                    <input v-model="password" :type="visibility" id="password" name="password"
                    class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    required>
                <a @click="togglePasswordVisibility" class="absolute right-3 cursor-pointer">
                    <font-awesome-icon :icon="visibility === 'password' ? ['fas', 'eye'] : ['fas', 'eye-slash']" />
                </a>
                </div>
                
            </div>
            <div class="mb-4 relative">
                <label for="confirmPassword" class="block text-pink-700 text-lg font-bold mb-2">Confirmar Senha</label>
                <div class=" flex items-center">
                    <input v-model="confirmPassword" :type="confirmVisibility" id="confirmPassword" name="confirmPassword"
                        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        required>
                    <a @click="toggleConfirmPasswordVisibility" class="absolute  right-3  cursor-pointer">
                        <font-awesome-icon
                            :icon="confirmVisibility === 'password' ? ['fas', 'eye'] : ['fas', 'eye-slash']" />
                    </a>

                </div>
                
            </div>
            <div class="flex items-center justify-between">
                <button type="submit"
                    class="font-bold text-white cursor-pointer bg-pink-700 hover:bg-pink-600 px-5 py-2 rounded-lg text-lg hover:scale-105">Cadastrar</button>
            </div>
        </form>
    </div>
</template>

<style scoped>
    .backimage{
        background-image: url('../assets/images/background_signup.png');
        background-size: cover;
    }

    .form-layout{
        background-color:rgb(5, 5, 5);
        padding: 50px 100px;
        border-radius: 25px;
    }

</style>