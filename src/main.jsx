import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {
  RouterProvider,
} from "react-router-dom";
import router from './router/Root';
import AuthProvide from './authProvider/AuthProvide';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvide>
      <RouterProvider router={router} />
    </AuthProvide>
  </StrictMode>
)
