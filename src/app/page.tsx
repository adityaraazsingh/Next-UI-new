"use client";

import { useEffect, useMemo } from "react";
import { useRouter } from "next/navigation"; 

import { Authenticated, Unauthenticated } from "convex/react";
import { AuthScreen } from "@/features/auth/components/auth-screen";
import { UserButton } from "@/features/auth/components/user-button";

import { useGetWorkspaces } from "@/features/workspaces/api/use-get-workspaces";

import { useCreateWorkspaceModal } from "@/features/workspaces/store/use-create-workspace-modal";
import '@xyflow/react/dist/style.css';


export default function Home() {

  const router = useRouter();
  
  const [open , setOpen] = useCreateWorkspaceModal();

  const {data, isLoading}=useGetWorkspaces();

  const workspaceId = useMemo(()=> data?.[0]?._id,[data]);

  useEffect(() => {
    if(isLoading) return ;

    if(workspaceId ){
      
      router.replace(`/workspaces/${workspaceId}`);

    }
    else if (!open){
      setOpen(true);
    }
  },[workspaceId,isLoading,open, setOpen , router]);

  return (
    <div>
      <Unauthenticated>
        <AuthScreen/>
      </Unauthenticated>
      <Authenticated>
        <UserButton />
        <h1>Welcome !</h1>
      </Authenticated>
    </div>
  );
}
