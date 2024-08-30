import { Toaster } from 'react-hot-toast';
import { Route, Routes } from 'react-router-dom';
import Homepage from "./pages/Homepage";
import ManageCampaign from "./pages/ManageCampaign";
import CampaignDetails from "./components/CampaignDetails";
import NotFound from "./pages/NotFound";
import { Signup } from "./pages/Signup";
import { Signin } from "./pages/Signin";
import { useState, useEffect } from 'react';
import * as UserAPI from './network/UserAPI';
import { User } from './models/User';

export function App() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    async function fetchLoggedInUser() {
      try {
        const loggedInUser = await UserAPI.getLoggedInUser();
        setUser(loggedInUser);
      } catch (error) {
        // console.error("Failed to fetch logged-in user", error);
      }
    }
    fetchLoggedInUser();
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Toaster />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Signin />} />

        <Route path="/manage" element={<ManageCampaign />} />
        <Route path="/campaign-details/:id" element={<CampaignDetails />} />

        {/* Fallback for unknown routes */}
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </div>
  );
}
