import { useState, useEffect } from 'react'

//FIXME: This should be located in a ENV VARIABLE
const BASE_API_URL = 'http://localhost:4000/v1'

const useFetch = (url) => {
  const [response, setResponse] = useState([])
  const [error, setError] = useState<string>('')
  const [isLoading, setIsLoading] = useState<boolean>(false)

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      try {
        const res = await fetch(`${BASE_API_URL}/${url}`, _buildRequest('GET'))
        const json = await res.json()
        if (json.statusCode > 300) setError('An error has appeared, please reach out to support@mail.com')
        setResponse(json)
        setIsLoading(false)
      } catch (error) {
        // FIXME: We should redirect to an error Page
        setError('An error has appeared, please reach out to support@mail.com')
        setIsLoading(false)
      }
    }
    fetchData()
  }, [])

  return { response, error, isLoading }
}

const _buildRequest = (method) => {
  return {
    method: method,
    headers: { 'Content-Type': 'application/json' }
  }
}

export default useFetch
