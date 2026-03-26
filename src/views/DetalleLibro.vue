<template>
<div class="mb-5 pb-5" v-if="libro">
    <h2 class="text-center my-5 py-5 display-5 fw-bold">{{ libro.nombre }}</h2>
    <div class="row justify-content-around align-items-start">
    <div class="col-5">
    <img :src="libro.portada" :alt="libro.nombre" class="w-100">
    </div>
<div class="col-5">
    <p class="mb-5 fs-1"><strong>Año publicacion: </strong>{{ libro.year }}</p>
    <h5 class="fw-bold">Autor</h5>
    <ul class="list-group list-group-flush mb-5">
        <li class="list-group-item" v-for="autor in getNombreAutores()" :key="autor">{{ autor }}</li>
    </ul>
    <h5 class="fw-bold">Géneros</h5>
    <ul class="list-group list-group-flush mb-5">
       <p v-for="genero in getNombreGeneros()" :key="genero">{{ genero }}</p>
    </ul>
</div>
</div>
</div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getLibros } from '@/services/libroService';
import { getAutores } from '@/services/autorService';
import { getGeneros } from '@/services/generoService';

const route = useRoute()
const router = useRoute()
const volver = () => {
    router.back
}

const libro = ref(null)
const autores = ref([])
const generos = ref([])

const cargarDatos = async () => {
    try {
        const libros = await getLibros()
        libro.value = libros.find(l => l.id === route.params.id) 
        autores.value = await getAutores()
        generos.value = await getGeneros()
    } catch (error) {
        console.error('Error al cargar los datos', error)
    }
    }
onMounted(cargarDatos)

const getNombreAutores = () => {
    if(!libro.value.autores) return[]

    return autores.value
    .filter(autor => libro.value.autores.includes(autor.id))
    .map(autor => autor.nombre)
}

const getNombreGeneros = () => {
    if(!libro.value.generos) return[]

    return generos.value
    .filter(genero => libro.value.generos.includes(genero.id))
    .map(genero => genero.nombre)
}
</script>