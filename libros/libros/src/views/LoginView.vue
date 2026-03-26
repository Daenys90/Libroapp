<template>
<div class="row justify-content-center my-5 pt-5">
    <div class="col-5 border rounded p-5 shadow">
        <h2 class="text-center mb-5">Iniciar sesión</h2>
        <form @submit.prevent="iniciarSesion">
            <div class="mb-3">
                <label class="form-label">Correo electrónico</label>
                <input type="email" class="form-control" v-model="email" required>
            </div>
            <div class="mb-5">
                <label class="form-label">Contraseña</label>
                <input type="password" class="form-control" v-model="password" required>
            </div>
            <button class="btn btn-primary w-100">Iniciar sesión</button>
        </form>
    </div>
</div>
</template>


<script setup>
    import { ref } from 'vue'
    import { useStore} from 'vuex'
    import { useRouter} from 'vue-router'
    import { login, getUserRol, getUserProfile} from '@/services/authService'


</script>