import { Card } from "flowbite-react"
import { DashboardComponent } from "../components/DashboardComponent"

export const Dashboard = () => {
    return (
        <div className="h-screen container mx-auto">
            <Card className="w-10/12 xl:w-2/3 mx-auto m-10 shadow-md shadow-gray-200 dark:shadow-gray-600 rounded-xl">
                <DashboardComponent />
            </Card >
        </div >
    )
}