"use client"
import { X } from "lucide-react"
import React from 'react'
import Logo from "./Logo";
import Link from "next/link"
import { headerData } from "@/Constant/data";
import { usePathname } from "next/navigation";
import { useOutSideClick } from "@/Hook";
import SocialMedia from "./SocialMedia";





interface SidebarProps {
    isOpen: boolean; 
    onClose: () => void;
    
}  

const SideMenu: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const pathname = usePathname(); 
  const sidebarRef =useOutSideClick<HTMLDivElement>(onClose)
  return (
    <div className={`fixed inset-y-0 h-screen left-0 z-50 w-full
         bg-black/50 shadow-xl ${isOpen ? "translate-x-0" : "-translate-x-full"} hoverEffect`}>
  <div 
  ref={sidebarRef}
  className='min-w-72 max-w-96 bg-black text-white/80 h-screen p-10 border-r border-r-shop-green-500 flex flex-col gap-6'>
    <div className="flex items-center justify-between gap x">
         <Logo className="text-white" spanDesign="group-hover:text-white"/>
         <button onClick={onClose}
         className="hover:text-shop-green-500 hoverEffect"> <X /> </button>
    </div>
    <div className="flex flex-col space-y-3.5 font-semibold tracking-wide">
      {headerData?.map((item)=>(
      <Link href={item?.href} key={item?.title} className={`hover:text-shop-emerald-500 hoverEffect ${pathname === item?.href && "text-white"}`}>
        {item?.title}
        </Link>
      ))}
      
    </div>
    <SocialMedia />
  </div>
    </div>
  )
}

export default SideMenu
