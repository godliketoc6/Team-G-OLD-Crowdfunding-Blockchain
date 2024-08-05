import { BigNumber, ethers } from 'ethers';
import axios from 'axios';

const ETH_USDT_API_URL = 'https://api.coinbase.com/v2/exchange-rates?currency=ETH';

const fetchEthToUsdtRate = async (): Promise<number> => {
    try {
        const response = await axios.get(ETH_USDT_API_URL);
        const rates = response.data.data.rates;
        const usdtRate = parseFloat(rates['USDT']);
        if (isNaN(usdtRate)) {
            throw new Error('Invalid USDT rate');
        }
        return usdtRate;
    } catch (error) {
        console.error('Error fetching ETH to USDT rate:', error);
        throw new Error('Could not fetch ETH to USDT rate');
    }
};

export const convertEthToUsdt = async (ethAmount: BigNumber): Promise<string> => {
    const ethToUsdtRate = await fetchEthToUsdtRate();
    const ethAmountInNumber = parseFloat(ethers.utils.formatEther(ethAmount)); // Assuming ETH has 18 decimals
    const usdtAmount = ethAmountInNumber * ethToUsdtRate; // Convert ETH to USDT
    return usdtAmount.toFixed(4); // Return the amount in USDT rounded to 6 decimal places
};

export const convertUsdtToEth = async (usdtAmount: number): Promise<string> => {
    const ethToUsdtRate = await fetchEthToUsdtRate();
    const ethAmountInNumber = usdtAmount / ethToUsdtRate;
    const roundedEthAmount = Number(ethAmountInNumber.toFixed(18));
    return ethers.utils.formatEther(ethers.utils.parseEther(roundedEthAmount.toString()));
};