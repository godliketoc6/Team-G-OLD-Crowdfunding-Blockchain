import { useEffect, useState } from "react";
import NavBar from "../components/layout/NavBar";
import LoginNavBar from "../components/layout/LoginNavBar";
import Hero from "../components/Hero";
import Breadcrumbs from "../components/Breadcrumbs";
import DisplayCampaign from "../components/DisplayCampaign";
import NotLoggedInDisplayCampaign from "../components/NotLoggedInDisplayCampaign";
import Footer from "../components/layout/Footer";
import { useStateContext } from "../context";
import { User } from "../models/User";
import * as UserAPI from '../network/UserAPI';

const Homepage = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [campaigns, setCampaigns] = useState<any[]>([]);
    const { address, contract, getCampaigns } = useStateContext();
    const [loggedInUser, setLoggedInUser] = useState<User | null>(null);

    const fetchCampaigns = async () => {
        setIsLoading(true);
        const data = await getCampaigns();
        setCampaigns(data);
        setIsLoading(false);
    };

    useEffect(() => {
        if (contract) fetchCampaigns();
    }, [address, contract]);

    useEffect(() => {
        async function fetchLoggedInUser() {
            try {
                const user = await UserAPI.getLoggedInUser();
                setLoggedInUser(user);
            } catch (error) {
                // console.error(error);
            }
        }
        fetchLoggedInUser();
    }, []);

    return (
        <div className="min-h-screen flex flex-col">
            {loggedInUser ? <LoginNavBar user={loggedInUser} /> : <NavBar />}
            <div className="flex justify-center pt-4">
                <Hero />
            </div>
            <main className="flex flex-1 flex-col container mx-auto pt-4">
                <div className="py-2">
                    <Breadcrumbs />
                </div>
                <div>
                    {loggedInUser ? (
                        <DisplayCampaign isLoading={isLoading} campaigns={campaigns} />
                    ) : (
                        <NotLoggedInDisplayCampaign isLoading={isLoading} campaigns={campaigns} />
                    )}
                </div>
            </main>
            <div className="pt-6">
                <Footer />
            </div>
        </div>
    );
};

export default Homepage;