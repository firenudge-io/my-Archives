import { Navbar } from "flowbite-react"
import DarkModeButton from "../hooks/DarkModeButton"
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { SignOut } from "../security/SignOut";
import { auth } from "../config/Firebase";
import { useAuthState } from "react-firebase-hooks/auth";

const Nav_Items = [
    { name: "Home", link: "/my-Archives/" },
    { name: "Dashboard", link: "/my-Archives/Dashboard" },
    { name: "Barriers", link: "/my-Archives/Barriers" },
    { name: "Readings", link: "/my-Archives/ReadingsHistory" }
]

export const ProjectNavbar = () => {

    const [user] = useAuthState(auth);

    const [active, setActive] = useState(Nav_Items[0].name)

    function ButtonPress(arg: string) {
        setActive(arg)
    }

    return (
        <div className="sticky top-0 shadow-sm bg-white dark:bg-gray-800 z-50">
            <Navbar fluid={true} rounded={true} className="container bg-white dark:bg-gray-800 mx-auto">
                <Link
                    className="text-gray-600 hover:text-blue-700 dark:text-gray-200 dark:hover:text-white"
                    onClick={() =>
                        ButtonPress(Nav_Items[0].name)}
                    to={Nav_Items[0].link}>
                    <Navbar.Brand>
                        <img src="https://raw.githubusercontent.com/dependabot-pr/Static-Files/main/Assets/my/Archives.svg" className="mr-3 h-6 sm:h-9 rounded-lg" alt="Logo" />
                        <span className="self-center whitespace-nowrap text-xl font-semibold">
                            my-Archives
                        </span>
                    </Navbar.Brand>
                </Link>
                <Navbar.Toggle />
                <Navbar.Collapse>
                    {
                        user &&
                        Nav_Items.map((item, index) => {
                            return (
                                <Link
                                    onClick={() =>
                                        ButtonPress(item.name)}
                                    to={item.link}
                                    key={index}>
                                    <Navbar.Link
                                        className="mt-1 text-center rounded-lg"
                                        active={active === item.name}>
                                        {item.name}
                                    </Navbar.Link>
                                </Link>
                            )
                        })
                    }
                    {
                        user &&
                        <div className="self-center">
                            <SignOut />
                        </div>
                    }
                    <div className="self-center">
                        <DarkModeButton />
                    </div>
                </Navbar.Collapse>
            </Navbar>
        </div>
    )
}