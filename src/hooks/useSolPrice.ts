import useSWR from 'swr';

const COINGECKO_API = 'https://api.coingecko.com/api/v3';

const fetcher = async (url: string) => {
  const response = await fetch(url);
  const data = await response.json();
  return data.solana.usd;
};

export const useSolPrice = () => {
  const { data: price, error, isLoading } = useSWR(
    `${COINGECKO_API}/simple/price?ids=solana&vs_currencies=usd`,
    fetcher,
    { refreshInterval: 60000 } // Refresh every minute
  );

  return {
    price,
    error,
    isLoading,
  };
};