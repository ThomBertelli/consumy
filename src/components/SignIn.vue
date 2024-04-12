<script lang="ts" setup>
import { useRouter } from 'vue-router'
import { ref } from 'vue'
import { auth } from '../auth'
import Swal from 'sweetalert2'


const router = useRouter()
const email = defineModel('email')
const password = defineModel('password')
const awaiting = ref(false)
const visibility = ref("password")


const togglePasswordVisibility = () => {
    visibility.value = visibility.value === 'password' ? 'text' : 'password';
}

function onSubmit() {
    awaiting.value = true
    auth.signIn(email.value, password.value, () => {
        awaiting.value = false
        Swal.fire({
            icon: "success",
            text: "Sucesso!",
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 2000,
            timerProgressBar: true,
            width: 200,    
        }).then(() => {router.push('/') }) 
        
    }, () => {
        awaiting.value = false
        Swal.fire({
            icon: "error",
            text: "Email ou senha incorretos!",
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            width: 250,
            
                
        })
    })
}
</script>

<template>
    <div class=" backimage flex flex-col justify-center items-center h-screen w-screen">
        <form @submit.prevent="onSubmit()" class=" form-layout max-w-md mx-auto flex flex-col items-center">
            <div class="mb-4">
                <label for="email" class="block text-pink-700 text-lg font-bold mb-3">Email</label>
                <input v-model="email" type="email" id="email" name="email"
                    class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    required>
            </div>
            <div class="mb-4 relative">
                <label for="password" class="block text-pink-700 text-lg font-bold mb-3">Senha</label>
                
                <div class=" flex items-center">
                    <input v-model="password" :type="visibility" id="password" name="password"
                        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        required>
                    <a @click="togglePasswordVisibility" class="absolute right-3 cursor-pointer">
                        <font-awesome-icon :icon="visibility === 'password' ? ['fas', 'eye'] : ['fas', 'eye-slash']" />
                    </a>
                </div>
                
            </div>
            <div v-show="!awaiting" class="flex items-center justify-between">
                <button type="submit"
                    class="font-bold text-white cursor-pointer bg-pink-700 hover:bg-pink-600 px-5 py-2 rounded-lg text-lg hover:scale-105">
                    Entrar
                </button>
            </div>
        </form>

    </div>

</template>


<style scoped>
    .backimage{
        background-image: url('../assets/images/background_signin.png');
        background-size: cover;
    }

    .form-layout{
        background-color:rgb(5, 5, 5);
        padding: 50px 100px;
        border-radius: 25px;
    }

</style>
