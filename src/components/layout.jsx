import React from 'react';
import { useNavigate, Outlet, NavLink } from 'react-router-dom'; // NavLink import qilindi
import Categories from '../pages/category.jsx';
import Brands from '../pages/brands.jsx';
import Cars from '../pages/cars.jsx';
import Locations from '../pages/locations.jsx'; 
import Cities from '../pages/cities.jsx';

function Layout() {
  const navigate = useNavigate();

  const Logout = () => {
    localStorage.removeItem('accessToken');
    navigate('/login');
  };

  return (
    <div>
      <header className='bg-gray-800 '>
        <h1 activeClassName="active" className='text-2xl text-right text-blue-300 cursor-pointer' onClick={Logout}>Log Out</h1>
      </header>
      <div className='grid grid-cols-12'>
        <div className='col-span-2 p-4 bg-gray-600  h-[94vh]'>
          <div> 
            <NavLink to="/" activeClassName="active" className="text-white block p-2">Category</NavLink>  
          </div>
          <div> 
            <NavLink to="/brands" activeClassName="active" className="text-white block p-2">Brands</NavLink>  
          </div>
          <div> 
            <NavLink to="/cars" activeClassName="active" className="text-white block p-2">Cars</NavLink>  
          </div>
          <div> 
            <NavLink to="/locations" activeClassName="active" className="text-white block p-2">Locations</NavLink>  
          </div>
        <div> 
            <NavLink to="/cities" activeClassName="active" className="text-white block p-2">Cities</NavLink>
            </div>
        </div>
        <div className='bg-white col-span-10 p-4 overflow-y-scroll h-[94vh]'><Outlet/></div>
      </div>
    </div>
  );
}

export default Layout;
