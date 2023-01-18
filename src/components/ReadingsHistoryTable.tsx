import { Table } from "flowbite-react";
import { useState } from "react"
import { ReadURL2 } from "../constants/URLS"

export const ReadingsHistoryTable = () => {
    //make a get request
    const [data, setData] = useState([])

    const fetchData = async () => {
        const response = await fetch(ReadURL2);
        const values = await response.json();

        const Archives = values.Archives

        // CREATE ARRAY FROM DICTIONARY
        const new_array = []
        for (let i = 0; i < Object.keys(Archives.book).length; i++) {
            new_array.push(
                [{ date: Archives.date[i] },
                { book: Archives.book[i] },
                { pages: Archives.pages[i] },
                { summary: Archives.summary[i] },
                { quote: Archives.quote[i] }]
            )
        }

        setData(new_array)
    }
    fetchData();

    return (
        <div className="container mb-16 flex flex-col justify-start mx-auto">

            <div className="w-11/12 xl:w-3/4 mx-auto relative overflow-x-auto shadow-md shadow-gray-200 dark:shadow-gray-600 rounded-xl">
                <Table className="text-sm text-left text-gray-500 dark:text-gray-400 rounded-xl table-auto">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:text-gray-400 dark:bg-gray-900 dark:border-gray-700 rounded-xl">
                        <tr>
                            <th className="px-6 py-3 w-10">Date</th>
                            <th className="px-6 py-3 w-10">Book Name</th>
                            <th className="px-6 py-3 w-10">Pages</th>
                            <th className="px-6 py-3 w-10">Summary</th>
                            <th className="px-6 py-3 w-10">Quotes</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data.length > 0 ?
                                data.reverse().map((item: any) => {
                                    return (
                                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                            <td className="px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                                                {
                                                    item[0].date.split(" ")[0] === "WEEK" ?
                                                        <b>{item[0].date}</b>
                                                        :
                                                        <div>
                                                            <span className="text-gray-400 font-sans">{new Date(item[0].date).toLocaleDateString('en-US', { weekday: 'long' })}</span>,
                                                            <span className="text-gray-900 dark:text-gray-50 font-mono ml-2">{new Date(item[0].date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                                                        </div>
                                                }
                                            </td>
                                            <td className="px-6 py-4 text-gray-900 dark:text-white">{item[1].book}</td>
                                            <td className="px-6 py-4 text-gray-900 dark:text-white">{item[2].pages}</td>
                                            <td className="px-6 py-4 text-gray-900 dark:text-white">{item[3].summary}</td>
                                            <td className="px-6 py-4 text-gray-900 dark:text-white">{item[4].quote}</td>
                                        </tr>
                                    )
                                })
                                :
                                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                    <td className="px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">Loading Data</td>
                                    <td className="px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">Loading Data</td>
                                    <td className="px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">Loading Data</td>
                                    <td className="px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">Loading Data</td>
                                    <td className="px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">Loading Data</td>
                                </tr>
                        }
                    </tbody>
                </Table>
            </div>
        </div >
    )
}