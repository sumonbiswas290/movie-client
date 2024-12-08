import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Layout from '../layout/Layout';
import Home from '../pages/Home';
import AllMovie from '../pages/AllMovie';
import AddMovie from '../pages/AddMovie';
import MyFavorites from '../pages/MyFavorites';
import SignIn from '../components/SignIn';
import SignUp from '../components/SignUp';
import MovieDetails from '../components/MovieDetails';
import FeaturedMovies from '../components/FeatureMovies';
import ErrorElement from '../components/ErrorElement';
import UpdateMovies from '../components/UpdateMovies';
import AboutUs from '../components/AboutUs';
import PrivateRoute from './PrivateRouter';

const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout/>,
      errorElement: <ErrorElement/>,
      children: [
        {
            path: '/',
            element: <Home/>
        },
        {
            path: "/featuremovie",
            element: <FeaturedMovies/>,
            loader: () => fetch('http://localhost:5000/movie'),
        },
        {
            path: '/allmovie',
            element: <AllMovie/>,
            loader: () => fetch('http://localhost:5000/movie')
        },
        {
            path: '/addmovie',
            element: <PrivateRoute><AddMovie/></PrivateRoute>
        },
        {
            path: '/myfavorites',
            element: <PrivateRoute><MyFavorites/></PrivateRoute>
        },
        {
            path: '/updatemovie/:id',
            element: <PrivateRoute><UpdateMovies/></PrivateRoute>,
            loader: ({params}) => fetch(`http://localhost:5000/movie/${params.id}`)
        },
        {
            path: '/signin',
            element: <SignIn/>
        },
        {
            path: '/signup',
            element: <SignUp/>
        },
        {
            path: '/moviedetais/:id',
            element: <PrivateRoute><MovieDetails/></PrivateRoute>,
            loader: ({ params }) => fetch(`http://localhost:5000/movie/${params.id}`)
        },
        {
            path: '/about',
            element: <AboutUs/>
        }
      ]
    },
  ]);
export default router;