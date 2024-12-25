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
      toast.success("product added to cart");
    } catch (error) {
      console.error(error.response);
      const errorCode = error?.response?.data?.error;
      if (errorCode === "Forbidden") {
        toast.error("Sign in required");
        navigator("/login")
      }
      else{
        toast.error(
          "An unexpected error occurred while adding product into the cart"
        );
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
    <div>
      <h2 className="text-2xl font-bold mb-6">Products</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-lg shadow-md overflow-hidden"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-49 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
              <p className="text-gray-600 mb-4">{product.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-lg font-bold">${product.price}</span>
                <button
                  onClick={() => addToCart(product)}
                  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
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
