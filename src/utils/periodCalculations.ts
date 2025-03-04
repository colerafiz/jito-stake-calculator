import { JitoRewardMetrics, calculateJitoRewards } from './jitoCalculations';

export interface PeriodRewards {
  weekly: JitoRewardMetrics;
  monthly: JitoRewardMetrics;
  sixMonth: JitoRewardMetrics;
  yearly: JitoRewardMetrics;
}

export const calculateAllPeriods = (
  principal: number,
  grossAPY: number,
  solPrice: number
): PeriodRewards => {
  const managementFee = 0.04; // 4%
  const withdrawalFee = 0.001; // 0.1%

  return {
    weekly: calculateJitoRewards({
      principal,
      grossAPY,
      managementFee,
      withdrawalFee,
      solPrice,
      timeInYears: 1/52,
    }),
    monthly: calculateJitoRewards({
      principal,
      grossAPY,
      managementFee,
      withdrawalFee,
      solPrice,
      timeInYears: 1/12,
    }),
    sixMonth: calculateJitoRewards({
      principal,
      grossAPY,
      managementFee,
      withdrawalFee,
      solPrice,
      timeInYears: 1/2,
    }),
    yearly: calculateJitoRewards({
      principal,
      grossAPY,
      managementFee,
      withdrawalFee,
      solPrice,
      timeInYears: 1,
    }),
  };
};