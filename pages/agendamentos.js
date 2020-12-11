import React, { useState, useEffect } from 'react'

import PageTitle from '../components/PageTitle'

const Agendamentos = () => {
    const [isLoading, setLoading] = useState(true)
    const [data, setData] = useState([])

    useEffect(async () => {
        try {
            const response = await fetch("/api/get-calendar")
            const data = await response.json()
            setData(data)
            setLoading(false)
        } catch (error) {
            alert('Ocorreu um erro..')
        }
    }, [])

    return (
        <>
            <PageTitle title='Agenda Simples' />
            <pre>
                {
                    !isLoading &&
                    JSON.stringify(data, null, 2)
                }
            </pre>
        </>
    )
}

export default Agendamentos
