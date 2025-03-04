export interface RewardMetrics {
  sol: number;
  usd: number;
  percentage: number;
}

export interface StakingRewards {
  weekly: RewardMetrics;
  monthly: RewardMetrics;
  sixMonth: RewardMetrics;
  yearly: RewardMetrics;
}

export interface StakingParams {
  amount: number;
  apy: number;
  commission: number;
  solPrice: number;
}

export const calculateStakingRewards = ({
  amount,
  apy,
  commission,
  solPrice,
}: StakingParams): StakingRewards => {
  const effectiveApy = (apy - commission) / 100;
  
  const calculatePeriodRewards = (periods: number) => {
    const solReward = amount * (Math.pow(1 + effectiveApy / periods, periods) - 1);
    return {
      sol: solReward,
      usd: solReward * solPrice,
      percentage: (solReward / amount) * 100,
    };
  };

  return {
    weekly: calculatePeriodRewards(52),
    monthly: calculatePeriodRewards(12),
    sixMonth: calculatePeriodRewards(2),
    yearly: calculatePeriodRewards(1),
  };
};