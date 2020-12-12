import React, { useState } from "react"
import DatePicker from "react-datepicker"
import { getDay } from "date-fns"

import "react-datepicker/dist/react-datepicker.css"

const PickADate = () => {
  const [isCompleted, setIsCompleted] = useState(false)
  const [startDate, setStartDate] = useState(new Date())
  const [selectedPeople, setSelectedPeople] = useState(1)

  const isWeekday = (date) => {
    const day = getDay(date)
    return day !== 0 && day !== 6
  }

  const handleSelectedPeople = (e) => setSelectedPeople(e.target.value)
  const handleSubmit = async () => {
    const form = {
      startDate,
      selectedPeople,
    }

    try {
      const response = await fetch("/api/post-calendar", {
        method: "POST",
        body: JSON.stringify(form),
      })
      const data = await response.json()
      if (data.status) {
        setIsCompleted(true)
      } else {
        alert("Ocorreu um erro...")
      }
    } catch (error) {}
  }

  return (
    <div className="flex justify-center items-center m-auto mt-20 mb-20 w-full bg-white">
      <div className="flex flex-col pt-40 pb-40 lg:flex-row lg:w-7/12 xl:w-7/12 xl:flex-row justify-center items-center w-11/12 h-32 rounded-md bg-indigo-500">
        {isCompleted && (
          <div className="flex flex-col p-2 lg:p-4 xl:p-4">
            <h3 className="text-2xl font-extrabold text-white">
              Horário Agendado.
            </h3>
            <p className="ml-1 text-sm text-indigo-200">Obrigado</p>
          </div>
        )}
        {!isCompleted && (
          <div className="flex flex-col p-2 lg:p-4 xl:p-4">
            <h3 className="text-2xl font-extrabold text-white">
              Faça uma Reserva
            </h3>
            <p className="ml-1 text-sm text-indigo-200">Agende seu Horário</p>
          </div>
        )}
        {!isCompleted && (
          <div className="flex p-2 lg:p-4 xl:p-4 items-center">
            <div className="flex flex-col">
              <DatePicker
                className="rounded text-xl mb-2"
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                dateFormat="dd/MM/yyyy - h:mm aa"
                showTimeSelect
                timeFormat="p"
                timeIntervals={15}
                filterDate={isWeekday}
              />
              <select
                className="rounded text-xl"
                onChange={handleSelectedPeople}
              >
                <option value={1}>Apenas Eu</option>
                <option value={2}>2 Pessoas</option>
                <option value={3}>3 Pessoas</option>
                <option value={4}>4 Pessoas</option>
              </select>
              <button
                className="w-32 h-10 mt-4 w-full text-sm font-extrabold text-white bg-blue-400 rounded-md hover:bg-blue-500"
                onClick={handleSubmit}
              >
                Agendar!
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default PickADate
