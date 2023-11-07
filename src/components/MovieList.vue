<template>
  <div>
    <header>
      <h1>Buscador de Películas</h1>
      <input v-model="searchQuery" @input="searchMovies" placeholder="Buscar película" />
    </header>
    <main class="main">
      <!-- Muestra el mensaje de error si errorMessage tiene contenido -->
      <div v-if="!errorMessage" class="error-message">{{ errorMessage }}</div>
      <!-- Verifica si no se encontraron coincidencias y muestra un mensaje -->
      <div v-else-if="movies.length === 0 && errorMessage" class="no-matches-message">No se encontraron coincidencias.</div>

      <!-- Si hay películas o mensaje de error, muestra la lista de películas si corresponde -->
      <ul class="movie-list" v-else>
        <li v-for="movie in movies" :key="movie.imdbID" class="movie-item">
          <div class="movie-title"> {{ movie.Title }}</div>
          <div class="movie-year">Year: {{ movie.Year }}</div>
          <img
            :src="isValidImageUrl(movie.Poster) ? movie.Poster : 'https://cdn.icon-icons.com/icons2/3001/PNG/512/default_filetype_file_empty_document_icon_187718.png'"
            alt="Póster de la película" class="movie-poster"
            @click="showMovieDetails(movie)"
          />
        </li>
      </ul>
    </main>
    <MovieDetails :movieDetail="selectedMovie" v-if="selectedMovie" @close="closeMovieDetails" />
  </div>
</template>

<script>
import { ref } from 'vue';
import MovieDetails from './MovieDetails.vue';

export default {
  components: {
    MovieDetails,
  },
  setup() {
    const movies = ref([]); // Inicializa movies con una lista vacía
    const searchQuery = ref('');
    const errorMessage = ref('');
    const selectedMovie = ref(null);


    // Función para verificar si una URL de imagen es válida
    const isValidImageUrl = (url) => {
      return url && /\.(jpg|png)$/.test(url);
    };

    const searchMovies = async () => {
      try {
        const response = await fetch(`https://www.omdbapi.com/?s=${searchQuery.value}&apikey=141f3356`);
        
        if (!response) {
          errorMessage.value = 'Error al realizar la solicitud. Por favor, inténtalo de nuevo.';
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
        }
      } catch (error) {
        errorMessage.value = 'Error al buscar películas. Por favor, inténtalo de nuevo.';
      }
    };

    const showMovieDetails = (movie) => {
      selectedMovie.value = movie;
    };

    const closeMovieDetails = () => {
      selectedMovie.value = null;
    };

    return {
      searchQuery,
      movies,
      errorMessage, // Incluye 'errorMessage' en los valores devueltos por setup
      searchMovies,
      isValidImageUrl,
      showMovieDetails,
      selectedMovie,
      closeMovieDetails,
    };
  },
};
</script>

<style scoped>
.movie-list-container {
  font-family: Arial, sans-serif;
  background-color: #f0f0f0;
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
  padding-bottom: 1em;
}

input {
  padding: 5px;
  width: 100%;
  outline: none;
}

main {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.movie-list {
  list-style: none; /* Elimina los puntos de la lista */
    padding: 0;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
}

.movie-item {
  margin: 10px;
  padding: 10px;
  border: 2px solid #ddd;
  text-align: center;
  background-color: #fff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.movie-title {
  font-weight: bold;
  max-width: 300px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.movie-year {
  font-weight: bold;
}

.movie-poster {
  object-fit: cover;
  height: 424px;
  width: 300px;
}


.no-matches-message {
  text-align: center;
  font-weight: bold;
  color: #555;
  margin: 20px;
}
</style>