import { createBrowserRouter, RouterProvider } from "react-router-dom"; 
import App from '../App.jsx'; // App komponentasini import qilamiz
import Category from '../pages/category.jsx'; // Category komponentasini import qilamiz
import Login from '../pages/login.jsx'; // Login komponentasini import qilamiz
import Brands from '../pages/brands.jsx'; // Brands komponentasini import qilamiz
import Cars from '../pages/cars.jsx';
import Locations from '../pages/locations.jsx'; 
import Cities from '../pages/cities.jsx'; // cities komponentasini import qilamiz

export const Router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    children: [
      {
        path: "/",
        element: <Category/>,
      },
      {
        path: "/login",
        element: <Login/>,
      },
      {
        path: "/brands",
        element: <Brands/>,
      },
      {
        path:"/cars",
        element: <Cars/>,
      },
      {
        path:"/locations",
        element: <Locations/>,
      },
      {
        path:"/cities",
        element: <Cities/>,
      },
    ],
  },
]);

