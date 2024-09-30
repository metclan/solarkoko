"use client"; 
import { Search } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useRouter } from "next/navigation";
import { useState } from "react";
export function NavSearchInput () {
  const [search, setSearch] = useState<string>('')
    const { push } = useRouter()
    function handleSubmit () {
      push(`/products?q=${new URLSearchParams(search.trim())}`)
    }
    return (
        <div className="flex-1 hidden lg:flex items-center justify-center px-2 ml-6">
        <div className="max-w-2xl w-full flex items-ceter gap-2">
          <div className="relative flex-grow ">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <Input
              id="search"
              name="search"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-l-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
              placeholder="Search for solar panels, inverters, batteries..."
              onChange={(e) => {setSearch(e.target.value)}}
              type="search"
              value={search}
            />
          </div>
          <Button type="submit" className="bg-orange-500 hover:bg-orange-600 text-white rounded-r-md"
            onClick={handleSubmit}>
            Search
          </Button>
        </div>
      </div>
    )
}