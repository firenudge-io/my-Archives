import { Table } from "flowbite-react";
import { useState } from "react"
import { ReadURL } from "../constants/URLS"

export const BarrierComponent = () => {
    //make a get request
    const [data, setData] = useState([])

    const fetchData = async () => {
        const response = await fetch(ReadURL);
        const values = await response.json();

        const Archives = values.Archives

        // CREATE ARRAY FROM DICTIONARY
        const new_array = []
        for (let i = 0; i < Object.keys(Archives.b1).length; i++) {
            new_array.push(
                [
                    { date: Archives.date[i] },
                    { time: Archives.time[i] },
                    { b1: Archives.b1[i] },
                    { b2: Archives.b2[i] },
                    { b3: Archives.b3[i] },
                    { b4: Archives.b4[i] }
                ]
            )
        }

        setData(new_array)
    }
    fetchData();

    return (
        <div className="container flex flex-col justify-start mb-16 mt-16 mx-auto">

            <div className="w-11/12 xl:w-3/4 mx-auto relative overflow-x-auto shadow-md shadow-gray-200 dark:shadow-gray-600 rounded-xl">
                <Table className="table-auto w-full text-sm text-left text-gray-500 dark:text-gray-400 rounded-xl">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:text-gray-400 dark:bg-gray-900 dark:border-gray-700 rounded-xl">
                        <tr>
                            <th className="px-6 py-3">Date</th>
                            <th className="px-6 py-3">Type</th>
                            <th className="px-6 py-3">b1</th>
                            <th className="px-6 py-3">b2</th>
                            <th className="px-6 py-3">b3</th>
                            <th className="px-6 py-3">b4</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data.length > 0 ?
                                data.reverse().map((item: any) => {
                                    return (
                                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                            <td className="px-6 py-4 text-gray-900 dark:text-white">
                                                {
                                                    item[0].date.split(" ")[0] === "WEEK" ?
                                                        <b>{item[0].date}</b>
                                                        :
                                                        <div>
                                                            <span className="text-gray-200 dark:text-gray-600 font-sans">{new Date(item[0].date).toLocaleDateString('en-US', { year: 'numeric' })}</span><br />
                                                            <span className="text-gray-900 dark:text-gray-50 font-mono">{new Date(item[0].date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })},</span><br />
                                                            <span className="text-gray-400 font-sans">{new Date(item[0].date).toLocaleDateString('en-US', { weekday: 'long' })}</span>
                                                        </div>
                                                }
                                            </td>
                                            <td className="px-6 py-4 text-gray-900 dark:text-white">{
                                                item[2].b1.split(")")[0].split("(")[1] === "A" ?
                                                    <span className="text-green-500 font-bold">Analysis</span>
                                                    :
                                                    item[2].b1.split(")")[0].split("(")[1] === "C" ?
                                                        <span className="text-blue-500 font-bold">Classic</span>
                                                        :
                                                        item[2].b1.split(")")[0].split("(")[1] === "S" ?
                                                            <span className="text-red-500 font-bold">Situation</span>
                                                            :
                                                            <></>
                                            }</td>
                                            <td className="px-6 py-4 text-gray-900 dark:text-white">{item[2].b1.split(")")[1]}</td>
                                            <td className="px-6 py-4 text-gray-900 dark:text-white">{item[3].b2}</td>
                                            <td className="px-6 py-4 text-gray-900 dark:text-white">{item[4].b3}</td>
                                            <td className="px-6 py-4 text-gray-900 dark:text-white">{item[5].b4}</td>
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
                                    <td className="px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">Loading Data</td>
                                </tr>
                        }
                    </tbody>
                </Table>
            </div>
        </div >
    )
}