import React from 'react'
import { useNavigate } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid';
import Campaign from './Campaign';

interface DisplayCampaign {
    isLoading: boolean;
    campaigns: any;
}

const DisplayCampaign = ({ isLoading, campaigns }: DisplayCampaign) => {

    const navigate = useNavigate();

    const handleNavigate = (campaign: any) => {
        navigate(`/campaign-details/${campaign.title}`, { state: campaign })
    }

    return (
        <div className='flex flex-1 flex-wrap gap-4 pb-4'>

            {!isLoading && campaigns.length === 0 && (
                <p className="font-normal text-lg leading-[30px] text-[#818183]">
                    You have not created any campaigns yet
                </p>
            )}

            {!isLoading && campaigns.length > 0 && campaigns.map((campaign: any) => <Campaign
                key={uuidv4()}
                {...campaign}
                handleClick={() => handleNavigate(campaign)}
            />)}

        </div>
    )
}

export default DisplayCampaign