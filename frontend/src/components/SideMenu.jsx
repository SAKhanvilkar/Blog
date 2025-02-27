import React from 'react'
import Search from "./Search"
import { Link, useSearchParams } from 'react-router-dom'

export default function SideMenu() {
  const [searchParams,setSearchParams] = useSearchParams()

 const handleFilterChange = (e)=>{
  
  if(searchParams.get("sort") !== e.target.value){
    setSearchParams({
      ...Object.fromEntries(searchParams.entries()),
      sort:e.target.value
    })
  }
 }

 const handleCategoryChange = (category)=>{
  
  if(searchParams.get("cat") !== category){
    setSearchParams({
      ...Object.fromEntries(searchParams.entries()),
      cat:category,
    })
  }
 }
  return (
    <div className="px-4 h-max sticky top-8"> 
      <h1 className='mb-4 text-sm font-medium'>SideMenu</h1>
      <Search/>
        <h1 className='mt-8 mb-4 text-sm font-medium'>Filters</h1>
        <label htmlFor="" className='flex items-center gap-2 cursor-pointer'>
                <input 
                  type='radio'
                  onChange={handleFilterChange}
                  name='sort'
                  value='newest'
                  className='appearance-none bg-white w-4 h-4 border-[1.5px] border-blue-800 checked:bg-blue-800 cursor-pointer rounded-sm'
                 />
                 Newest
            </label>
            <label htmlFor="" className='flex items-center gap-2 cursor-pointer'>
                <input 
                  type='radio'
                 onChange={handleFilterChange} 
                 name='sort'
                  value='popular'
                  className='appearance-none bg-white w-4 h-4 border-[1.5px] border-blue-800 checked:bg-blue-800 cursor-pointer rounded-sm'
                 />
                 Most Popular
            </label>
            <label htmlFor="" className='flex items-center gap-2 cursor-pointer'>
                <input 
                  type='radio'
                  onChange={handleFilterChange}
                  name='sort'
                  value='trending'
                  className='appearance-none bg-white w-4 h-4 border-[1.5px] border-blue-800 checked:bg-blue-800 cursor-pointer rounded-sm'
                 />
                 Trending
            </label>
            <label htmlFor="" className='flex items-center gap-2 cursor-pointer'>
                <input 
                  type='radio'
                  onChange={handleFilterChange}
                  name='sort'
                  value='oldest'
                  className='appearance-none bg-white w-4 h-4 border-[1.5px] border-blue-800 checked:bg-blue-800 cursor-pointer rounded-sm'
                 />
                 Oldest
            </label>
        <h1 className='mt-8 mb-4 text-sm font-medium'>Categories</h1>
        <div className='flex flex-col gap-2 text-sm'>
        </div>
        <div className='flex flex-col gap-2 text-sm'>
            <span onClick={()=>handleCategoryChange("general")}  className='underline cursor-pointer'>All</span>
            <span onClick={()=>handleCategoryChange("web-design")}  className='underline cursor-pointer'>Web Design</span>
            <span onClick={()=>handleCategoryChange("Artificial Intelligence")}  className='underline cursor-pointer'>Artificial Intelligence</span>
            <span onClick={()=>handleCategoryChange("database")}  className='underline cursor-pointer'>Database</span>
            <span onClick={()=>handleCategoryChange("Machine-Learning")}  className='underline cursor-pointer'>Machine Learning</span>
            <span onClick={()=>handleCategoryChange("Cloud-Computing")}  className='underline cursor-pointer'>Cloud Computing</span>
        </div>
      
    </div>
  )
}
