import useSWR from 'swr';
import { getSolanaPrice, getStakingData } from '../services/api';

export const useStakingData = () => {
  const { 
    data: price, 
    error: priceError, 
    isLoading: priceLoading 
  } = useSWR(
    'solana-price',
    getSolanaPrice,
    { 
      refreshInterval: 60000, // Refresh every minute
      revalidateOnFocus: true
    }
  );

  const { 
    data: stakingData, 
    error: stakingError, 
    isLoading: stakingLoading 
  } = useSWR(
    'staking-data',
    getStakingData,
    { 
      refreshInterval: 300000, // Refresh every 5 minutes
      revalidateOnFocus: true
    }
  );

  return {
    price,
    priceError,
    priceLoading,
    stakingData,
    stakingError,
    stakingLoading,
  };
};