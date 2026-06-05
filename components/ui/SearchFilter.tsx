"use client"
import React from 'react'
import { Input } from './input'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./Select"
import { useQueryState } from 'nuqs';

export default function SearchFilter() {
      const [search, setSearch] = useQueryState("search", { defaultValue: "" });
      const [perPage, setPerPage] = useQueryState(
        "perPage", { defaultValue: "10" }); 
  return (
    <div className="flex justify-between">
   <div className="mb-8">
      <Input 
       placeholder="Search products..."
       className="w-full"
       value={search}
       onChange={(e) => setSearch(e.target.value)}
     />
   </div>
    <div>
        <Select value={perPage} onValueChange={(value) => setPerPage(value)}>
          <SelectTrigger className="w-45">
            <SelectValue placeholder="Per Page" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="20">20</SelectItem>
              <SelectItem value="30">30</SelectItem>
              <SelectItem value="40">40</SelectItem>
              <SelectItem value="50">50</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}
 