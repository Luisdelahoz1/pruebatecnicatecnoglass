<template>
  <div>
    <!-- Muestra los detalles de la película si movieDetail tiene contenido -->
    <div v-if="movieDetail" class="movie-details">
      <h2>Detalles de la película</h2>
      <table>
        <tr>
          <td>Título:</td>
          <td>{{ movieDetail.Title }}</td>
        </tr>
        <tr>
          <td>Año:</td>
          <td>{{ movieDetail.Year }}</td>
        </tr>
      </table>
    </div>
  </div>
</template>



<script>
import { ref } from 'vue';

export default {
  setup() {
    // Declaración de variables reactivas
    const searchQuery = ref('');
    const movies = ref([]);
    const errorMessage = ref('');
    const movieDetail = ref(null); // Agregamos una variable reactiva para almacenar los detalles de la película
    
    // Función para mostrar detalles de una película
    const showMovieDetails = (movie) => {
      // Establecemos los detalles de la película en la variable movieDetail
      movieDetail.value = movie;
    };

    // Valores y funciones disponibles para el componente
    return {
      searchQuery,
      movies,
      errorMessage,
      searchMovies,
      showMovieDetails,
      isValidImageUrl,
      movieDetail, // Agregamos movieDetail a los valores devueltos por setup
    };
  },
};
</script>

<style scoped>
.movie-details {
  font-family: Arial, sans-serif;
  background-color: #fff;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

h2 {
  font-size: 24px;
  margin-bottom: 10px;
}

table {
  width: 100%;
}

table tr {
  border: 1px solid #ddd;
}

table td {
  padding: 10px;
}

button {
  background-color: #333;
  color: white;
  padding: 10px 20px;
  border: none;
  cursor: pointer;
  margin-top: 10px;
}

button:hover {
  background-color: #555;
}

.json-response {
  margin-top: 20px;
  padding: 10px;
  border: 1px solid #ddd;
  background-color: #f5f5f5;
  white-space: pre-wrap;
}
</style>