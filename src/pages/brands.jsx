import React, { useEffect, useState } from 'react'
import axios from 'axios'

function Brands() {
  const [brands, setBrands] = useState([])
  const [loading, setLoading] = useState(false)
  const imageUrl = 'https://realauto.limsa.uz/api/uploads/images'

  const getBrands = () => {
    setLoading(true)
    axios.get('https://realauto.limsa.uz/api/brands')
      .then(res => {
        setBrands(res.data.data)
      })
      .catch(error => console.error("Error fetching brands:", error))
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    getBrands()
  }, [])

  return (
    <div className='grid grid-cols-2 pt-5 gap-5'>
      {loading ? <p className="text-center text-green-400 text-2xl">Loading...</p> : (
        brands.map(brand => (
          <div className='grid grid-cols-1 gap-5 p-5 bg-gray-700 rounded-[20px]' key={brand.id}>
            <div className='flex justify-between'>
              <h1 className='text-white text-[24px]'>Name:</h1>
              <p className='text-white text-[24px]'>{brand.title}</p>
            </div>
            <img className='w-[450px] h-[300px]' src={`${imageUrl}/${brand.image_src}`} alt={brand.title} />
          </div>
        ))
      )}
    </div>
  )
}

export default Brands
