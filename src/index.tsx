import "@/styles/tailwind.css";
import 'antd/dist/antd.variable.min.css';
import "@/styles/home.less";

// import { StrictMode } from "react";
import { createRoot } from 'react-dom/client';
import AppRouter from '@/routes/index'

createRoot(document.getElementById("root")).render(
  // <StrictMode>
  // </StrictMode>
  <AppRouter />
)
