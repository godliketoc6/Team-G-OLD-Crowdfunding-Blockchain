import React, { useContext, createContext, ReactNode } from 'react';
import { useAddress, useContract, useConnect, useContractWrite } from '@thirdweb-dev/react';
import { ethers } from 'ethers';

// Define the type for the context value
interface StateContextType {
  address: string | undefined;
  connect: () => void;
  contract: any;
  createCampaign: (form: FormType) => Promise<void>;
  getCampaigns: () => Promise<Campaign[]>;
  getUserCampaigns: () => Promise<Campaign[]>;
  donate: (campaign: Campaign) => Promise<any>;
  getDonations: (pId: number) => Promise<{
    donator: string;
    donation: string;
}[]>;
}

interface FormType {
  target: string | ethers.BigNumber;
  title: string;
  description: string;
  deadline: Date | null;
  image: string;
}

interface Campaign {
  owner: string;
  title: string;
  description: string;
  target: string;
  deadline: number;
  amountCollected: string;
  image: string;
  pId: number;
}

// Create the context with a default value
const StateContext = createContext<StateContextType | undefined>(undefined);

export const StateContextProvider = ({ children }: { children: ReactNode }) => {
  const { contract } = useContract('0x19724f6dC34f5d60611260448e5B21176d0882e6');
  const { mutateAsync: createCampaign } = useContractWrite(contract, 'createCampaign');
  const address = useAddress();
  const connect = useConnect();

  const publishCampaign = async (form: FormType) => {
    try {
      const data = await createCampaign({
        args: [
          address, // owner
          form.title, // title
          form.description, // description
          form.target, // target
          form.deadline ? new Date(form.deadline).getTime() : 0, // deadline
          form.image, // image
        ],
      });
      console.log('contract call success', data);
    } catch (error) {
      console.log('contract call failure', error);
    }
  };

  const getCampaigns = async (): Promise<Campaign[]> => { 
    if (!contract) {
      console.error('Contract is undefined');
      return [];
    }
    const campaigns = await contract.call('getCampaigns');
    const parsedCampaigns = campaigns.map((campaign: Campaign, i: number) => ({
      owner: campaign.owner,
      title: campaign.title,
      description: campaign.description,
      target: ethers.utils.formatEther(campaign.target.toString()),
      deadline: campaign.deadline,
      amountCollected: ethers.utils.formatEther(campaign.amountCollected.toString()),
      image: campaign.image,
      pId: i
    }));
    console.log(parsedCampaigns);
    return parsedCampaigns;
  };

  const getUserCampaigns = async () => {
    const allCampaigns = await getCampaigns();

    const filteredCampaigns = allCampaigns.filter((campaign) => campaign.owner === address);

    return filteredCampaigns;
  }

  const donate = async ({pId, amountCollected} : Campaign) => {
    if (!contract) {
      console.error('Contract is undefined');
      return [];
    }
    const data = await contract.call('donateToCampaign', [pId], { value: ethers.utils.parseEther(amountCollected)});

    return data;
  }

  const getDonations = async (pId: number) => {
    if (!contract) {
      console.error('Contract is undefined');
      return [];
    }

    const donations = await contract.call('getDonators', [pId]);
    const numberOfDonations = donations[0].length;

    const parsedDonations = [];

    for(let i = 0; i < numberOfDonations; i++) {
      parsedDonations.push({
        donator: donations[0][i],
        donation: ethers.utils.formatEther(donations[1][i].toString())
      })
    }

    return parsedDonations;
  }

  

  return (
    <StateContext.Provider value={{ address, contract, connect, createCampaign: publishCampaign, getCampaigns, getUserCampaigns, donate, getDonations }}>
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => {
  const context = useContext(StateContext);
  if (!context) {
    throw new Error('useStateContext must be used within a StateProvider');
  }
  return context;
};