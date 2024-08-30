import React, { useEffect, useState } from "react";
import Breadcrumbs from "../components/Breadcrumbs";
import Footer from "../components/layout/Footer";
import LoginNavBar from "../components/layout/LoginNavBar";
import { useStateContext } from "../context";
import DisplayCampaign from "../components/DisplayCampaign";
import NavBar from "../components/layout/NavBar";
import { User } from "../models/User";
import * as UserAPI from "../network/UserAPI";
import { useNavigate } from "react-router-dom";

const ManageCampaign: React.FC = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [campaigns, setCampaigns] = useState<any[]>([]);
    const { address, contract, getUserCampaigns } = useStateContext();
    const [loggedInUser, setLoggedInUser] = useState<User | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (contract && address) {
            fetchCampaigns();
        }
    }, [address, contract]);

    const fetchCampaigns = async () => {
        if (contract && address) {
            setIsLoading(true);
            try {
                const data = await getUserCampaigns();
                setCampaigns(data);
            } catch (error) {
                console.error("Error fetching campaigns:", error);
            } finally {
                setIsLoading(false);
            }
        }
    };

    useEffect(() => {
        async function fetchLoggedInUser() {
            try {
                const user = await UserAPI.getLoggedInUser();
                if (!user) {
                    navigate("/"); // Redirect to homepage if not logged in
                } else {
                    setLoggedInUser(user);
                }
            } catch (error) {
                console.error(error);
                navigate("/"); // Redirect to homepage if there's an error fetching the user
            }
        }
        fetchLoggedInUser();
    }, [navigate]);

    return (
        <div className="min-h-screen flex flex-col">
            {loggedInUser ? <LoginNavBar user={loggedInUser} /> : <NavBar />}
            <main className="flex flex-1 flex-col container mx-auto pt-4">
                <div className="py-2">
                    <Breadcrumbs />
                </div>
                <div>
                    <DisplayCampaign
                        isLoading={isLoading}
                        campaigns={campaigns}
                    />
                </div>
            </main>
            <div className="pt-6">
                <Footer />
            </div>
        </div>
    );
};

export default ManageCampaign;
