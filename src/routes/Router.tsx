import { Suspense, lazy } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "../App";
import LoadingSpinner from "../components/LoadingSpinner";
import ProtectedRoute from "./ProtectedRoute";
import MainLayout from "@/wrappers/MainLayout";

const Login = lazy(() => import("../pages/login/LoginPage"));
const Home = lazy(() => import("../pages/home/HomePage"));
const Products = lazy(() => import("../pages/products/ProductsPage"));


function AppRouter() {
  return (
    <BrowserRouter>
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          {/* Main Wrapper: App */}
          <Route element={<App />}>
            {/* مسیرهای محافظت‌شده */}
            <Route element={<ProtectedRoute />}>
              <Route element={<MainLayout />}>
                <Route path="/" element={<Home />} />
                <Route path="/products" element={<Products />} />
              </Route>
            </Route>

            {/* مسیرهای مربوط به احراز هویت */}
            <Route path="auth">
              <Route path="login" element={<Login />} />
            </Route>
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default AppRouter;
