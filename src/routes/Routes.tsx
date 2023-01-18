import { BrowserRouter, Route, Routes, } from "react-router-dom"
import { ProjectNavbar } from "../components/ProjectNavbar"
import { ProjectFooter } from "../components/ProjectFooter"
import { Home } from "../pages/Home"
import { Barriers } from "../pages/Barriers"
import { Dashboard } from "../pages/Dashboard"

const RouteItems = [
    { name: "Home", link: "/", element: <Home /> },
    { name: "Home", link: "/my-Archives/", element: <Home /> },
    { name: "Home", link: "/my-Archives/Dashboard", element: <Dashboard /> },
    { name: "Home", link: "/my-Archives/Barriers", element: <Barriers /> }
]


export const AppRoutes = () => {
    return (
        <div className="bg-white text-gray-900 dark:bg-gray-700 dark:text-gray-100">
            <BrowserRouter>
                <ProjectNavbar />
                <Routes>
                    {
                        RouteItems.map((item, index) => {
                            return (
                                <Route
                                    key={index}
                                    path={item.link}
                                    element={item.element}
                                />
                            )
                        })
                    }
                </Routes>
                <ProjectFooter />
            </BrowserRouter>
        </div>
    )
}