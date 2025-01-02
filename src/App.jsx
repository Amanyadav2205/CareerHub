import { Button } from "@/components/ui/button"
 
import './App.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import AppLayout from "./layouts/app-layout"
import LandingPage from "./pages/landing"


const router = createBrowserRouter([
  {
    element: <AppLayout/>,
    children:[
      {
        path: '/',
        element : <LandingPage/>
      }
    ]
  }
])
function App() {
  

  return (
   <RouterProvider router={ router}/>
  )
}

export default App
