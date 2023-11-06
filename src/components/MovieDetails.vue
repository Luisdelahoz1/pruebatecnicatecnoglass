<template>
  <div>
    <h2>Detalles de la película</h2>
    <table>
      <!-- Detalles de la película -->
    </table>
    <button @click="viewFullResponse">Ver respuesta completa</button>

    <div v-if="showJsonResponse" class="json-response">
      <pre>{{ jsonResponse }}</pre>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    selectedMovie: Object,
  },
  data() {
    return {
      showJsonResponse: false,
      jsonResponse: null,
    };
  },
  methods: {
    viewFullResponse() {
      this.fetchFullResponse();
    },
    async fetchFullResponse() {
      // Realiza una solicitud adicional a la API 

      try {
        const response = await fetch(`https://www.omdbapi.com/?i=${this.selectedMovie.imdbID}&apikey=141f3356`);
        const data = await response.json();

        // Actualiza la respuesta JSON completa y muestra la sección
        this.jsonResponse = JSON.stringify(data, null, 2);
        this.showJsonResponse = true;
      } catch (error) {
      }
    },
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