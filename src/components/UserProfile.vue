<script lang="ts" setup>
import { Auth } from '../auth'
import { ref } from 'vue'
const auth = new Auth()
const isLoggedIn = ref(auth.isLoggedIn())
const currentUser = ref(auth.currentUser())
const signOut = function () {
    auth.signOut(() => (isLoggedIn.value = auth.isLoggedIn()))
}
</script>

<template>
    <div>
        <main>
            <template v-if="isLoggedIn">
                <h3>Hi, {{ currentUser && currentUser.email }}</h3>
                <br />
                <nav>
                    <a @click="signOut" class="cursor-pointer bg-pink-700 hover:bg-pink-600 px-5 py-3 rounded-lg text-lg hover:scale-105">Sign Out</a>
                </nav>
            </template>
            <template v-else>
                <h3>Please log in to have access</h3>
                <br />
                <nav>
                    <RouterLink :to="{ name: 'signin'}" class="cursor-pointer bg-pink-700 hover:bg-pink-600 px-5 py-3 rounded-lg text-lg hover:scale-105"> Sign In </RouterLink>
                </nav>
            </template>
        </main>
    </div>
</template>

<style scoped></style>
