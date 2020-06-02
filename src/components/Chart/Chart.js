import React, { useState, useEffect } from 'react'
import { fetchDailyCases } from '../../api'
import { Line, Bar } from 'react-chartjs-2'

import styles from './Chart.module.css'

const Charts = () => {
  const [dailyCases, setDailyCases] = useState([])

  useEffect(() => {
    const fetchAPI = async () => {
      setDailyCases(await fetchDailyCases())
    }

    fetchAPI()
  }, [])

  const lineChart = (
    dailyCases.length ? 
    (<Line 
      data={{
        labels: dailyCases.map(({ date }) => date),
        datasets: [{
          data: dailyCases.map(({ confirmed }) => confirmed),
          label: 'Infected',
          borderColor: '#333ff',
          fill: true
        }, {
          data: dailyCases.map(({ deaths }) => deaths),
          lable: 'Deaths',
          borderColor: 'red',
          backgroundColor: 'rgba(255, 0, 0, 0.5)',
          fill: true
        }]
      }}
      />) : null
  )

  return (
    <div>
      {lineChart}
    </div>
  )
}

export default Charts
