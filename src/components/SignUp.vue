<script lang="ts" setup>
import { ref } from 'vue';


const email = defineModel('email')
const password = defineModel('password')
const confirmPassword = defineModel('confirmPassword')
const visibility = ref("password")


const togglePasswordVisibility = () => {
    visibility.value = visibility.value === 'password' ? 'text' : 'password';
}

const submitForm = () => {

    console.log('Dados do formulário:', { email: email.value, password: password.value, confirmPassword: confirmPassword.value });
}
</script>

<template>
    <div class="flex justify-center items-center h-screen bg-blue-200">
        <form @submit.prevent="submitForm" class="max-w-md mx-auto">
            <div class="mb-4">
                <label for="email" class="block text-gray-700 text-sm font-bold mb-2">Email</label>
                <input v-model="email" type="email" id="email" name="email"
                    class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    required>
            </div>
            <div class="mb-4 relative">
                <label for="password" class="block text-gray-700 text-sm font-bold mb-2">Senha</label>
                <input v-model="password" :type="visibility" id="password" name="password"
                    class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    required>
                <a @click="togglePasswordVisibility" class="absolute inset-y-0 right-0 px-2 py-9 cursor-pointer">
                    <font-awesome-icon :icon="visibility === 'password' ? ['fas', 'eye'] : ['fas', 'eye-slash']" />
                </a>
            </div>
            <div class="mb-4 relative">
                <label for="confirmPassword" class="block text-gray-700 text-sm font-bold mb-2">Confirmação de
                    Senha</label>
                <input v-model="confirmPassword" type="password" id="confirmPassword" name="confirmPassword"
                    class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    required>
            </div>
            <div class="flex items-center justify-between">
                <button type="submit"
                    class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Cadastrar</button>
            </div>
        </form>
    </div>
</template>

<style scoped></style>
