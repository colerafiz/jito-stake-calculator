export interface SolanaPrice {
  solana: {
    usd: number;
  };
}

export interface StakingData {
  apy: number;
}

export interface PriceDisplayProps {
  price: number;
  isLoading: boolean;
  error?: Error;
}

export interface JitoApiResponse {
  apy: number;
  timestamp: string;
}