import axios from 'axios';

const API_URL = 'http://192.168.1.10:3000/api'; // Replace with your computer's IP address

export const getUsers = async () => {
  try {
    const response = await axios.get(`${API_URL}/users`);
    return response.data;
  } catch (error) {
    console.error('Error fetching users:', error.response ? error.response.data : error.message);
    throw error;
  }
};