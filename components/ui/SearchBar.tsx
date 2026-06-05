
import React from 'react'
import { Search } from 'lucide-react'
import Link from "next/link"

export default function SearchBar() {
  return (

    <Link href="/Shop">
     <Search className="w-5 h-5 hover:text-shop-green-500 hoverEffect" />
    </Link>
  )
}


