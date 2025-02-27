import Navbar from "./components/Navbar"
import { Routes, Route } from 'react-router-dom'
import axios from 'axios';
axios.defaults.withCredentials = true;
const App = () => {
  
  return (
   
    <div className='w-screen px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64'>
      {/* Navbar */}
      <Navbar/>
      
      {/* Breadcrumb */}
      {/* Introduction*/}
      {/* Featured Post */}
      {/* Post List */}
    </div>
    
  )
}

export default App 
