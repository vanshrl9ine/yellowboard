"use client";

interface BoardListProps{
    orgId:string,
    query:{
        search?:string,
        favorites?:string,
    }
}
import React from 'react'
import EmptyBoards from './empty-boards';
import EmptyQuery from './empty-query';
import EmptyFavorites from './empty-favorites.tsx';

const BoardList = ({orgId,query}:BoardListProps) => {

  const data=[];
  //TODO:Get data from api call
  if(!data?.length && query.search){
    return(
        <div className='h-full flex flex-col items-center justify-center'>
           <EmptyQuery/>
        </div>
    )
  }
  if(!data?.length && query.favorites){
    return(
        <div className='h-full flex flex-col items-center justify-center'>
        <EmptyFavorites/>
     </div>
    )
  }
  if(!data?.length){
    return(
        <div className='h-full flex flex-col items-center justify-center'>
           <EmptyBoards/>
        </div>
    )
  }
  
  
  
  return (
    <div>{JSON.stringify(query)}</div>
  )
}

export default BoardList