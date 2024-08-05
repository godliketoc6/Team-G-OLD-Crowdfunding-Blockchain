import NavBar from "../components/layout/NavBar";
import Hero from "../components/Hero";
import Campaign from "../components/Campaign";
import Breadcrumbs from "../components/Breadcrumbs";
import Footer from "../components/layout/Footer";
import LoginNavBar from "../components/layout/LoginNavBar";
import { useStateContext } from "../context";
import { useEffect, useState } from "react";
import DisplayCampaign from "../components/DisplayCampaign";

const Homepage = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [campaigns, setCampaigns] = useState<any>([]);
    const { address, contract, getCampaigns } = useStateContext();

    const fetchCampaigns = async () => {
        setIsLoading(true);
        const data = await getCampaigns();
        setCampaigns(data);
        setIsLoading(false);
    }

    useEffect(() => {
        if(contract) fetchCampaigns();
    }, [address, contract]);

    return (
        <div className="min-h-screen flex flex-col">
            <NavBar />
            {/* <LoginNavBar /> */}
            <div className="flex justify-center pt-4">
                <Hero />
            </div>
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
    )
}

export default Homepage