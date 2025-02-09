import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import UserProfileContext from "../context/UserContext";
import { getCartApi, placeOrderApi, removeFromCartApi, updateCartApi } from "../service/BackEnd";
import { useNavigate } from "react-router-dom";

function Cart() {
  const initialCartState = {
    id: "",
    totalAmount: 0,
    cartItems: [],
  };
  const [cart, setCart] = useState(initialCartState);
  const { token } = UserProfileContext();
  const navigator = useNavigate();

  useEffect(() => {
    async function loadCart() {
      try {
        const response = await getCartApi(token);
        console.log(response.data);
        setCart(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
        toast.error("An unexpected error occurred while loading cart");
      }
    }
    if (token === "") {
      toast.error("need to sign in to view cart");
      navigator("/login");
    } else {
      loadCart();
    }
  }, []);

  const updateQuantity = async(itemId, newQuantity) => {
    try {
      await updateCartApi(itemId,newQuantity, token);
      setCart((prevCart) => {
        const updatedItems = prevCart.cartItems.map((item) => {
          if (item.id === itemId) {
            const updatedTotalPrice = item.unitPrice * newQuantity;
            return {
              ...item,
              quantity: newQuantity,
              totalPrice: updatedTotalPrice,
            };
          }
          return item;
        });

        const updatedTotalAmount = updatedItems.reduce(
          (sum, item) => sum + item.totalPrice,
          0
        );

        return {
          ...prevCart,
          cartItems: updatedItems,
          totalAmount: updatedTotalAmount,
        };
      });
    } catch (error) {
      console.log(error);
      toast.error(
        "An unexpected error occurred while updating the cart"
      );
    }
  };

  const removeItem = async (itemId) => {
    try {
      await removeFromCartApi(itemId, token);
      setCart((prevCart) => {
        const updatedItems = prevCart.cartItems.filter(
          (item) => item.id !== itemId
        );
        const updatedTotalAmount = updatedItems.reduce(
          (sum, item) => sum + item.totalPrice,
          0
        );

        return {
          ...prevCart,
          cartItems: updatedItems,
          totalAmount: updatedTotalAmount,
        };
      });
    } catch (error) {
      console.log(error);
      toast.error(
        "An unexpected error occurred while removing the cart"
      );
    }
  };

  const placeOrder = async() => {
    try {
      await placeOrderApi(token);
      navigator("/orders")
      toast.success("order success")
    }
    catch(error) {
      console.log(error)
      toast.error("fail to place order")
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-6 text-white">Shopping Cart</h2>
      {cart.cartItems.length === 0 ? (
        <p className="text-center text-gray-600">Your cart is empty</p>
      ) : (
        <div className="bg-white rounded-lg shadow-md p-6">
          {cart.cartItems.map((item) => (
            <div key={item.id} className="flex items-center py-4 border-b">
              <div className="w-24 h-24 flex-shrink-0 mr-6">
                <img
                  src={item.productImageUrl}
                  alt={item.productName}
                  className="w-full h-full object-cover rounded-md"
                  onError={(e) => {
                    e.target.src = 'placeholder-image-url.jpg';
                    e.target.onerror = null;
                  }}
                />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold">{item.productName}</h3>
                <p className="text-gray-600">
                  Unit Price: ${item.unitPrice.toFixed(2)}
                </p>
                <p className="text-gray-600">
                  Total Price: ${item.totalPrice.toFixed(2)}
                </p>
              </div>
              <div className="flex items-center">
                <select
                  value={item.quantity}
                  onChange={(e) =>
                    updateQuantity(item.id, parseInt(e.target.value))
                  }
                  className="mx-2 border rounded-md p-1"
                >
                  {[1, 2, 3, 4, 5].map((num) => (
                    <option key={num} value={num}>
                      {num}
                    </option>
                  ))}
                </select>
                <button
                  onClick={() => removeItem(item.id)}
                  className="text-red-500 hover:text-red-600 ml-4 px-3 py-1 rounded-md hover:bg-red-50"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
          <div className="mt-6 flex justify-between items-center">
            <span className="text-xl font-bold">
              Total: ${cart.totalAmount.toFixed(2)}
            </span>
            <button 
              onClick={placeOrder} 
              className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition-colors"
            >
              Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;