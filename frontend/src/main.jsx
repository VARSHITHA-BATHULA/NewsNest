import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import axios from "axios";
import { Network } from "lucide-react";
import { NewsProvider } from "./context/NewsContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <NewsProvider>
      <App />
    </NewsProvider>
  </StrictMode>
);
