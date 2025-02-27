import React from 'react'
import Images from './Images'
import { useAuth, useUser } from '@clerk/clerk-react'
import axios from 'axios'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

export default function PostMenuAction({post}) {
  const {user} = useUser()
  const {getToken} = useAuth()
  const navigate = useNavigate()

  const {isPending,error,data:savedpost} = useQuery({
    queryKey:["savedpost"],
    queryFn:()=> async ()=>{
      const token = await getToken();
      return axios.get(`${import.meta.env.VITE_API_URL}/users/saved`,{
        headers:{
          Authorization:`Bearer ${token}`,
        },
      });
    }
  });

  const isAdmin = user?.publicMetadata?.role  === "admin" || false;
  const isSaved = savedpost?.data?.some(p=>p===post._id) || false;

  const deleteMutation = useMutation({
    mutationFn: async ()=>{
      const token = await getToken();
      return axios.delete(`${import.meta.env.VITE_API_URL}/post/${post._id}`,{
        headers:{
          Authorization:`Bearer ${token}`,
        }
      })
    },
    onSuccess:()=>{
      toast.success("post deleted successfully");
      navigate('/')
    },
    onError:(error)=>{
      toast.error(error.response.data);
    }
  })


  const queryClient = useQueryClient()

  const saveMutation = useMutation({
    mutationFn: async ()=>{
      const token = await getToken();
      return axios.patch(`${import.meta.env.VITE_API_URL}/users/save`,{
        postId:post._id,
      },{
        headers:{
          Authorization:`Bearer ${token}`,
        }
      })
    },
    onSuccess:()=>{
      queryClient.invalidateQueries({queryKey: ["savedpost"]})
      navigate('/')
    },
    onError:(error)=>{
      toast.error(error.response.data);
    }
  })


  const featureMutation = useMutation({
    mutationFn: async ()=>{
      const token = await getToken();
      return axios.patch(`${import.meta.env.VITE_API_URL}/post/feature`,{
        postId:post._id,
      },{
        headers:{
          Authorization:`Bearer ${token}`,
        }
      })
    },
    onSuccess:()=>{
      queryClient.invalidateQueries({queryKey: ["post",post.slug]})
      navigate('/')
    },
    onError:(error)=>{
      toast.error(error.response.data);
    }
  })


  const handleDelete = ()=>{
    deleteMutation.mutate();
  }

  const handleFeature = ()=>{
    featureMutation.mutate();
  }

  const handleSave = ()=>{
    if(!user){
      navigate("/login");
    }
    saveMutation.mutate();
  }
  return (
    <div className=''>
      <h1 className='mt-8 mb-4 text-sm font-medium'>Actions</h1>
     
      {isPending ? "Loading..." : error ? "saved post fetching failed" :
      <div className='flex items-center gap-2 py-2 text-sm cursor-pointer' onClick={handleSave}>
        <Images path='bookmark.png' fill={saveMutation.isPending 
          ? isSaved 
          ? isSaved 
          ? "none" : "black" :"black":"none" } className='w-4 h-4'/>
        <span>Save this post</span>
        {saveMutation.isPending && <span className='text-xs'>(in progress)</span>}
      </div>}{

        isAdmin && (
          <div className="flex items-center gap-2 py-2 text-sm cursor-pointer" onClick={handleFeature}>
            <Images path='bin.png' className='w-4 h-4' fill={featureMutation.isPending 
            ? post.isFeatured 
            ? "none":"black" 
            :post.isFeatured ? 
            "black":"none"}/>
            <span>Feature</span>
            {featureMutation.isPending && <span className='text-xs'>(in progress)</span>}
          </div>
        )
      }

    { user && (post.user.username === user.username || isAdmin) && 
    <div className='flex items-center gap-2 py-2 text-sm cursor-pointer'onClick={handleDelete}>
        <Images path='bin.png' className='w-4 h-4'/>
        <span>Delete this post</span>
        {deleteMutation.isPending &&  <span className='text-xs'> (in progress ) </span> }
      </div>}
    </div>
  )
}
