import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ethers } from "ethers";
import { useStateContext } from "../context";
import { calculateBarPercentage, daysLeft } from "../utils";
import { convertEthToUsdt, convertUsdtToEth } from "./ConvertToUsdt";
import { User } from "../models/User";
import * as UserAPI from '../network/UserAPI';
import LoginNavBar from "./layout/LoginNavBar";

interface Donators {
    donator: string;
    donation: string;
}

const CampaignDetails = () => {
    const navigate = useNavigate();
    const { state } = useLocation();
    const { donate, getDonations, contract, address } = useStateContext();
    const [isLoading, setIsLoading] = useState(false);
    const [amount, setAmount] = useState("");  // Reverted input
    const [donators, setDonators] = useState<Donators[]>([]);
    const campaignDeadline = ethers.BigNumber.from(state.deadline);
    const remainingDays = daysLeft(campaignDeadline.toNumber());
    const [targetUsdt, setTargetUsdt] = useState("");
    const [amountCollectedUsdt, setAmountCollectedUsdt] = useState("");
    const [loggedInUser, setLoggedInUser] = useState<User | null>(null);

    const handleClick = () => {
        const stripeLink = `https://donate.stripe.com/test_14k9CC58l64yghi6oo`;
        window.open(stripeLink, '_blank');
    };

    const fetchDonators = async () => {
        const data = await getDonations(state.pId);
        setDonators(data);
    };

    const handleDonate = async () => {
        setIsLoading(true);
        try {
            await donate({
                ...state,
                amountCollected: amount,  // Reverted input usage
            });
            navigate("/");
        } catch (error) {
            console.error("Error in donation:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (contract) fetchDonators();
    }, [contract, address]);

    useEffect(() => {
        const convertEthValuesToUsdt = async () => {
            try {
                const targetUsdtValue = await convertEthToUsdt(ethers.utils.parseEther(state.target));
                const amountCollectedUsdtValue = await convertEthToUsdt(ethers.utils.parseEther(state.amountCollected));
                setTargetUsdt(targetUsdtValue);
                setAmountCollectedUsdt(amountCollectedUsdtValue);
            } catch (error) {
                console.error("Error converting ETH to USDT:", error);
            }
        };

        convertEthValuesToUsdt();
    }, [state.target, state.amountCollected]);

    useEffect(() => {
        async function fetchLoggedInUser() {
            try {
                const user = await UserAPI.getLoggedInUser();
                setLoggedInUser(user);
            } catch (error) {
                console.error(error);
            }
        }
        fetchLoggedInUser();
    }, []);

    return (
        <div className="min-h-screen bg-base-200 p-4">
            <div className="navbar bg-base-100 rounded-box mb-4">
                <LoginNavBar user={loggedInUser as User} />
            </div>

            <div className="grid grid-cols-2 gap-4 h-auto">
                {/* Section 1: Campaign Image */}
                <div className="card bg-base-100 shadow-xl">
                    <figure>
                        <img src={state.image} alt="campaign" className="w-full h-[20rem] md:h-[27rem] object-cover" />
                    </figure>
                    <div className="card-body">
                        <h2 className="card-title text-xl md:text-2xl">{state.title}</h2>
                        <progress
                            className="progress progress-primary w-full"
                            value={calculateBarPercentage(state.target, state.amountCollected)}
                            max="100"
                        ></progress>
                        <div className="flex justify-between mt-2 text-lg md:text-xl">
                            <span>{amountCollectedUsdt} USDT raised of {targetUsdt} USDT</span>
                            <span>{remainingDays} days left</span>
                        </div>
                    </div>
                </div>

                {/* Section 2: Days Left, Raised Amount, Total Backers, Creator */}
                <div className="grid grid-cols-2 gap-4">
                    <div className="card bg-base-100 shadow-xl">
                        <div className="card-body items-center text-center">
                            <h2 className="card-title text-2xl md:text-3xl">Days Left</h2>
                            <p className="text-2xl md:text-3xl font-bold">{remainingDays}</p>
                        </div>
                    </div>
                    <div className="card bg-base-100 shadow-xl">
                        <div className="card-body items-center text-center">
                            <h2 className="card-title text-2xl md:text-3xl">Raised of {targetUsdt} USDT</h2>
                            <p className="text-2xl md:text-3xl font-bold">{amountCollectedUsdt} USDT</p>
                        </div>
                    </div>
                    <div className="card bg-base-100 shadow-xl">
                        <div className="card-body items-center text-center">
                            <h2 className="card-title text-2xl md:text-3xl">Total Backers</h2>
                            <p className="text-2xl md:text-3xl font-bold">{donators.length}</p>
                        </div>
                    </div>
                    <div className="card bg-base-100 shadow-xl">
                        <div className="card-body items-center text-center">
                            <h2 className="card-title text-2xl md:text-3xl">Creator</h2>
                            <div className="flex items-center mt-2">
                                <span className="text-sm md:text-md truncate">{state.owner}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Section 3: Story and Recent Donators */}
                <div className="grid grid-cols-1 gap-4 ">
                    <div className="card bg-base-100 shadow-xl">
                        <div className="card-body">
                            <h2 className="card-title text-xl md:text-2xl">Story</h2>
                            <p className="mt-2 text-lg md:text-xl">{state.description}</p>
                        </div>
                    </div>
                    <div className="card bg-base-100 shadow-xl">
                        <div className="card-body">
                            <h2 className="card-title text-xl md:text-2xl">Recent Donators</h2>
                            {donators.length > 0 ? (
                                <div className="space-y-2 mt-4">
                                    {donators.length > 0 ? (
                                        <div className="space-y-2 mt-4">
                                            {donators.slice(0, 5).map((item, index) => (
                                                <div key={`${item.donator}-${index}`} className="flex justify-between items-center">
                                                    <span className="text-xs md:text-sm truncate w-2/3">{item.donator}</span>
                                                    <span className="text-xs md:text-sm font-medium">{item.donation} ETH</span>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <p className="text-lg md:text-xl mt-4">No donators yet. Be the first one!</p>
                                    )}

                                </div>
                            ) : (
                                <p className="text-lg md:text-xl mt-4">No donators yet. Be the first one!</p>
                            )}
                        </div>
                    </div>
                </div>

                {/* Section 4: Fund Campaign */}
                <div className="grid grid-cols-1 gap-4">
                <div className="card bg-base-100 shadow-xl">
                    <div className="card-body">
                        <h2 className="card-title justify-center text-xl md:text-2xl">Fund the Campaign</h2>
                        <input
                            type="number"
                            placeholder="ETH 0.1"
                            step="0.01"
                            className="input input-bordered w-full mt-4 text-lg md:text-xl"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                        />
                        <div className="flex justify-center space-x-4 mt-4">
                            <button 
                                className="btn btn-primary w-1/2"
                                onClick={handleDonate}
                                disabled={isLoading}
                            >
                                {isLoading ? 'Processing...' : 'Pay with Metamask'}
                            </button>
                            <button 
                                className="btn btn-primary w-1/2"
                                onClick={handleClick}
                            >
                                {isLoading ? 'Processing...' : 'Pay with Card'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            </div>
        </div>
    );
};

export default CampaignDetails;
