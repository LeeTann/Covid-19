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