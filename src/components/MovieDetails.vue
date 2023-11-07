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

   

    // Función para buscar películas
    const searchMovies = async () => {
      try {
        const response = await fetch(`https://www.omdbapi.com/?s=${searchQuery.value}&apikey=141f3356`);
        
        if (!response) {
          errorMessage.value = 'Error al realizar la solicitud. Por favor, inténtalo de nuevo.';
          console.error(errorMessage.value);
          return;
        }

        const data = await response.json();

        if (data.Response === 'True') {
          // Si se encontraron coincidencias, asigna los resultados a 'movies'
          movies.value = data.Search;
        } else {
          // Si no se encontraron coincidencias, muestra un mensaje de error apropiado y vacía la lista de películas
          movies.value = [];
          errorMessage.value = '';
          console.error(errorMessage.value);
        }
      } catch (error) {
        console.error('Error al buscar películas:', error);
        errorMessage.value = 'Error al buscar películas. Por favor, inténtalo de nuevo.';
      }
    };

    // Función para mostrar detalles de una película
    const showMovieDetails = (movie) => {
      // Implementa la lógica para mostrar los detalles de la película seleccionada.
    };

    // Valores y funciones disponibles para el componente
    return {
      searchQuery,
      movies,
      errorMessage, 
      searchMovies,
      showMovieDetails,
      isValidImageUrl,
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