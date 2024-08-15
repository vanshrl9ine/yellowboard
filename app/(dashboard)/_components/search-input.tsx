'use client';
import React from 'react'
import qs, { Stringifiable } from 'query-string';
import { Search } from 'lucide-react';
import {useDebounceValue} from 'usehooks-ts';
import { useRouter } from 'next/navigation';
import { ChangeEvent,useEffect,useState } from 'react';
import { Input } from '@/components/ui/input';
const SearchInput = () => {

  const router=useRouter();
  const [debouncedValue, setValue] = useDebounceValue("", 10)
  const handleChange=(e:ChangeEvent<HTMLInputElement>)=>{
    setValue(e.target.value);
  };
  useEffect(()=>{
    const url=qs.stringifyUrl({
      url:"/",
      query:{
        search:debouncedValue,
      },
    },{skipEmptyString:true,skipNull:true}
  );
  router.push(url);
  },[debouncedValue,router])
  return (
   <div className='w-full relative'>
    <Search className='absolute top-1/2 left-3 transform -translate-y-1/2 text-muted-foreground h-4 w-4'/>
    <Input className='w-full max-w-[560px] pl-9 ' placeholder='Search Boards' onChange={handleChange} value={debouncedValue}/>

   </div>
  )
}

export default SearchInput