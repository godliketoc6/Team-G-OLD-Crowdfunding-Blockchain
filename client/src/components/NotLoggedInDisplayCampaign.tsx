import { useNavigate } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid';
import Campaign from './Campaign';
import toast from 'react-hot-toast';

interface NotLoggedInDisplayCampaignProps {
    isLoading: boolean;
    campaigns: any;
}

const NotLoggedInDisplayCampaign = ({ isLoading, campaigns }: NotLoggedInDisplayCampaignProps) => {
    const navigate = useNavigate();

    const handleNavigateToSignUp = () => {
        navigate('/signup');
        toast('Please login to see more detail!', {icon: '⚠️'});
    }

    return (
        <div className='flex flex-1 flex-wrap gap-4 pb-4'>
            {!isLoading && campaigns.length === 0 && (
                <p className="font-normal text-lg leading-[30px] text-[#818183]">
                    There are no campaigns available at the moment
                </p>
            )}
            {!isLoading && campaigns.length > 0 && campaigns.map((campaign: any) => (
                <Campaign
                    key={uuidv4()}
                    {...campaign}
                    handleClick={handleNavigateToSignUp}
                />
            ))}
        </div>
    )
}

export default NotLoggedInDisplayCampaign