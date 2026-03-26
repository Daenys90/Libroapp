<template>
  <div class="card h-150 text-center shadow-sm custom-card border-0">
    <div class="image-container">
      <img :src="urlPortada || 'https://via.placeholder.com/150'" 
        class="card-img-top book-cover" 
        :alt="libro.titulo">
    </div>
         
    <div class="card-body d-flex flex-column">
      <h5 class="card-title fw-bold text-dark mb-1">{{ libro.titulo }}</h5>
      <p class="card-text badge bg-secondary-subtle text-secondary align-self-start mb-3">
        Año: {{ libro.year }}
      </p>
      
      <div class="mt-auto border-top pt-3 stats-container">
        <div class="small text-muted text-start">
          <span class="d-block"><strong>Autores:</strong> {{ libro.autores ? libro.autores.length : 0 }}</span>
          <span class="d-block"><strong>Géneros:</strong> {{ libro.generos ? libro.generos.length : 0 }}</span>
        </div>
      </div>
    </div>
<div class="card-footer bg-white border-0 d-flex gap-2 pb-3 flex-start">
    <router-link :to="`/libros/${libro.id}`" class="btn btn-outline-info btn-sm flex-grow-1">
      <i class="bi bi-eye"></i> Detalles</router-link>
</div>
    <div class="card-footer bg-white border-0 d-flex justify-content-start gap-2 pb-3">
       <button @click="$emit('edit', libro)" class="btn btn-outline-primary btn-sm">
         Editar
       </button>
       <button @click="$emit('delete', libro.id)" class="btn btn-outline-danger btn-sm">
         Eliminar
       </button>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'


const store = useStore()
const isAdmin = computed(() => store.state.rol === 'admin')

const props = defineProps({
    libro: Object
})

const emit = defineEmits([
    'edit',
    'delete'
])

const urlPortada = computed(() => {
  return props.libro.portada || 'https://via.placeholder.com/150?text=Sin+Portada'
})
</script>

<style scoped>
.custom-card {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  border-radius: 12px;
  overflow: hidden;
  background-color: #ffffff;
}

.custom-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 10px 20px rgba(0,0,0,0.1) !important;
}

.image-container {
  height: 250px;
  overflow: hidden;
  background-color: #f8f9fa;
}

.book-cover {
  width: 50%;
  height: 100%;
  object-fit:contain;
  transition: transform 0.5s ease;
}

.custom-card:hover .book-cover {
  transform: scale(1.05);
}

.btn-sm {
  border-radius: 8px;
  font-weight: 500;
  padding: 0.4rem 0.8rem;
}

.card-title {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  min-height: 3rem;
}
</style>