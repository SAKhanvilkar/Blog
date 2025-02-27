import React from 'react'
import Images from './Images'
import {format} from 'timeago.js'
import { Link, } from 'react-router-dom'



export default function PostListItem({post}) {

  return (
    <div className='flex flex-col xl:flex-row gap-8 mb-8'>
      
      {/* Images */}
     {post.img && <div className='md:hidden xl:block xl:w-1/3'>
      <Images path={post.img} className="rounded-2xl object-cover" width="735" />
      </div>}

      {/* details */}
      <div className='flex flex-col gap-4 xl:w-2/3'>
        <Link to={`/${post.slug}`} className='text-4xl font-semibold'>{post.title} </Link>
        <div className='flex items-center gap-2 text-gray-400 text-sm'>
            <span>Written by</span>
            <Link className='text-blue-800' to={`/posts?author=/${post.user.username}`}>{post.user.username}</Link>
            <span>on</span>
            <Link className='text-blue-800'>{post.category}</Link>
            <span>{format(post.createdAt)}</span>
        </div>
        <p>
        {post.desc}
        </p>
        <Link className='underline text-blue-800 text-sm' to={`/${post.slug}`}>Read More</Link>
      </div>
    </div>
  )
}
