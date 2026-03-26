<template>
  <div class="d-flex flex-column min-vh-100">

    <Navbar />
    <main class="container flex-grow-1">
      <RouterView />  
    </main>
    <Footer />
  </div>
</template>
  

<script setup>
import Navbar from './components/layout/Navbar.vue';
import Footer from './components/layout/Footer.vue'
</script>

<style>

</style>
