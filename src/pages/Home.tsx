import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link } from "react-router-dom";
import { auth } from "../config/Firebase";
import { EmailURL } from "../constants/URLS";
import { SignIn } from "../security/SignIn"

export const Home = () => {
    const [user] = useAuthState(auth);

    // sheet
    const [email, setEmail] = useState([])

    // SHEET FUNCTIONS
    const url = EmailURL;

    const fetchData = async () => {
        const response = await fetch(url);
        const values = await response.json();

        const emailValues = values.users;

        // split val  by ,
        const rVal = emailValues.map((item: any) => {
            return {
                item: item.split('|||')
            }
        })

        // return item vise allotment
        const rVal2 = rVal.map((item: any) => {
            return {
                email: item.item[0],
            }
        })

        // DONT RETURN EMPTY VALUES
        const finalVal = rVal2.filter((item: any) => {
            return item.email !== ''
        })

        // CHECK FOR USER
        const finalVal2 = finalVal.filter((item: any) => {
            return item.email === user?.email
        })

        setEmail(finalVal2)
    }

    fetchData();

    return (
        <>
            {
                user ?
                    email.length > 0
                        ?
                        <div className="h-screen flex flex-col items-center mt-48 text-xl cursor-default select-none">
                            <h1>You are signed in <span className="text-green-500 dark:text-green-300 font-mono">Successfully</span></h1>
                            <h1>Visit <Link
                                to="/my-Archives/Dashboard"
                                className="text-teal-400 font-bold hover:text-teal-500 dark:hover:text-teal-300 hover:underline">
                                Dashboard
                            </Link>
                            </h1>
                        </div>
                        :
                        <div className="h-screen flex flex-col items-center mt-48 cursor-default select-none">
                            <h1 className="text-2xl text-gray-600 dark:text-gray-300"><span className="text-red-700 dark:text-red-500 font-mono">Still Loading.. </span> Make sure you are <b>authorized</b> to access this page</h1>
                            <div className="animate-pulse mt-5">
                                <SignIn />
                            </div>
                        </div>
                    :
                    <div className="h-screen flex flex-col items-center mt-48 cursor-default select-none">
                        <SignIn />
                    </div>
            }
        </>
    )
}
