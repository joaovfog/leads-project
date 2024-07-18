import { createBrowserRouter } from "react-router-dom";
import { AppLayout } from "./_layout/app";
import { NotFound } from "./pages/404";
import { LeadsListPage } from "./pages/Leads/List/leads-list";
import { CreateLeadsPage } from "./pages/Leads/Create/leads-create";

export const router = createBrowserRouter([
    {
        path: '',
        element: <AppLayout />,
        children: [
            { path: '/', element: <LeadsListPage /> },
            { path: '/create', element: <CreateLeadsPage /> }
        ]
    },
    {
        path: '*',
        element: <NotFound />,
    }
])