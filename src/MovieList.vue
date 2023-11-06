<template>
  <div>
    <header>
      <h1>Buscador de Películas</h1>
      <input v-model="searchQuery" @input="searchMovies" placeholder="Buscar película" />
    </header>
    <main class="main">
  <!-- Muestra el mensaje de error si errorMessage tiene contenido -->
  <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>
  <!-- Verifica si no se encontraron coincidencias y muestra un mensaje -->
  <div v-if="movies.length === 0 && !errorMessage" class="no-matches-message">No se encontraron coincidencias.</div>
  <!-- Si hay películas o mensaje de error, muestra la lista de películas si corresponde -->
  <ul class="movie-list" v-else>
    <li v-for="movie in movies" :key="movie.imdbID" class="movie-item">
      <div class="movie-title" @click="showMovieDetails(movie)">{{ movie.Title }}</div>
      <div class="movie-year">Year: {{ movie.Year }}</div>
      <div class="movie-plot">Plot: {{ movie.Plot }}</div>
      <img :src="movie.Poster" alt="Póster de la película" />
    </li>
  </ul>
</main>

  </div>
  
</template>

<script>
import { ref } from 'vue';

export default {

  setup() {
    const searchQuery = ref('');
    const movies = ref([]);
    const errorMessage = ref(''); 

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
      errorMessage.value = 'No se encontraron coincidencias.';
      console.error(errorMessage.value);
    }
  } catch (error) {
    console.error('Error al buscar películas:', error);
    errorMessage.value = 'Error al buscar películas. Por favor, inténtalo de nuevo.';
  }
};

    const showMovieDetails = (movie) => {
      // Implementa la lógica para mostrar los detalles de la película seleccionada.
    };

    return {
      searchQuery,
      movies,
      errorMessage, // Incluye 'errorMessage' en los valores devueltos por setup
      searchMovies,
      showMovieDetails,
    };
  },
};
</script>

<style scoped>
.movie-list-container {
  font-family: Arial, sans-serif;
  background-color: #fff;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

header {
  background-color: #333;
  color: white;
  padding: 20px;
  text-align: center;
}

header h1 {
  margin: 0;
}

input {
  padding: 10px;
  width: 100%;
}

  .main {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }

.movie-list {
  list-style: none;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.movie-item {
  margin: 10px;
  padding: 10px;
  border: 1px solid #ddd;
  text-align: center;
  background-color: #fff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.movie-title {
  font-weight: bold;
  cursor: pointer;
}

.movie-year {
  font-weight: bold;
}

.movie-plot {
  color: #555;
}

img {
  max-width: 100%;
  height: auto;
}
</style>