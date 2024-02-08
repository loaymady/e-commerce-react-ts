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

const token = CookieService.get("jwt") ? true : false;

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      {/* Root Layout */}
      <Route path="/" element={<RootLayout />} errorElement={<ErrorHandler />}>
        <Route index element={<HomePage />} />
        <Route path="home" element={<HomePage />} />
        <Route path="products" element={<ProductsPage />} />
        <Route path="products/:id" element={<ProductPage />} />
        <Route
          path="login"
          element={
            <ProtectedRoute isAllowed={!token} redirectPath="/">
              <LoginPage />
            </ProtectedRoute>
          }
        />
      </Route>
      <Route path="/dashboard" element={<DashboardLayout />}>
        <Route index element={<AdminDashboard />} />
        <Route path={"products"} element={<DashboardProducts />} />
        <Route path={"categories"} element={<h1>Categories</h1>} />
      </Route>
      {/* Page Not Found */}
      <Route path="*" element={<PageNotFound />} />
    </>
  )
);

export default router;
