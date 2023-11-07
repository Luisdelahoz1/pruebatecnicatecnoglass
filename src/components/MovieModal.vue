<template>
    <div v-if="showModal" class="movie-modal">
      <div class="modal-content">
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
        <button @click="closeModal">Cerrar</button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      movieDetail: Object,
      showModal: Boolean,
    },
    methods: {
      closeModal() {
        this.$emit('close-modal');
      },
    },
  };
  </script>
  
  <style scoped>
.movie-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}

.modal-content {
  background: #fff;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  padding: 20px;
  max-width: 400px;
  text-align: left;
}

h2 {
  font-size: 24px;
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

.close-button {
  background-color: #333;
  color: white;
  padding: 10px 20px;
  border: none;
  cursor: pointer;
  margin-top: 10px;
  float: right;
}

.close-button:hover {
  background-color: #555;
}
</style>