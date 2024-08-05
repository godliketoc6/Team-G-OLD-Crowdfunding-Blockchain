import { client } from "./client";
import { Signup } from "./pages/Signup";
import { Signin } from "./pages/Signin";
import { Toaster } from 'react-hot-toast';
import { Route, Routes } from 'react-router-dom'
import Homepage from "./pages/Homepage";
import ManageCampaign from "./pages/ManageCampaign";
import CampaignDetails from "./components/CampaignDetails";

export function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Toaster />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Signin />} />
        <Route path="/manage" element={<ManageCampaign />} />
        <Route path="/campaign-details/:id" element={<CampaignDetails />} />
      </Routes>
    </div>

  );
}
