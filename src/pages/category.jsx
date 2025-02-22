import React, { useEffect, useState } from 'react'
import axios from 'axios'

function Category() {
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(false)
  const [nameUz, setNameUz] = useState('')
  const [nameRu, setNameRu] = useState('')
  const [image, setImage] = useState(null)
  const imageUrl = 'https://realauto.limsa.uz/api/uploads/images'

  const getCategory = () => {
    setLoading(true)
    axios.get('https://realauto.limsa.uz/api/categories')
      .then(res => {
        setCategories(res.data.data)
        console.log("Fetched Categories:", res.data)
      })
      .catch(error => console.error("Error fetching categories:", error))
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    getCategory()
  }, [])

  const addCategory = async () => {
    if ( !nameUz || !nameRu || !image) {
      alert("Barcha maydonlarni to‘ldiring!")
      return
    }

    const formData = new FormData()
    formData.append('name_uz', nameUz)
    formData.append('name_ru', nameRu)
    formData.append('image', image)

    console.log("Yuborilayotgan ma'lumotlar:", formData)

    try {
      const response = await axios.post('https://realauto.limsa.uz/api/categories', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })

      console.log("Server javobi:", response.data)
      setCategories([...categories, response.data])
      setNameUz('')
      setNameRu('')
      setImage(null)
    } catch (error) {
      console.error("Error adding category:", error.response ? error.response.data : error)
    }
  }

  return (
    <div className='p-5'>
      <div className="mb-5 p-5 bg-gray-800 rounded-lg">
        <h2 className="text-white text-xl mb-3">Add New Category</h2>
        <input 
          type="text" 
          placeholder="Category Name (Uzbek)" 
          value={nameUz}
          onChange={(e) => setNameUz(e.target.value)}
          className="p-2 mr-2 rounded bg-gray-700 text-white"
        />
        <input 
          type="text" 
          placeholder="Category Name (Russian)" 
          value={nameRu}
          onChange={(e) => setNameRu(e.target.value)}
          className="p-2 mr-2 rounded bg-gray-700 text-white"
        />
        <input 
          type="file" 
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
          className="p-2 mr-2 rounded bg-gray-700 text-white"
        />
        <button 
          onClick={addCategory} 
          className="p-2 bg-cyan-600 text-white rounded">
          Add
        </button>
      </div>

      <div className='grid grid-cols-2 gap-5'>
        {loading ? <p className="text-center text-green-400 text-2xl">Loading...</p> : (
          categories.map(category => (
            <div className='grid grid-cols-1 gap-4 p-10 bg-gray-700 rounded-[40px]' key={category.id}>
              <div className='flex gap-8'>
                <h1 className='text-white text-[24px]'>Name:</h1>
                <p className='text-white text-[24px]'>{category.name_en}</p>
              </div>
              <img className='w-[450px] h-[300px]' src={`${imageUrl}/${category.image_src}`} alt={category.name_en} />
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default Category
