import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom"

type SearchResult = {
  id: number
  name: string
}

function Search() {
  const [searchParams] = useSearchParams()
  const [data, setdata] = useState<SearchResult[]>([])

  useEffect(() => {
    async function fetchData() {
      const res: Response = await fetch('http://localhost:4000/data?' + searchParams)
      const data: SearchResult[] = await res.json()  
      setdata(data)
    }
    
    fetchData()
   
  }, [searchParams])
  
  return (
    <div>
      {data.map((result) => (
        <>
          <h1>id: {result.id}</h1>
          <h1>name: {result.name}</h1>
        </>
      ))}
    </div>
  )
}

export default Search