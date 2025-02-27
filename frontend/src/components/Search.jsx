import React from 'react'
import Images from './Images'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'

export default function Search() {
  const location = useLocation()
  const navigate = useNavigate()
  const [searchParams,setSearchParams] = useSearchParams()

  const handleKeyPress = (e)=>{
    if(e.key === "Enter"){
      const query = e.target.value;
      if(location.pathname === "/post"){
        setSearchParams({...Object.fromEntries(searchParams),search:query})
      }else{
        navigate(`/post?search=${query}`);
      }
    }
  }
  return (
    <div className='bg-gray-100 p-2 rounded-full flex items-center gap-2'>
      <Images path='search-interface-symbol.png' className='w-4 h-4'/>
      <input type="text" placeholder='search a post' className='bg-transparent' onKeyDown={handleKeyPress}/>
    </div>
  )
}
