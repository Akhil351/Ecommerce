import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Toaster } from "react-hot-toast";
createRoot(document.getElementById("root")).render(
  <>
  <Toaster position="top-center" />
  <App/>
  </>
)
;
