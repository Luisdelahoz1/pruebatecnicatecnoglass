<template>
  <div>
    <header>
      <h1>Buscador de Películas</h1>
      <input v-model="searchQuery" @input="searchMovies" placeholder="Buscar película" />
    </header>
    <main class="main">
    <li v-for="movie in movies" :key="movie.imdbID" class="movie-item">
      <div class="movie-title" @click="showMovieDetails(movie)">{{ movie.Title }}</div>
      <div class="movie-year">Year: {{ movie.Year }}</div>
      <img :src="isValidImageUrl(movie.Poster) ? movie.Poster : 'https://cdn.icon-icons.com/icons2/3001/PNG/512/default_filetype_file_empty_document_icon_187718.png'" alt="Póster de la película" />

    </li>
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

    return {
      searchQuery,
      movies,
      errorMessage, // Incluye 'errorMessage' en los valores devueltos por setup
      searchMovies,
      isValidImageUrl
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
}

input {
  padding: 5px;
  width: 100%;
}

main {
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
}

.movie-year {
  font-weight: bold;
}


img {
  max-width: 100%;
  height: auto;
}

.no-matches-message {
  text-align: center;
  font-weight: bold;
  color: #555;
  margin: 20px;
}
</style>