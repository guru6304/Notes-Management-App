import './App.css';
import { BrowserRouter,Routes, Route, Navigate } from 'react-router-dom';
import PrivateRoutes from './components/PrivateRoute';
import Register from './pages/Register';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path ="/" element={<Login/>}/>
      <Route path ="/register" element={<Register/>}/>
      <Route path="/dashboard" element= {
        <PrivateRoutes>
        <Dashboard/>
        </PrivateRoutes>
      }/>
      <Route path="*" element= {<Navigate to="/"/>}/>
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App;
