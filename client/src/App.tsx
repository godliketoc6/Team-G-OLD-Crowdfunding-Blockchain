import { ConnectButton } from "thirdweb/react";
import { client } from "./client";
import { Signup } from "./pages/Signup";
import { Signin } from "./pages/Signin";
import { Toaster } from 'react-hot-toast';
import { Routes } from "react-router-dom";
import NavBar from "./components/layout/NavBar";
import Hero from "./components/Hero";
import Campaign from "./components/Campaign";
import Breadcrumbs from "./components/Breadcrumbs";
import Footer from "./components/layout/Footer";
import LoginNavBar from "./components/layout/LoginNavBar";


export function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Toaster />
      {/* <NavBar /> */}
      <LoginNavBar />
      <div className="flex justify-center pt-4">
        <Hero />
      </div>  
      <main className="flex flex-1 flex-col container mx-auto pt-4">
        <div className="py-2">
          <Breadcrumbs />
        </div>
        <div className="flex flex-1 flex-wrap gap-4 justify-center">
          {Array(8).fill(<Campaign />)}
        </div>
      </main>
      <div className="pt-6">
        <Footer />
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

{/* <div className="flex-1 mx-auto max-sm:w-full max-w-[1280px] sm:pr-5">

          <Routes>
          </Routes>

      </div> */}