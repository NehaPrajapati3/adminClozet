
import './App.css';
import Home from './home/home';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Login from './login/login';
import Admin from './pages/admin/admin';
import Register from './register/register';
import AuthLayout from "./hooks/Authlayout.jsx";


import SellerList from './pages/sellerlist/sellerlist';
import AddNewSeller from './pages/addnewseller/addnewseller';
import AddProduct from './pages/addproduct/addproduct';
import DashboardPage from './pages/dashboard/dashboard';

function App() {
  const routes = createBrowserRouter([
    {
      path: "/",
      element: (
        <AuthLayout>
          <Home />
         </AuthLayout>
      ),

      children: [
        {
          path: "/dashboard",
          element: <DashboardPage />,
        },
        {
          path: "/admin",
          element: <Admin />,
        },
        {
          path: "/sellerlist",
          element: <SellerList />,
        },
        {
          path: "/addnewseller",
          element: <AddNewSeller />,
        },
        {
          path: "/addproduct",
          element: <AddProduct />,
        },
      ],
    },
    {
      path: "/login",
      element: (
        <AuthLayout authentication={false}>
          <Login />
         </AuthLayout>
      ),
    },
    {
      path: "/register",
      element: (
         <AuthLayout authentication={false}>
          <Register />
        </AuthLayout>
      ),
    },
  ]);

  return (
    
      <RouterProvider router={routes} />
     
    
  );
}

export default App;
