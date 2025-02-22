import React, { useEffect, useState } from 'react'
import axios from 'axios'

function Cities() {
  const [cities, setCities] = useState([])
  const [loading, setLoading] = useState(false)
  const imageUrl = 'https://realauto.limsa.uz/api/uploads/images'

  useEffect(() => {
    setLoading(true)
    axios.get('https://realauto.limsa.uz/api/cities')
      .then(res => {
        setCities(res.data.data)
        console.log("Fetched cities:", res.data.data)
      })
      .catch(error => console.error("Error fetching cities:", error))
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className="grid grid-cols-2 gap-5 p-5">
      {loading ? (
        <p className="text-center text-green-400 text-2xl">Loading...</p>
      ) : cities.length > 0 ? (
        cities.map(city => (
          <div key={city.id} className="grid grid-cols-2 gap-5 p-8 bg-gray-700 rounded-[40px]">
            <h2 className="text-white text-xl">{city.name}</h2>
            { (
              <img className="w-full h-[200px] rounded-md mt-3" src={`${imageUrl}/${city.image_src}`} alt={city.name} />
            )}
          </div>
        ))
      ) : (
        <p className="text-white text-center">No cities found.</p>
      )}
    </div>
  )
}

export default Cities
