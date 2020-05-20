import { Api } from '../services/Api';

const api = new Api({
  accessToken: localStorage.getItem('accessToken'),
  refreshToken: localStorage.getItem('refreshToken'),
});

export default api;
