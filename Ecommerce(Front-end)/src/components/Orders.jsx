import { useEffect, useState } from "react";
import UserProfileContext from "../context/UserContext";
import { getOrdersApi } from "../service/BackEnd";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function App() {
  const [orders, setOrders] = useState([]);
  const { token } = UserProfileContext();
  const navigator = useNavigate();

  useEffect(() => {
    async function loadOrders() {
      try {
        const response = await getOrdersApi(token);
        console.log(response.data);
        setOrders(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
        toast.error("An unexpected error occurred while loading orders");
      }
    }
    if (token === "") {
      toast.error("Need to sign in to view orders");
      navigator("/login");
    } else {
      loadOrders();
    }
  }, [token, navigator]);

  // Function to format the date to "12/25/2024 09:31 pm"
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    const year = date.getFullYear();
    let hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const ampm = hours >= 12 ? "pm" : "am";
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    return `${month}/${day}/${year} ${hours}:${minutes} ${ampm}`;
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-6 text-white">Orders</h2>
      {orders.length === 0 ? (
        <p className="text-center text-gray-600">No orders found</p>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div
              key={order.orderId}
              className="bg-white rounded-lg shadow-md p-6"
            >
              <div className="flex justify-between items-center mb-4">
                <div>
                  <p className="text-sm text-gray-600">
                    Order #{order.orderId}
                  </p>
                  <p className="text-sm text-gray-600">
                    Placed on {formatDate(order.dateOfOrder)}
                  </p>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-sm ${
                    order.status === "Delivered"
                      ? "bg-green-100 text-green-800"
                      : "bg-blue-100 text-blue-800"
                  }`}
                >
                  {order.status}
                </span>
              </div>
              <div className="border-t pt-4">
                {order.orderItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-4 mb-4 p-2 hover:bg-gray-50 rounded"
                  >
                    <div className="w-20 h-20 flex-shrink-0">
                      <img
                        src={item.productImageUrl}
                        alt={item.productName}
                        className="w-full h-full object-cover rounded"
                        onError={(e) => {
                          e.target.src = "/placeholder-image.jpg";
                          e.target.onerror = null;
                        }}
                      />
                    </div>
                    <div className="flex-grow">
                      <p className="font-semibold">{item.productName}</p>
                      <p className="text-sm text-gray-600">
                        Quantity: {item.quantity}
                      </p>
                      <p className="text-sm text-gray-600">
                        Price: ${item.unitPrice.toFixed(2)}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">
                        ${(item.unitPrice * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="border-t pt-4 mt-4">
                <div className="flex justify-between items-center">
                  <span className="font-bold">Total</span>
                  <span className="font-bold">
                    ${order.totalAmount.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
