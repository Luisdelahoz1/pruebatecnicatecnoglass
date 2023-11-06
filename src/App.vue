<template>
  <div>
    <MovieList @show-movie-details="showMovieDetails" />
    <MovieDetails
      v-if="showDetails"
      :selectedMovie="selectedMovie"
      @view-full-response="viewFullResponse"
    />
  </div>
</template>

<script>
import { ref } from 'vue';
import MovieDetails from '../src/components/MovieDetails.vue';
import MovieList from '../src/components/MovieList.vue';

export default {
  setup() {
    const selectedMovie = ref(null);
    const showDetails = ref(false);

    const showMovieDetails = (movie) => {
      selectedMovie.value = movie;
      showDetails.value = true;
    };

    return {
      selectedMovie,
      showDetails,
      showMovieDetails,
      viewFullResponse,
    };
  },
  components: {
    MovieList,
    MovieDetails,
  },
};

</script>

<style scoped>
.app {
  font-family: Arial, sans-serif;
  background-color: #f0f0f0;
  padding: 20px;
  display: flex;
  justify-content: center;
}

</style>