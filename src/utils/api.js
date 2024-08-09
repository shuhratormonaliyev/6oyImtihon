import axios from 'axios';

export const getUsers = async () => {
  try {
    const response = await axios.get('https://api.escuelajs.co/api/v1/users/');
    return response.data;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};