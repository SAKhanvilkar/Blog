import React from 'react'
import { Link } from 'react-router-dom'
import Search from './Search'

export default function MainCategories() {
  return (
    <div className='hidden md:flex bg-white rounded-3xl xl:rounded-full p-4 shadow-lg items-center justify-center gap-8'>
        {/* links */}
        <div className='flex-1 flex items-center justify-between flex-wrap'>
            <Link to="/posts" className="bg-blue-800 text-white rounded-full px-4 py-2"
            >All Posts</Link>

            <Link to="/post?cat=web-design" className="hover:bg-blue-50  rounded-full px-4 py-2"
            > Web Design</Link>

            <Link to="/post?cat=Artificial Intelligence" className="hover:bg-blue-50  rounded-full px-4 py-2"
            >Artificial Intelligence</Link>

            <Link to="/post?cat=database" className="hover:bg-blue-50  rounded-full px-4 py-2"
            >Database</Link>

            <Link to="/post?cat=Machine Learning" className="hover:bg-blue-50  rounded-full px-4 py-2"
            >Machine Learning</Link>

            <Link to="/post?cat=Cloud Computing" className="hover:bg-blue-50  rounded-full px-4 py-2"
            >Cloud Computing</Link>
        </div>
        <span className='text-xl font-medium'>|</span>
        {/* search */}
        <Search/>
    </div>
  )
}
