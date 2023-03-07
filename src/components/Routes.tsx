import { PathRouteProps } from "react-router-dom";
import About from "./pages/About";
import Gallery from "./pages/Gallery";
import Home from "./pages/Home";
import Instructors from "./pages/Instructors";
import Lessons from "./pages/Lessons";

export enum Routes {
    HOME = "/",
    ABOUT = "/about",
    INSTRUCTORS = "/instructors",
    LESSONS = "/lessons",
    GALLERY = "/gallery",
}

export const publicRoutes: PathRouteProps[] = [
    {
        path: Routes.HOME,
        element: <Home />,
    },
    {
        path: Routes.ABOUT,
        element: <About />,
    },
    {
        path: Routes.INSTRUCTORS,
        element: <Instructors />,
    },
    {
        path: Routes.LESSONS,
        element: <Lessons />,
    },
    {
        path: Routes.GALLERY,
        element: <Gallery />,
    },
];
