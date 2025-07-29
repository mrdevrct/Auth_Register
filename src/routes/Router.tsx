import { Suspense, lazy } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "../App";
import LoadingSpinner from "../components/LoadingSpinner";

const Login = lazy(() => import("../pages/login/LoginPage"));
const Home = lazy(() => import("../pages/home/Home"));


function AppRouter() {
  return (
    <BrowserRouter>
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          {/* Main Wrapper: App */}
          <Route element={<App />}>
            {/* مسیر اصلی (Home) */}
            <Route path="/" element={<Home />} />

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
