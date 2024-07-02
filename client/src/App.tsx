import { ConnectButton } from "thirdweb/react";
import { client } from "./client";
import { Signup } from "./pages/Signup";
import { Signin } from "./pages/Signin";
import { Toaster } from 'react-hot-toast';
import { Routes } from "react-router-dom";


export function App() {
  return (
    <div  className="flex flex-row relative sm:-8 p-4 min-h-screen bg-[#13131a]">
      <Toaster />
      <div className="relative mr-10 sm:flex hidden">
        {/* <Sidebar /> */}
      </div>

      <div className="flex-1 mx-auto max-sm:w-full max-w-[1280px] sm:pr-5">

          <Routes>
          </Routes>

      </div>
    </div>

  );
}

{/* <ConnectButton
            client={client}
            appMetadata={{
              name: "Example app",
              url: "https://example.com",
            }}
          /> */}