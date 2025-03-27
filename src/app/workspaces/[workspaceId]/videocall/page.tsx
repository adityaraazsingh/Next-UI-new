import { SidebarTrigger } from "@/components/ui/sidebar";
import React from "react";

const Page: React.FC = () => {
  return (
    <div className="h-screen flex flex-col">
      <header className="h-12 bg-gray-100 text-center flex justify-center shadow-md">
        <SidebarTrigger />
        <h1 className="text-lg font-semibold">Video Calling</h1>
      </header>
      <iframe
        src="https://7700585dca04aff5d1ed.vercel.app/"
        className="flex-grow w-full border-none"
        title="Video Calling"
        allow="camera; microphone; display-capture"
      />
    </div>
  );
};

export default Page;
