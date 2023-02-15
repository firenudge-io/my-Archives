import { Card } from "flowbite-react";
import { useState } from "react"
import { ReadURL2 } from "../constants/URLS"

export const ReadingsSummaryCard = () => {
    //make a get request
    const [dumpdata, setDumpdata] = useState([])
    const [thisBookname, setThisBookname] = useState("")

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

        setDumpdata(new_array)
    }
    fetchData();

    const data = dumpdata.sort((a, b) => {
        if (a[1].book < b[1].book) { return -1; }
        if (a[1].book > b[1].book) { return 1; }
        return 0;
    })

    // create new array and push unique book names
    const booklist = []
    for (let i = 0; i < data.length; i++) {
        // if book name is not in the array, push it
        if (booklist.indexOf(data[i][1].book) === -1) {
            booklist.push(data[i][1].book)
        }
    }

    return (
        <div className="container mb-32 flex flex-wrap flex-col mx-auto justify-center items-center">
            <div className="flex flex-wrap flex-row mx-auto justify-center items-center">
                {
                    booklist.map((item: any) => {
                        return (
                            item === "" ?
                                <></>
                                :
                                <div>
                                    <button className="px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white m-3" onClick={() => setThisBookname(item)}>
                                        <b>{item}</b>
                                    </button>
                                </div>
                        )
                    })
                }
            </div>
            <div className="flex flex-wrap flex-row mx-auto justify-center items-center">
                {
                    data.length > 0 ?
                        data.map((item: any) => {
                            return (
                                item[1].book === thisBookname ?
                                    item[0].date.split(" ")[0] === "WEEK" ?
                                        <></>
                                        :

                                        <Card className="w-96 m-2 bg-white border-b dark:bg-gray-800 dark:border-gray-700 shadow-md shadow-gray-200 dark:shadow-gray-600 rounded-2xl">
                                            <div className="text-right text-gray-900 dark:text-white">
                                                {
                                                    <div>
                                                        <span className="text-gray-500 dark:text-gray-400 font-sans">{new Date(item[0].date).toLocaleDateString('en-US', { weekday: 'long' })}</span>, <span className="font-sans">{new Date(item[0].date).toLocaleDateString('en-US', { month: 'long' })}</span> <span className="font-sans">{new Date(item[0].date).toLocaleDateString('en-US', { day: 'numeric' })}</span>
                                                    </div>
                                                }
                                            </div>
                                            <div className="text-gray-900 dark:text-white text-xl text-center">
                                                <b>{item[1].book}</b>
                                            </div>
                                            <div className="text-gray-900 dark:text-white">
                                                {item[3].summary}
                                            </div>
                                            <div className="ml-3">
                                                <div className="text-gray-500 dark:text-gray-400 border-l-4 border-gray-400 pl-2 rounded-t-md">
                                                    <em>{item[4].quote}</em>
                                                </div>
                                            </div>
                                        </Card>
                                    :
                                    <></>
                            )
                        })
                        :
                        <div className="bg-gray-100 flex flex-wrap flex-row mx-auto justify-center items-center dark:bg-gray-800 rounded-xl shadow-xl text-gray-900 dark:text-white cursor-default select-none">
                            <div className="px-6 py-4">
                                <b>Loading Data</b>
                            </div>
                        </div>
                }

            </div>
        </div>
    )
}