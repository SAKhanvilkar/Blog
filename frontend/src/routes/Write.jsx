import React, { useEffect, useState } from 'react';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import {IKContext,IKUpload} from "imagekitio-react"
import { useAuth, useUser } from '@clerk/clerk-react';
import { useMutation } from '@tanstack/react-query';
import api from './A-inst';
import { uploadAuth } from '../../../backend/controllers/post.controller';
import Upload from '../components/Upload';



export default function Write() {
  const { isLoaded, isSignedIn, user } = useUser();
  const [value, setValue] = useState('');
  const { getToken } = useAuth();
  const [cover, setCover] = useState("");
  const [img, setImg] = useState("");
  const [video, setVideo] = useState("");
  const [progress,setProgress] = useState(0);

  useEffect(()=>{
    img && setValue(prev=>prev+`<p><image src="${img.url}"/></p>`)
  },[img]);

  useEffect(()=>{
    video && setValue(prev=>prev+`<p>iframe class="ql-video" src="${img.url}"</p>`)
  },[video])
  const navigate = useNavigate();

  // Helper function to make the actual API request
  const makeApiRequest = async (newPost) => {
    try {
      // Always get a fresh token right before the request
      const token = await getToken({ template: "application/jwt", skipCache: true });
    
    console.log("Got fresh token, length:", token?.length);
      console.log("Authorization Header:", `Bearer ${token}`);
      const response = await api.post(`${import.meta.env.VITE_API_URL}/post`,JSON.stringify(newPost),{
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        // body:JSON.stringify(newPost)
      });
      return response.data;
    } catch (error) {
      // console.error("Error in mutationFn:", error);
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        console.error("Axios Error Data:", error.response?.data);
        console.error("Axios Error Status:", error.response?.status);
        console.error("Axios Error Headers:", error.response?.headers);
      }
      throw error;
    }
  };

  const mutation = useMutation({
    mutationFn: async (newPost) => {
      if (!isLoaded || !isSignedIn || !user) {
        throw new Error("User not loaded or signed in.");
      }
      return await makeApiRequest(newPost);
    },
    onSuccess: (res) => {
      toast.success("Post has been created");
      navigate(`/${res.slug}`);
    },
    onError: (error) => {
      // console.error("Mutation error:", error);
      toast.error(error?.response?.data?.message || error.message || "An error occurred");
    },
  });

  if (!isLoaded || !isSignedIn || !user) {
    return <div>Loading...</div>;
  }

  if (!isSignedIn) {
    return <div>You should login!</div>;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("handleSubmit called");
    const data = {
      img: cover.filePath || "",
      title: e.target.title.value,
      desc: e.target.desc.value,
      category: e.target.category.value,
      content: value,
    };

    try {
      console.log("About to call mutation.mutateAsync");
      await mutation.mutateAsync(data);
      console.log("mutation.mutateAsync completed");
    } catch (error) {
      // Error handling is already in the mutation's onError
    }
  };

  return (
    <div className='h-[calc(100vh-64px)] md:h-[calc(100vh-80px)] flex flex-col gap-6'>
      <h1>Create a New Post</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-6 flex-1 mb-6'>
        <Upload type="image" setProgress={setProgress} setData={setCover}>
          <button className='w-max p-2 rounded-xl bg-white text-gray-500 shadow-md text-sm'>Add a cover image</button>
        </Upload>
        <input type="text"
          placeholder='Write your title here!'
          className='bg-transparent text-4xl outline-none font-semibold'
          name="title" />
        <div className='flex items-center gap-4'>
          <label htmlFor="">Choose a category:</label>
          <select className='shadow-md rounded-xl outline-none p-2'
            name="category" id="">
            <option value="general">General</option>
            <option value="web-design">Web Design</option>
            <option value="development">Development</option>
            <option value="databases">Databases</option>
            <option value="seo">Search Engines</option>
            <option value="marketing">Marketing</option>
          </select>
        </div>
        <textarea className='rounded-xl p-2 shadow-md bg-white' name="desc" placeholder='A Short description'>
        </textarea>
        <div className='flex flex-1'>
          <div className='flex flex-col gap-2 mr-2'>
          <Upload type="image" setProgress={setProgress} setData={setImg}> 🌆
        </Upload>
        <Upload type="video" setProgress={setProgress} setData={setVideo}> ▶️
        </Upload>
        </div>
        <ReactQuill theme="snow"
          className='flex-1 rounded-xl p-2 shadow-md bg-white'
          value={value}
          onChange={setValue} 
          readOnl={0 < progress && progress < 100}/>
        </div>
        <button
          disabled={mutation.isPending || (0 < progress && progress < 100)}
          className='bg-blue-800 rounded-xl text-white font-medium mt-4 p-2 w-36 disabled:bg-blue-400 disabled:cursor-not-allowed'>
          {mutation.isPending ? "Loading..." : "Send"}
        </button>
        {"Progress:"+progress}
        {mutation.isError && <span>{mutation.error.message}</span>}
      </form>
    </div>
  );
}