import axios from 'axios';

const placeOrder = async (products, total) => {
  try {
    const response = await axios.post('https://learnly-backend-dam0.onrender.com/api/orders', {
      products,
      total,
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export default placeOrder;