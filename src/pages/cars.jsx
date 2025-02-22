import React, { useEffect, useState } from 'react'
import axios from 'axios'

function Cars() {
  const [cars, setCars] = useState([])
  const [loading, setLoading] = useState(false)
  const imageUrl = 'https://realauto.limsa.uz/api/uploads/images'
  useEffect(() => {
    setLoading(true);
    fetch("https://realauto.limsa.uz/api/cars")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setCars(data.data);
      })
      .catch((error) => {
        console.error("Xatolik:", error);
      })
      .finally(() => {
        setLoading(false); 
      });
  }, []);
  return (
    <div className='grid grid-cols-2 pt-5 gap-5'>
      {loading && <h1 className='text-center text-2xl text-green-400'>Loading...</h1>}
      {cars.map(car => (
        <div className='grid grid-cols-2 gap-5 p-8 bg-gray-700 rounded-[40px]' key={car.id}>
          <img src={`${imageUrl}/${car.brand.image_src}`} alt={car.name} />
          <div className='flex'>
          <h2>Rusumi:</h2>
          <p>{car.brand.title}</p></div>
        </div>
      ))}
    </div> 
  )
}

export default Cars