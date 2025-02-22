import React, { useEffect, useState } from 'react'
import axios from 'axios'

function Locations() {
  const [locations, setLocations] = useState([])
  const [loading, setLoading] = useState(false)
  const imageUrl = 'https://realauto.limsa.uz/api/uploads/images'
  
  useEffect(() => {
    setLoading(true)
    axios.get('https://realauto.limsa.uz/api/locations')
      .then(res => {
        setLocations(res.data.data)
        console.log("Fetched locations:", res.data.data)
      })
      .catch(err => {
        console.error("Error fetching locations:", err)
      })
      .finally(() => setLoading(false))
  }, []) 

  return (
    <div  className='grid grid-cols-2 pt-5 gap-5'>
      {loading && <div className="text-center text-green-400 text-2xl">Loading...</div>}
      {!loading && locations.length > 0 ? (
        locations.map(location => (
          <div key={location.id} className="p-4 bg-gray-700 rounded-3xl mb-4">
            <div className='flex gap-8 pb-4'>
            <h2 className="text-white text-3xl">Title:</h2>
            <p className="text-gray-300 pt-2">{location.name}</p>
            </div>
            <img className="w-full h-[300px] rounded-md" src={`${imageUrl}/${location.image_src}`} alt={location.name} />   
          </div>
        ))
      ) : (
        !loading && <p className="text-white text-center">No locations found.</p>
      )}
    </div>
  )
}

export default Locations
