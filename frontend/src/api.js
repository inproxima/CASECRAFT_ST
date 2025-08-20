import axios from 'axios';

const API = axios.create({
  baseURL: process.env.NODE_ENV === 'production' 
    ? '' // Use relative URL in production (same domain)
    : 'http://localhost:8000', // Use localhost in development
});

export const generateCase = async (formData) => {
  try {
    const response = await API.post('/generate', formData);
    return response.data;
  } catch (error) {
    console.error('Error generating case:', error);
    throw error;
  }
};