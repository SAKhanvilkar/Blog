import React from 'react'
import { Link } from 'react-router-dom'
import MainCategories from '../components/MainCategories'
import FeaturedPost from '../components/FeaturedPost'
import PostList from '../components/PostList'

export default function Home() {
  return (
    <div className='mt-4 flex flex-col gap-4'>
     {/* breadcrumb */}
     <div className='flex gap-4'>
      <Link to="/">Home</Link>
     <span>•</span>
      <span className='text-blue-800'>Blogs and Articles</span>
     </div>
     {/*introduction */}
     <div className='flex items-center justify-content'>
      <div>
        <h1 className='text-grey-800 text-2xl md:text-5xl lg:text-6xl font-bold'>Start Your Blogging Journey with Bloggerly!</h1>
        <p className='mt-8 text-grey-800 text-md md:text-xl'>The easiest way to create, share, and grow your blog.</p>
      </div>
      {/* animated button */}
      <Link to="write" className="relative hidden md:block">
      <svg
      viewBox='0 0 200 200'
      width='200'
      height='200'
      className='text-lg tracking-widest animate-spin animated-button'
      >
        <path id='circlPath'
        fill='none'
        d='M 100, 100 m -75, 0 a 75,75 0 1,1 150,0 a 75,75 0 1,1 -150,0'
        />
        <text>
          <textPath href='#circlPath' startOffset='0%' fill="black" font-size="14">Write your story</textPath>
          <textPath href='#circlPath' startOffset='50%' fill="black" font-size="14">Share your idea</textPath>
        </text>
      </svg>
      <button className='absolute top-0 bottom-0 left-0 right-0 m-auto h-20 w-20 bg-blue-800 rounded-full flex items-center justify-center'>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
         width="50"
        height="50"
        fill="none"
        stroke="white"
        strokeWidth="2"
        >
          <line x1="6" y1="18" x2="18" y2="6" />
          <polyline points="9 6 18 6 18 15" />
        </svg>

      </button>
      </Link>
     </div>
     {/* MainCategories */}
     <MainCategories/>
     {/* FeaturedPost */}
     <FeaturedPost/>
     {/* post-list */}
     <div className=''>
      <h2 className='my-8 text-2xl text-grey-600'>Recent Posts</h2>
      <PostList/>
     </div>
    </div>
  )
}
