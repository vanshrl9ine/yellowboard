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
import { useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import BoardCard from './board-card';
const BoardList = ({orgId,query}:BoardListProps) => {

  const data=useQuery(api.boards.get,{orgId})
  if(data===undefined){
    <div>
      Loading
    </div>
  }
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
    <div>
      <h2 className='text-3xl'>
        {query.favorites?"Favourite Boards":"Team Boards"}
       
        </h2>
        <div className='grid  grid-cols-1 sm:grid-cols-2 md:grid-cols-4  lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-5 mt-8 pb-10'>
           {
            data?.map((board)=>(
              <BoardCard key={board._id} id={board._id} title={board.title} imageUrl={board.imageUrl} authorId={board.authorId} authorName={board.authorName} createdAt={board._creationTime} orgId={board.orgId} isFavorite={false}/>
            ))

           }
        </div>
    </div>
  )
}

export default BoardList