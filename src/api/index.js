import axios from 'axios'

const url = 'https://covid19.mathdro.id/api'

export const fetchData = async () => {
  try {
    // destructure the response and grab just the data. then destructure again to grab the specific data we want
    const { data : {confirmed, deaths, recovered, lastUpdate} } = await axios.get(url)

    return {confirmed, deaths, recovered, lastUpdate}

  } catch (error) {
    
  }
}

export const fetchDailyCases = async () => {
  try {
    const { data } = await axios.get(`${url}/daily`)

    const modifiedData = data.map((dailyCases) => ({
      confirmed: dailyCases.confirmed.total,
      deaths: dailyCases.deaths.total,
      date: dailyCases.reportDate
    }))

    return modifiedData
  } catch (error) {
    
  }
}