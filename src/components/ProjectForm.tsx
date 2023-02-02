import { Label, TextInput } from "flowbite-react"
import { useState } from "react"
import { SheetsURL } from "../constants/URLS";


export const ProjectForm = () => {

    // sheet
    const [rec, setRec] = useState([])
    const [date, setDate] = useState('')

    // SHEET FUNCTIONS
    const url = SheetsURL;

    const fetchData = async () => {
        const response = await fetch(url);
        const values = await response.json();

        const recValues = values.rsss;

        // split val  by ,
        const rVal = recValues.map((item: any) => {
            return {
                item: item.split('|||')
            }
        })

        // return item vise allotment
        const rVal2 = rVal.map((item: any) => {
            return {
                date: item.item[0],
                score: item.item[1],
                check: item.item[2],
                reason: item.item[3],
                underlying: item.item[4],
                problem: item.item[5],
                steps: item.item[6],
                today: item.item[7],
                gratitude: item.item[8]
            }
        })

        // DONT RETURN EMPTY VALUES
        const finalVal = rVal2.filter((item: any) => {
            return item.score !== ''
        })

        // RETURN VALUES BY DATE
        const finalVal2 = finalVal.filter((item: any) => {
            return item.date === date
        })

        setRec(finalVal2)
    }
    // CONVERT DATE TO 2021/12/8 FORMAT
    const date2 = date.replace(/-/g, '/');

    return (
        <div className="flex flex-col gap-4 z-0">
            <div className="w-11/12 xl:w-3/4 mx-auto">
                <div className="mt-4 mb-2 text-center block">
                    <Label
                        className="text-lg"
                        value="Enter the date"
                    />
                </div>

                <div className="flex flex-row align-center justify-center mb-7">
                    <TextInput type="date" onChange={(e) => {
                        setDate(e.target.value)
                    }} onClick={fetchData} className="w-64" />

                    <a href={"https://calendar.google.com/calendar/u/0/r/agenda/" + date2} rel="noreferrer" target={'_blank'} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 ml-5">
                        Calendar
                        <i className="fa-solid fa-arrow-up-right-from-square"></i>
                    </a>
                </div>


                {
                    // IF DATE IS EMPTY
                    date === "" ?
                        <div className="flex flex-col text-center">
                            <h4 className="text-2xl text-red-700">No data found</h4>
                            <h4 className="text-2xl text-blue-700">Try again</h4>
                        </div>
                        :
                        rec.map((thisPost) => (
                            <div key={thisPost.id} className="text-xl">
                                <p>
                                    <b>Date: </b>
                                    {
                                        // convert date to nov 12, 2020
                                        new Date(thisPost.date).toLocaleDateString('en-US', {
                                            month: 'long',
                                            day: 'numeric'
                                        })
                                    }
                                </p>
                                <p>
                                    <b>{thisPost.score === "" ? <></> : "Score: "}</b>
                                    {thisPost.score === "" ? <></> : thisPost.score}
                                </p>
                                <p>
                                    <b>{thisPost.check === "" ? <></> : "Check: "}</b>
                                    {thisPost.check === "" ? <></> : thisPost.check}
                                </p>
                                <p>
                                    <b>{thisPost.reason === "" ? <></> : "Reason: "}</b>
                                    {thisPost.reason === "" ? <></> : thisPost.reason}
                                </p>
                                <p>
                                    <b>{thisPost.underlying === "" ? <></> : "Underlying: "}</b>
                                    {thisPost.underlying === "" ? <></> : thisPost.underlying}
                                </p>
                                <p>
                                    <b>{thisPost.problem === "" ? <></> : "Problem: "}</b>
                                    {thisPost.problem === "" ? <></> : thisPost.problem}
                                </p>
                                <p>
                                    <b>{thisPost.steps === "" ? <></> : "Steps: "}</b>
                                    {thisPost.steps === "" ? <></> : thisPost.steps}
                                </p>
                                <p>
                                    <b>{thisPost.today === "" ? <></> : "Today: "}</b>
                                    {thisPost.today === "" ? <></> : thisPost.today}
                                </p>
                                <p>
                                    <b>{thisPost.gratitude === "" ? <></> : "Gratitude: "}</b>
                                    {thisPost.gratitude === "" ? <></> : thisPost.gratitude}
                                </p>
                            </div>
                        ))
                }
            </div>
        </div>
    )
}
