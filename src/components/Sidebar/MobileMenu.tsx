"use client"
import { AlignLeft } from 'lucide-react' 
import React, { useState } from 'react'
import SideMenu from '@/src/components/Sidebar/SideMenu'

const MobileMenu = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  return (
    <>
    <button onClick={() => setIsSidebarOpen(!isSidebarOpen)}></button>
     <button><AlignLeft className='hover:text-green-500 hoverEffect md:hidden hover:cursor-pointer md:gap-0'/></button>

     <div className='md:hidden'></div>
     <SideMenu isOpen={isSidebarOpen}
     onClose={() => setIsSidebarOpen(false)}/>
    </>
  )
}

export default MobileMenu
