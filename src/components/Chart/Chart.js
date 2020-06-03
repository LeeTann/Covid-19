import React, { useState, useEffect } from 'react'
import { fetchDailyCases } from '../../api'
import { Line, Bar } from 'react-chartjs-2'

import styles from './Chart.module.css'

const Charts = ({ data: { confirmed, recovered, deaths }, country }) => {
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
  console.log(confirmed, recovered, deaths)
  const barChart = (
    confirmed ? 
    (<Bar 
      data={{
        labels: [`Infected`, `Recovered`, `Deaths`],
        datasets: [{
          label: 'People',
          backgroundColor: [
            'rgba(0, 0, 255, 0.5)',
            'rgba(0, 255, 0, 0.5)',
            'rgba(255, 0, 0, 0.5)'
          ],
          data: [confirmed.value, recovered.value, deaths.value]
        }]
      }}
      options={{
       legend: { display: false },
       title: { display: true, text: `Current state in ${country}`} 
      }}
    />) : null
  )

  return (
    <div className={styles.container}>
      {country ? barChart : lineChart}
    </div>
  )
}

export default Charts
