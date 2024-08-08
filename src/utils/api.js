export const getUsers = async () => {
    try {
      const response = await axios.get(`${API_URL}/users`);
      console.log('API response:', response.data); 
      return response.data;
    } catch (error) {
      console.error('Error fetching users:', error);
      throw error;
    }
  };