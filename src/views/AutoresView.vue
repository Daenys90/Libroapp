<template>
    <h2 class="text-center my-5">Autores</h2>
<AutorForm 
    :autor="autorSeleccionado"
    @guardar="guardarAutor"
/>

<table class="table table-striped table-hover mb-5">
    <thead>
        <tr>
            <th>Nombre</th>
            <th>Acciones</th>
        </tr>
    </thead>
    <tbody>
        <tr v-for="autor in autores" :key="autor.id">
            <td>{{ autor.nombre }}</td>
            <td>
                <button class="btn btn-primary btn-sm me-3" @click="editAutor(autor)">Editar</button>
                <button class="btn btn-danger btn-sm me-3" @click="removeAutor(autor.id)">Eliminar</button>
            </td>
        </tr>
    </tbody>
</table>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import AutorForm from '@/components/AutorForm.vue';

import { 
        getAutores,
        createAutor,
        updateAutor,
        deleteAutor
    } from '@/services/autorService';


const autores = ref([])
const autorSeleccionado = ref(null)
const isEditing = ref(false)

const cargarAutores = async () => {
try{
    autores.value = await getAutores()
} catch (error) {
    console.error('Error al cargar los autores', error)
}
}
onMounted(cargarAutores)

const guardarAutor = async (autor) => {
    if (isEditing.value){
        await updateAutor(autorSeleccionado.value.id, autor)
    } else {
        await createAutor(autor)
    }

autorSeleccionado.value = null
isEditing.value = false

await cargarAutores()
}

const editAutor = (autor) => {
    autorSeleccionado.value = autor
    isEditing.value = true
}

const removeAutor = async(id) => {
    if (!confirm('¿Eliminar autor?')) return
    await deleteAutor(id)
    cargarAutores()
}

</script>

<style scoped>

</style>