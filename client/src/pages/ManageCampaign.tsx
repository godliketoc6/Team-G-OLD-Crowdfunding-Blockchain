import React, { useEffect, useState } from "react";
import Breadcrumbs from "../components/Breadcrumbs";
import Footer from "../components/layout/Footer";
import LoginNavBar from "../components/layout/LoginNavBar";
import { useStateContext } from "../context";
import DisplayCampaign from "../components/DisplayCampaign";
import NavBar from "../components/layout/NavBar";

const ManageCampaign: React.FC = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [campaigns, setCampaigns] = useState<any[]>([]);
    const { address, contract, getUserCampaigns, connect } = useStateContext();

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
                // console.log("Fetched campaigns:", data);
                setCampaigns(data);
            } catch (error) {
                console.error("Error fetching campaigns:", error);
            } finally {
                setIsLoading(false);
            }
        }
    };

    return (
        <div className="min-h-screen flex flex-col">
            <NavBar />
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