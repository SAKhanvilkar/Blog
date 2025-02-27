import React from 'react'
import Images from '../components/Images'
import { Link, useParams } from 'react-router-dom'
import PostMenuAction from '../components/PostMenuAction'
import Search from '../components/Search'
import Comments from '../components/Comments'
import axios from 'axios'
import { useQuery } from '@tanstack/react-query'
import { format } from 'timeago.js'

const fetchPost = async(slug)=>{
  const res = await axios.get(`${import.meta.env.VITE_API_URL}/post/${slug}`);
  return res.data
  }

export default function SinglePost() {
    const {slug} = useParams();
  
    const {isPending,error,data} = useQuery({
      queryKey:["post",slug],
      queryFn:()=>fetchPost(slug),
    });
  
    if(isPending) return "loading";
    if(error) return "Something went wrong!" + error.message;
    if(!data) return "Post not found";
    
  return (
    <div className='flex flex-col gap-8'>
      {/* details */}
      <div className='flex gap-8'>
        <div className='lg:w-3/5 flex flex-col gap-8'>
        <h1 className='text-xl md:text-3xl lg:text-4xl 2xl:text-5xl font-semibold'>The Future of Artificial Intelligence: How Machine Learning is 
          {data.title}</h1>

        <div className='flex items-center gap-2 text-gray-400 text-sm'>
        <span>Written by</span>
        <Link className='text-blue-800'>{data.user.username}</Link>
        <span>on</span>
        <Link className='text-blue-800'>{data.category}</Link>
        <span>{format(data.createdAt)}</span>
        </div>
        <p className='text-gray-500 font-medium'>
      {data.desc} 
        </p>
        </div>
        { data.img && <div className='hidden lg:block w-2/5'>
          <Images path="data.img" className='rounded-2xl' width='600'/>
        </div>}
      </div>
      {/* content */}
      <div className='flex flex-col md:flex-row gap-12'>
        {/* text */}
        <div className='lg:text-lg flex flex-col gap-6 text-justify'>
          <p>
          In the finance industry, AI and machine learning are revolutionizing everything from fraud
           detection to algorithmic trading. AI algorithms can analyze vast amounts of transaction data in
            real time, identifying potentially fraudulent activity with greater speed and accuracy than human analysts 
            ever could. In investment, machine learning models are used to predict market trends and assist in making
           high-frequency trades that capitalize on fleeting opportunities—changes that can make or break portfolios 
           in an increasingly volatile market. Furthermore, AI chatbots and virtual assistants are improving
            customer service experiences, offering personalized financial advice, and helping consumers manage their 
            investments with ease.
          </p>
          <p>
          The retail industry is another major beneficiary of AI and machine learning. E-commerce platforms, 
          for instance, leverage these technologies to enhance customer personalization, tailoring product 
          recommendations based on previous purchases, browsing history, and other data. Additionally,
           brick-and-mortar stores use AI-powered inventory management systems to ensure that products are 
           always in stock, reducing waste and improving the supply chain. In the realm of marketing, AI is
            being used to analyze customer behavior, predict trends, and optimize advertising strategies in
             real time, driving higher conversion rates.
          </p>
          <p>
       
          </p>
        </div>
        {/* menu */}
        <div className='px-4 h-max sticky top-8'>
          <h1 className='mb-4 text-sm font-medium'>Author</h1>
          <div className='flex flex-col gap-4'>
          <div className='flex items-center gap-8'>
          {data.user.img && <Images path='data.user.img' className='w-12 h-12 rounded-full object-cover'
            width='48'height='48'/>}
             <Link className='text-blue-800'>{data.user.username}</Link>
             </div>
             <p className='tect-sm text-gray-500'>Tech enthusiast exploring AI, machine learning, and digital innovation.</p>
             <div className='flex items-center gap-2'>
              <Link><Images path='facebook.svg'/></Link>
              <Link><Images path='instagram.svg'/></Link>
             </div>
            </div>
          
          {/* actions */}
          <PostMenuAction post={data}/>
          <h1 className='mt-8 mb-4 text-sm font-medium'>Categories</h1>
          <div className='flex flex-col gap-2 text-sm'>
          <Link to='/' className='underline'>All</Link>
          <Link to='/' className='underline'>Web Design</Link>
          <Link to='/' className='underline'>Artificial Intelligence</Link>
          <Link to='/' className='underline'>Database</Link>
          <Link to='/' className='underline'>Machine Learning</Link>
          <Link to='/' className='underline'>Cloud Computing</Link>
          </div>
          <h1 className='mt-8 mb-4 text-sm font-medium'>Search</h1>
          <Search/>
        </div>
      </div>
      <Comments postId={data._id}/>
    </div>
  )
}
