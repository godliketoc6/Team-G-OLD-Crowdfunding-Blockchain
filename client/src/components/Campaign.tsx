import React, { useState, useEffect } from 'react';
import { BigNumber, ethers } from 'ethers';
import { daysLeft } from '../utils';
import { convertEthToUsdt } from './ConvertToUsdt';

interface Campaign {
    owner: string;
    title: string;
    description: string;
    target: string;
    deadline: BigNumber;
    amountCollected: string;
    image: string;
    handleClick: () => void;
}

const Campaign: React.FC<Campaign> = ({ owner, title, description, target, deadline, amountCollected, image, handleClick }) => {
    const [targetUsdt, setTargetUsdt] = useState<string>('');
    const deadlineNumber = deadline.toNumber();
    const remainingDays = daysLeft(deadlineNumber);

    useEffect(() => {
        const fetchUsdtTarget = async () => {
            try {
                const targetBigNumber = ethers.utils.parseEther(target);
                const usdtTarget = await convertEthToUsdt(targetBigNumber);
                setTargetUsdt(usdtTarget);
            } catch (error) {
                console.error('Error fetching USDT target:', error);
                setTargetUsdt('N/A');
            }
        };

        fetchUsdtTarget();
    }, [target]);

    if (Number(remainingDays) <= 0) {
        return null;
    }

    return (
        <div className="relative card card-compact bg-base-100 w-[372px] h-[450px] shadow-xl" onClick={handleClick}>
            <figure>
                <img src={image} alt="Campaign" className="w-full h-48 object-cover" />
            </figure>
            <div className="card-body flex flex-col justify-between">
                <div>
                    <h2 className="card-title text-2xl font-bold mb-2">{title}</h2>
                    <p className="text-sm text-gray-500 italic mb-1">By: {owner}</p>
                    <p className="text-lg mb-4 line-clamp-3">{description}</p>
                </div>
                <div className="stats stats-horizontal shadow">
                    <div className="stat">
                        <div className="stat-title">Target (USDT)</div>
                        <div className="stat-value">{targetUsdt}</div>
                        <div className="stat-desc text-md">≈ {target} ETH</div>
                    </div>
                    <div className="stat">
                        <div className="stat-title">Days left</div>
                        <div className="stat-value">{remainingDays}</div>
                    </div>
                </div>
            </div>
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity rounded-2xl">
                <span className="text-white text-2xl font-bold">View More</span>
            </div>
        </div>
    )
}

export default Campaign;