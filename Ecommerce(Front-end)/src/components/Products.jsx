import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { addToCartApi, productsApi } from "../service/BackEnd";
import UserProfileContext from "../context/UserContext";
import { useNavigate } from "react-router-dom";

function Products() {
  const [products, setProducts] = useState([]);
  const { token } = UserProfileContext();
  const navigator = useNavigate();
  const requestBody = {
    searchKey: "",
    pageNo: 0,
    pageSize: 100,
  };

  const addToCart = async (product) => {
    try {
      console.log(product.id, token);
      await addToCartApi(1, product.id, token);
      toast.success("Product added to cart");
    } catch (error) {
      console.error(error.response);
      const errorCode = error?.response?.data?.error;
      if (errorCode === "Forbidden") {
        toast.error("Sign in required");
        navigator("/login");
      } else {
        toast.error("An unexpected error occurred while adding product into the cart");
      }
    }
  };

  useEffect(() => {
    async function loadProducts() {
      try {
        const fetchedProducts = await productsApi(requestBody);
        console.log(fetchedProducts.data);
        setProducts(fetchedProducts.data);
      } catch (error) {
        console.error("Error fetching products:", error);
        toast.error("An unexpected error occurred while loading products");
      }
    }
    loadProducts();
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 px-4 py-10">
      <h2 className="text-3xl font-bold mb-6 text-white text-center">Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-gray-800 rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-56 object-cover transition-transform duration-500 hover:scale-105"
            />
            <div className="p-6">
              <h3 className="text-xl font-semibold text-white mb-2 line-clamp-2">{product.name}</h3>
              <p className="text-gray-400 text-sm mb-4 line-clamp-2">{product.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-lg font-bold text-blue-400">${product.price}</span>
                <button
                  onClick={() => addToCart(product)}
                  className="bg-blue-600 text-white px-6 py-3 rounded-full flex items-center gap-2 shadow-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-105"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Products;
