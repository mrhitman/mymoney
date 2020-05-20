import { Api } from '../services/Api';

const api = new Api({
  accessToken: localStorage.getItem('accessToken') || undefined,
  refreshToken: localStorage.getItem('refreshToken') || undefined,
});

export default api;
