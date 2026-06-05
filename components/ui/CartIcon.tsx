import React from 'react'
import Link from "next/link"
import {ShoppingBag} from "lucide-react"

 
 const CartIcon = () => {
   return (
     <Link href={"/cart"} className="group relative">
        <ShoppingBag className="w-5 h-5 hover:text-shop-green-500 hover:effect"/>
        <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-green-500 
        text-white text-xs flex items-center justify-center">0</span>
     </Link>
   )
 }
 
 export default CartIcon
    