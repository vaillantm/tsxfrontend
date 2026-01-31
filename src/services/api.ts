import axios from 'axios';

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000',
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  try {
    const raw = localStorage.getItem('auth');
    if (raw) {
      const parsed = JSON.parse(raw) as { token: string | null };
      if (parsed?.token) {
        // Mutate headers in-place to satisfy Axios typings
        (config.headers ||= {} as any);
        (config.headers as any).Authorization = `Bearer ${parsed.token}`;
      }
    }
  } catch (_e) { void 0; }
  return config;
});
