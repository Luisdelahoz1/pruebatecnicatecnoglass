const API_URL = 'https://www.omdbapi.com';
const API_KEY = '141f3356';

export async function searchMovies(searchQuery) {
  try {
    const response = await fetch(`${API_URL}/?s=${searchQuery}&apikey=${API_KEY}`);
    if (!response) {
      return { error: 'Error al realizar la solicitud. Por favor, inténtalo de nuevo.' };
    }
    const data = await response.json();
    return data;
  } catch (error) {
    return { error: 'Error al buscar películas. Por favor, inténtalo de nuevo.' };
  }
}
