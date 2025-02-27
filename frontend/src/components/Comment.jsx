import React from 'react'
import Images from './Images'
import { format } from 'timeago.js'
import { useAuth, useUser } from '@clerk/clerk-react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import axios from 'axios';


export default function Comment({comment,postId}) {
  const {user} = useUser();
  const {getToken} = useAuth();
  const role = user?.publicMetadata?.role;

  const queryClient = useQueryClient()

    const mutation = useMutation({
      mutationFn: async () => {
        const token = await getToken();
        return axios.delete(
          `${import.meta.env.VITE_API_URL}/comment/${comment._id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["comments", postId] });
        toast.success("comments deleted successfully")
      },
      onError: (error) => {
        toast.error(error.response.data);
      },
    });
  
  return (
    <div className='p-4 bg-slate-50 rounded-xl mb-8'>
      <div className='flex items-center gap-4'>
        {comment.user.img && <Images path='comment.user.img' className='w-10 h-10 rounded-full object-cover' width='40'/>}
        <span className='font-mediun'>{comment.user.username}</span>
        <span className='text-sm text-gray-500'>{format(comment.createdAt)}</span>
        {user && (comment.user.username === user.username || role === "admin") &&
         <span className='text-xs text-red-300 hover:text-red-500 cursor-pointer' onClick={()=>mutation.mutate()}>Delete</span>}
         {mutation.isPending && <span>("in progress")</span>}
      </div>
      <div className='mt-8'>
        <p>
       {comment.desc}
        </p>
      </div>
    </div>
  )
}
