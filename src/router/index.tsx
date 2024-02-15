import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import PageNotFound from "../pages/PageNotFound";
import RootLayout from "../pages/Layout";
import ErrorHandler from "../components/errors/ErrorHandler";
import HomePage from "../pages";
import ProductsPage from "../pages/Products";
import ProductPage from "../pages/Product";
import LoginPage from "../pages/Login";
import CookieService from "../services/CookieService";
import ProtectedRoute from "../components/auth/ProtectedRoute";
import DashboardLayout from "../pages/dashboard/DashboardLayout";
import AdminDashboard from "../pages/dashboard/AdminDashboard";
import DashboardProducts from "../pages/dashboard/DashboardProducts";
import RegisterPage from "../pages/Register";

const token = CookieService.get("jwt") ? true : false;
const isAdmin = CookieService.get("isAdmin");

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      {/* Root Layout */}
      <Route path="/" element={<RootLayout />} errorElement={<ErrorHandler />}>
        <Route index element={<HomePage />} />
        <Route path="home" element={<HomePage />} />
        <Route
          path="products"
          element={
            <ProtectedRoute isAllowed={token} redirectPath="/login">
              <ProductsPage />
            </ProtectedRoute>
          }
          errorElement={<ErrorHandler />}
        />
        <Route
          path="products/:id"
          element={<ProductPage />}
          errorElement={<ErrorHandler />}
        />
        <Route
          path="login"
          element={
            <ProtectedRoute isAllowed={!token} redirectPath="/">
              <LoginPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="register"
          element={
            <ProtectedRoute isAllowed={!token} redirectPath="/">
              <RegisterPage />
            </ProtectedRoute>
          }
        />
      </Route>
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute isAllowed={isAdmin} redirectPath="/">
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<AdminDashboard />} />
        <Route
          path={"products"}
          element={<DashboardProducts />}
          errorElement={<ErrorHandler />}
        />
      </Route>
      {/* Page Not Found */}
      <Route path="*" element={<PageNotFound />} />
    </>
  )
);

export default router;
