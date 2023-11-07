<template>
  <div>
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
      <router-link to="/">Regresar</router-link>
    </div>
  </div>
</template>




<script>
import { ref } from 'vue';

export default {

    props: {
    movieDetail: Object 
  },

  setup() {
    
    const searchQuery = ref('');
    const movies = ref([]);
    const errorMessage = ref('');
    const movieDetail = ref(null); 

  

    const showMovieDetails = (movie) => {

      movieDetail.value = movie;
    };

  
    return {
      searchQuery,
      movies,
      errorMessage,
      searchMovies,
      showMovieDetails,
      isValidImageUrl,
      movieDetail, 
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