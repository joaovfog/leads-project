import { createBrowserRouter } from "react-router-dom";
import { AppLayout } from "./_layout/app";
import { NotFound } from "./pages/404";

export const router = createBrowserRouter([
    {
        path: '',
        element: <AppLayout />,
    },
    {
        path: '*',
        element: <NotFound />,
    }
])