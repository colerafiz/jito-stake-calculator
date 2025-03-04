import axios from 'axios';
import { SolanaPrice, StakingData } from '../types/api';

const COINGECKO_API = 'https://api.coingecko.com/api/v3';
const JITO_API = 'https://jito-api.example.com'; // Placeholder until real API endpoint is available

export const getSolanaPrice = async (): Promise<number> => {
  try {
    const response = await axios.get<SolanaPrice>(
      `${COINGECKO_API}/simple/price?ids=solana&vs_currencies=usd`
    );
    return response.data.solana.usd;
  } catch (error) {
    console.error('Error fetching Solana price:', error);
    throw error;
  }
};

export const getStakingData = async (): Promise<StakingData> => {
  // Since the Jito API isn't publicly available yet, we'll use a static value
  return {
    apy: 6.69,
  };
};