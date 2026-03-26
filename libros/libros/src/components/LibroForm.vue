<template>
<form @submit.prevent="submitForm" class="mb-5">
<div class="mb-3">
<label class="form-label">Titulo</label>
<input type="text" class="form-control" v-model="titulo" required>
</div>
<div class="mb-3">
    <label class="form-label">Año</label>
    <input type="number" class="form-control" v-model.number="year" required>
</div>
<div class="mb-3">
    <label class="form-label">Portada</label>
    <input type="text" class="form-control" v-model="portada" required>
</div>
<div class="mb-3">
    <label class="form-label">Autor</label>
    <select class="form-select" multiple v-model="autoresSeleccionados">
        <option v-for="autor in autores" :key="autor.id" :value="autor.id">{{ autor.nombre }}</option>
    </select>
</div>

<div class="mb-3">
<label class="form-label">Géneros</label>
<select class="form-select" multiple v-model="generosSeleccionados">
    <option v-for="genero in generos" :key="genero.id" :value="genero.id">{{ genero.nombre }}</option>
</select>
</div>

<button class="btn btn-primary">Guardar</button>
</form>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
    libro: Object,
    autores: Array,
    generos: Array
})

const emit = defineEmits(['guardar'])

const titulo = ref('')
const year = ref(null)
const portada = ref('')
const autoresSeleccionados = ref([])
const generosSeleccionados = ref([])


watch(() => props.libro, (nuevoLibro) => {
    if(nuevoLibro){
        titulo.value = nuevoLibro.titulo
        portada.value = nuevoLibro.portada
        year.value = nuevoLibro.year
        autoresSeleccionados.value = nuevoLibro.autores || []
        generosSeleccionados.value = nuevoLibro.generos || []
    } else {
        titulo.value = ''
        portada.value = ''
        year.value = null
        autoresSeleccionados.value = []
        generosSeleccionados.value = []
    }
})

const resetForm = () => { 
     titulo.value = ''
      portada.value = ''
        year.value = null
        autoresSeleccionados.value = []
        generosSeleccionados.value = []
}

const submitForm = () => {
    emit('guardar', {
         titulo: titulo.value,
         portada: portada.value,
         year: year.value,
         autores: autoresSeleccionados.value,
         generos: generosSeleccionados.value
    })
    resetForm()
}
</script>

<style scoped>
</style>