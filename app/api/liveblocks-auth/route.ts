import { Liveblocks } from "@liveblocks/node";
import { ConvexHttpClient } from "convex/browser";
import { api } from "@/convex/_generated/api";
import { auth,currentUser } from "@clerk/nextjs/server";

const convex=new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);
const liveblocks = new Liveblocks({
  secret: "sk_dev_WTdw8BGmNRURfgAIKGER4vNwt7DbhSlj8xyN1Yb5q7vVzZllNxkHDwotSk-7wXbV",
});

export async function POST(request: Request) {
    // Get the current user from your database
    const authorization=await auth();
    const user = await currentUser();

    
    if(!authorization || !user){
        return new Response("Unauthorized",{status:403})
    }
    // Start an auth session inside your endpoint
    const {room}=await request.json();
    const board=await convex.query(api.board.get,{id:room});
    

    if(board?.orgId!==authorization.orgId){
        return new Response("Unauthorized",{status:403});
    }
    const userInfo={
        name:user.firstName || "Anonymous",
        picture:user.imageUrl,

    }
    
    const session = liveblocks.prepareSession(
      user.id,
      { userInfo} // Optional
    );
    if(room){
        session.allow(room,session.FULL_ACCESS);
    }
   
  
    // Authorize the user and return the result
    const { status, body } = await session.authorize();
   
    return new Response(body, { status });
  }