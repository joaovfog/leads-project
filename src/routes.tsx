import { createBrowserRouter } from "react-router-dom";
import { AppLayout } from "./_layout/app";
import { NotFound } from "./pages/404";
import { LeadsListPage } from "./pages/Leads/leads-list";

export const router = createBrowserRouter([
    {
        path: '',
        element: <AppLayout />,
        children: [
            { path: '/', element: <LeadsListPage /> }
        ]
    },
    {
        path: '*',
        element: <NotFound />,
    }
])