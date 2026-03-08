const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export const api = {
  // Sheroes endpoints
  getSheroes: async (params = {}) => {
    const query = new URLSearchParams(params).toString();
    const response = await fetch(`${API_BASE_URL}/api/sheroes?${query}`);
    if (!response.ok) throw new Error('Failed to fetch sheroes');
    return response.json();
  },

  getSheroById: async (id) => {
    const response = await fetch(`${API_BASE_URL}/api/sheroes/${id}`);
    if (!response.ok) throw new Error('Shero not found');
    return response.json();
  },

  getFeaturedShero: async () => {
    const response = await fetch(`${API_BASE_URL}/api/sheroes/featured/week`);
    if (!response.ok) throw new Error('Failed to fetch featured shero');
    return response.json();
  },

  // Filter options
  getCountries: async () => {
    const response = await fetch(`${API_BASE_URL}/api/countries`);
    if (!response.ok) throw new Error('Failed to fetch countries');
    return response.json();
  },

  getFields: async () => {
    const response = await fetch(`${API_BASE_URL}/api/fields`);
    if (!response.ok) throw new Error('Failed to fetch fields');
    return response.json();
  },

  // Stats
  getStats: async () => {
    const response = await fetch(`${API_BASE_URL}/api/stats`);
    if (!response.ok) throw new Error('Failed to fetch stats');
    return response.json();
  },

  // Nominations
  submitNomination: async (data) => {
    const response = await fetch(`${API_BASE_URL}/api/nominations`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Failed to submit nomination');
    return response.json();
  },

  // Newsletter
  subscribe: async (email) => {
    const response = await fetch(`${API_BASE_URL}/api/subscribe`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });
    if (!response.ok) throw new Error('Failed to subscribe');
    return response.json();
  },
};