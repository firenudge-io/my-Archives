import { Card } from "flowbite-react"
import { ProjectForm } from "../components/ProjectForm"

export const Home = () => {
    return (
        <div className="h-screen container mx-auto">
            <Card className="w-10/12 xl:w-2/3 mx-auto m-10">
                <ProjectForm />
            </Card >
        </div >
    )
}