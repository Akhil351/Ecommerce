import axios from "axios";
export const createUserApi = async (userDetails) => {
  const response = await axios.post(
    "http://localhost:9001/api/v2/auth/add",
    userDetails,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response.data;
};

export const loginApi = async (loginDetails) => {
  const response = await axios.post(
    "http://localhost:9001/api/v2/auth/login",
    loginDetails,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response.data;
};

export const productsApi = async (requestBody) => {
  const response = await axios.post(
    "http://localhost:9002/api/v2/products/allProducts",
    requestBody,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response.data;
};

export const getCartApi = async (token) => {
  const response = await axios.get(
    "http://localhost:9003/api/v2/carts/my-cart",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

export const getOrdersApi = async (token) => {
  const response = await axios.get(
    "http://localhost:9003/api/v2/orders/getOrders",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

export const placeOrderApi = async (token) => {
  const response = await axios.post(
    "http://localhost:9003/api/v2/orders/order",
    null,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

export const addToCartApi = async (quantity, productId, token) => {
  const response = await axios.post(
    `http://localhost:9003/api/v2/cartItems/add?quantity=${quantity}&productId=${productId}`,
    null,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};


export const removeFromCartApi = async (itemId, token) => {
  const response = await axios.delete(
    `http://localhost:9003/api/v2/cartItems/cartItem/${itemId}/remove`, 
    { 
      headers: {
        Authorization: `Bearer ${token}`, 
      },
    }
  );
  return response.data; 
};


export const updateCartApi = async (itemId,quantity, token) => {
  const response = await axios.put(
    `http://localhost:9003/api/v2/cartItems/cartItem/${itemId}/update?quantity=${quantity}`, 
    null,
    { 
      headers: {
        Authorization: `Bearer ${token}`, 
      },
    }
  );
  return response.data; 
};
