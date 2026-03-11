
const api = {
  get: (url) => window.axios.get(`http://localhost:3001${url}`),
  post: (url, data) => window.axios.post(`http://localhost:3001${url}`, data),
};

export default api;