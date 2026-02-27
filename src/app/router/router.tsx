import { createBrowserRouter } from "react-router";
import Layout from "../layout/layout";
import NotFoundPage from "@/pages/not-found/not-found-page";
import AdsPage from "@/pages/ads/ads/ads-page";
import AdsOnePage from "@/pages/ads/ads-one/ads-one-page";
import AdminGuard from "@/shared/guard/admin-guard";
import CategoriesPage from "@/pages/categories/categories/categories-page";
import CategoriesOnePage from "@/pages/categories/categories-one/categories-one-page";
import RegistrationPage from "@/pages/auth/registration/registration-page";
import AuthorizationPage from "@/pages/auth/authorization/authorization-page";
import AuthGuard from "@/shared/guard/auth-guard";
import ProfilePage from "@/pages/profile/profile-page";
import OrdersPage from "@/pages/orders/orders-page";
import FavoritesPage from "@/pages/favorites/favorites-page";


const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        errorElement: <NotFoundPage />,
        children: [
            {
                path: "/",
                element: <AdsPage />
            },
            {
                path: "/ads",
                element: <AdsPage />
            },
            {
                path: "/ads/:id",
                element: <AdsOnePage />
            },

            {
                path: "/categories",
                element:
                    <AdminGuard>
                        <CategoriesPage />
                    </AdminGuard>
            },
            {
                path: "/categories/:id",
                element: <AdminGuard><CategoriesOnePage /></AdminGuard>
            },

            {
                path: "/reg",
                element: <RegistrationPage />
            },
            {
                path: "/auth",
                element: <AuthorizationPage />
            },
            {
                path: "/profile",
                element: <AuthGuard><ProfilePage /></AuthGuard>
            },
            {
                path: "/orders",
                element: <AuthGuard><OrdersPage /></AuthGuard>
            },
            {
                path: "/favorites",
                element: <AuthGuard><FavoritesPage /></AuthGuard>
            },
        ]
    }
])

export default router