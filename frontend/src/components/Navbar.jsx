import React, { useEffect, useState } from 'react'
import Images from './Images'
import { Link } from 'react-router-dom'
import { SignedIn, SignedOut, useAuth, UserButton } from "@clerk/clerk-react"

export default function Navbar() {
    const [open, setOpen] = useState(false);

    return (
        <div className='w-full h-16 md:h-20 flex items-center justify-between'>
            {/* logo */}
            <Link to='/' className='flex items-center gap-4 text-2xl font-bold'>
                <Images path="logo.png" width={32} height={32}/>
                <span>Bloggerly</span>
            </Link>

            {/* small menu */}
            <div className='md:hidden'>
                <div className='cursor-pointer text-2xl' onClick={() => setOpen((prev) => !prev)}>
                    {open ? 
                        <img className='w-8 h-8' src='close.png' alt="Close menu"/> : 
                        <img className='w-8 h-8' src='more.png' alt="Open menu"/>
                    }
                </div>
                {/* hidden list */}
                <div className={`w-full h-screen flex flex-col items-center justify-center gap-8 font-medium absolute top-16 transition-all duration-300 ease-in-out
                    ${open ? "-right-0" : "-right-[100%]"}`}>
                    <Link to="/">Home</Link>
                    <Link to="/post?sort=trending">Trending</Link>
                    <Link to="/post?sort=popular">Most Popular</Link>
                    <Link to="">About</Link>

                    {/* Wrap login button with SignedOut */}
                    <SignedOut>
                        <Link to="/login">
                            <button className='py-2 px-4 rounded-3xl bg-blue-800 text-white'>Login</button>
                        </Link>
                    </SignedOut>
                </div>
            </div>

            {/* large menu */}
            <div className='hidden md:flex items-center gap-8 xl:gap-12 font-medium'>
            <Link to="/">Home</Link>
            <Link to="/posts?sort=trending">Trending</Link>
            <Link to="/post?sort=popular">Most Popular</Link>
            <Link to="/">About</Link>

                {/* Wrap login button with SignedOut */}
                <SignedOut>
                    <Link to="/login">
                        <button className='py-2 px-4 rounded-3xl bg-blue-800 text-white'>Login</button>
                    </Link>
                </SignedOut>

                {/* Render UserButton if signed in */}
                <SignedIn>
                    <UserButton />
                </SignedIn>
            </div>
        </div>
    )
}
