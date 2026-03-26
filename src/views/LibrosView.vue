<template>
<div class="principal"> 
<h1 class="text-center my-5 fw-bold display-5">Libros</h1>

<LibroForm
:libro="libroSeleccionado"
:autores="autores"
:generos="generos"
@guardar="guardarLibro"
/>

<div class="row">
<div class="col-md-3 mb-5" v-for="libro in libros" :key="libro.id">
<LibroCard
    :libro="libro"
    @edit="editLibro"
    @delete="removeLibro"
/>
</div>
</div>
</div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import LibroCard from '@/components/LibroCard.vue';

import { 
        getLibros,
        createLibro,
        updateLibro,
        deleteLibro
    } from '@/services/libroService'

import { getAutores } from '@/services/autorService';
import { getGeneros } from '@/services/generoService';
import LibroForm from '@/components/LibroForm.vue';

const libros = ref([])
const autores = ref([])
const generos = ref([])

const libroSeleccionado = ref(null)
const isEditing = ref(false)

const cargarDatos = async () => {
try{
    libros.value = await getLibros()
    autores.value = await getAutores()
    generos.value = await getGeneros()
} catch (error) {
    console.error('Error al cargar los datos', error)
}
}
onMounted(cargarDatos)

const guardarLibro = async (libro) => {
    if (isEditing.value){
        await updateLibro(libroSeleccionado.value.id, libro)
    } else {
        await createLibro(libro)
    }

libroSeleccionado.value = null
isEditing.value = false

await cargarDatos()
}

const editLibro = (libro) => {
    libroSeleccionado.value = libro
    isEditing.value = true
}

const removeLibro = async(id) => {
    if (!confirm('¿Eliminar libro?')) return
    await deleteLibro(id)
    cargarDatos()
} 

</script>

<style scoped>
.principal{
  background-image: url("/src/assets/img/fondo1.jpg");
  background-repeat: no-repeat;
  background-position:right bottom;
  background-size:70vh;
  background-color: #b2cdc8;
}
h1{
  color:#180f04;
  font-family: "Quintessential", serif;
  font-weight: 400;
  font-style: normal;
  
}
</style>