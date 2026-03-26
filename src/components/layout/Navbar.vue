<template>
  <nav class="navbar navbar-expand-lg" data-bs-theme="dark">
    <div class="container">
      <router-link class="navbar-brand d-flex align-items-center" to="/">
        <img src="@/assets/img/logocat.png" alt="Libroapp Logo" height="40">
        <span class="ms-2 titulo">Libroapp</span> </router-link>

      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
    
      <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div class="navbar-nav ms-auto align-items-center">
          
          <template v-if="!user">
            <router-link class="nav-link" to="/autores">Autores</router-link>
            <router-link class="nav-link" to="/generos">Géneros</router-link>
            <router-link class="nav-link" to="/register">Registrarse</router-link>
            <router-link class="nav-link" to="/login">Login</router-link>
          </template>

          <template v-else>
            <span class="navbar-text me-3">
              Bienvenido: <strong>{{ nombre }}</strong>
            </span>
            <button @click="cerrarSesion" class="btn btn-sm btn-outline-danger">
              Cerrar Sesión
            </button>
          </template> 
          
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
  import { computed } from 'vue'
  import { useStore } from 'vuex'
  import { useRouter } from 'vue-router'
  import { logout } from '@/services/authService';

  const store = useStore()
  const router = useRouter()

  const user = computed(() => { 
    return store.state.userProfile?.nombre || ''
  })

  const cerrarSesion = async () => {
    await logout()
    store.commit('logout') 
    router.push('/libros') //al hacer logout envia a la lista de libros
  }

</script>

<style>

nav{
  background-color: #180f04;
}

.titulo, h1{
  color:rgb(202, 183, 158);
  font-family: "Quintessential", serif;
  font-weight: 400;
  font-style: normal;
  font-size: larger;
}

.nav-link{
  color:rgb(202, 183, 158)!important;
  font-family: "Barlow", sans-serif;
  font-weight: 700;
  font-style: normal;


}
</style>