import { Link } from "react-router-dom"
import { ReadingsSummaryCard } from "../components/ReadingsSummaryCard"

export const ReadingsSummary = () => {
    return (
        <div className="container mx-auto">

            <div className="flex flex-row justify-center mt-10 mb-5">
                <div className="inline-flex rounded-md shadow-sm" role="group">
                    <Link to="/my-Archives/Readings/History">
                        <button type="button" className="px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-l-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white">
                            History
                        </button>
                    </Link>
                    <button className="px-4 py-2 text-sm font-medium rounded-r-md bg-gray-100 text-blue-700 dark:text-white dark:bg-gray-600 cursor-default">
                        Summary
                    </button>
                </div>
            </div>

            <ReadingsSummaryCard />

        </div >
    )
}