import Landing from "../pages/Landing/landing";
import NotFound from "../pages/NotFound/notFound";

export const routes = [
    { path: "*", element: < NotFound /> },
    { path: "/", element: < Landing /> },
];