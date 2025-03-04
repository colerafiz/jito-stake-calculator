export interface JitoStakeParams {
  principal: number;
  grossAPY: number;
  managementFee: number;
  withdrawalFee: number;
  solPrice: number;
  timeInYears: number;
}

export interface JitoRewardMetrics {
  grossRewards: number;
  netRewardsAfterMgmt: number;
  netRewardsAfterWithdrawal: number;
  totalReturn: number;
  netAPY: number;
  rewardsUsdValue: number;
}

export const calculateJitoRewards = ({
  principal,
  grossAPY,
  managementFee,
  withdrawalFee,
  solPrice,
  timeInYears,
}: JitoStakeParams): JitoRewardMetrics => {
  // Calculate gross rewards
  const grossRewards = principal * grossAPY * timeInYears;

  // Deduct management fee
  const netRewardsAfterMgmt = grossRewards * (1 - managementFee);

  // Deduct withdrawal fee
  const netRewardsAfterWithdrawal = netRewardsAfterMgmt * (1 - withdrawalFee);

  // Calculate total return (principal + net rewards)
  const totalReturn = principal + netRewardsAfterWithdrawal;

  // Calculate net APY as a percentage
  const netAPY = ((totalReturn - principal) / principal) / timeInYears * 100;

  return {
    grossRewards,
    netRewardsAfterMgmt,
    netRewardsAfterWithdrawal,
    totalReturn,
    netAPY,
    rewardsUsdValue: netRewardsAfterWithdrawal * solPrice, // Only the rewards in USD
  };
};