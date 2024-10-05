import { Button } from "flowbite-react"
import TodoList from "./components/TodoList"
import {BrowserRouter, Routes, Route} from "react-router-dom"
import SignUp from "./pages/SignUp"
export default function App() {
  return (
     <BrowserRouter>
     <Routes>
        <Route path="/" element={<TodoList />} /> 
        <Route path="/signup" element={<SignUp />} />
      </Routes> 
     </BrowserRouter> 
  )
}