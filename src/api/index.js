import axios from 'axios'

const url = 'https://covid19.mathdro.id/api'

export const fetchData = async (country) => {
  let changeableUrl = url

  if (country) {
    changeableUrl = `${url}/countries/${country}`
  }

  try {
    // destructure the response and grab just the data. then destructure again to grab the specific data we want
    const { data : {confirmed, deaths, recovered, lastUpdate} } = await axios.get(changeableUrl)

    return {confirmed, deaths, recovered, lastUpdate}

  } catch (error) {
    console.log(error)
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
    console.log(error)
  }
}

export const fetchCountries = async () => {
  try {
    const { data: { countries }} = await axios.get(`${url}/countries`)

    return countries.map((country) => country.name)
  } catch (error) {
    console.log(error)
  }
}