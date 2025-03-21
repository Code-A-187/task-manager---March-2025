import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import LoginForm from './components/auth/LoginForm'
import ProtectedRoute from './components/ProtectedRoute'
import RegistrationForm from './components/auth/RegistrationForm'
import TaskList from './components/TasksList'



function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={ <LoginForm/>} />
        <Route path='/register' element= { <RegistrationForm/> } />
        <Route path='/tasks' element= { <TaskList/> } />
        <Route element={ <ProtectedRoute/>}>
        <Route path='/tasks' element= { <TaskList/> } />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
