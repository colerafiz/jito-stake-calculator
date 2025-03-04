import React, { useState } from 'react';
import { Coins, Clock, Calendar, TrendingUp } from 'lucide-react';
import { InputField } from './InputField';
import { DisclaimerBox } from './DisclaimerBox';
import { EarningsGraph } from './EarningsGraph';
import { RewardsTable } from './RewardsTable';
import { calculateAllPeriods } from '../utils/periodCalculations';
import { generateMonthlyData } from '../utils/graphCalculations';
import { useSolPrice } from '../hooks/useSolPrice';

export const StakeCalculator: React.FC = () => {
  const [amount, setAmount] = useState<string>('');
  const [apy, setApy] = useState(8.04); // Default Jito APY
  const { price: solPrice, isLoading } = useSolPrice();

  const principal = Number(amount) || 0;
  const principalUsd = principal * (solPrice || 0);

  const rewards = calculateAllPeriods(
    principal,
    apy / 100,
    solPrice || 0
  );

  const graphData = generateMonthlyData(
    principal,
    apy / 100,
    solPrice || 0
  );

  const rewardPeriods = [
    {
      label: 'Weekly',
      rewards: rewards.weekly,
      period: 'week',
      icon: <Clock className="w-4 h-4 text-blue-500" />,
    },
    {
      label: 'Monthly',
      rewards: rewards.monthly,
      period: 'month',
      icon: <Calendar className="w-4 h-4 text-purple-500" />,
    },
    {
      label: '6 Month',
      rewards: rewards.sixMonth,
      period: '6 months',
      icon: <TrendingUp className="w-4 h-4 text-green-500" />,
    },
    {
      label: 'Yearly',
      rewards: rewards.yearly,
      period: 'year',
      icon: <Coins className="w-4 h-4 text-amber-500" />,
    },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 sm:px-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-3">
        <Coins className="w-8 h-8 text-indigo-600 mb-2 sm:mb-0" />
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Jito Stake Calculator</h1>
          <p className="text-sm text-gray-600">Calculate your potential Jito staking rewards</p>
        </div>
      </div>

      <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <InputField
            label="Amount to Stake (SOL)"
            value={amount}
            onChange={setAmount}
            tooltip="Enter the amount of SOL you wish to stake with Jito"
            min={0}
            step={0.1}
            placeholder="Enter SOL amount"
          />

          <InputField
            label="APY (%)"
            value={apy}
            onChange={(value) => setApy(Number(value))}
            tooltip="Gross Annual Percentage Yield for Jito staking"
            min={0}
            step={0.01}
          />
        </div>
      </div>

      {principal > 0 && (
        <>
          <EarningsGraph
            data={graphData}
            principalSol={principal}
            principalUsd={principalUsd}
          />
          <RewardsTable periods={rewardPeriods} />
        </>
      )}

      <DisclaimerBox />
    </div>
  );
};