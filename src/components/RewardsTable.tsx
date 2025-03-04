import React from 'react';
import { JitoRewardMetrics } from '../utils/jitoCalculations';

interface RewardPeriod {
  label: string;
  rewards: JitoRewardMetrics;
  period: string;
  icon: React.ReactNode;
}

interface RewardsTableProps {
  periods: RewardPeriod[];
}

export const RewardsTable: React.FC<RewardsTableProps> = ({ periods }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-[10px] sm:text-xs font-medium text-gray-500 uppercase tracking-wider">
                Period
              </th>
              <th className="px-3 sm:px-6 py-2 sm:py-3 text-right text-[10px] sm:text-xs font-medium text-gray-500 uppercase tracking-wider">
                SOL
              </th>
              <th className="px-3 sm:px-6 py-2 sm:py-3 text-right text-[10px] sm:text-xs font-medium text-gray-500 uppercase tracking-wider">
                USD
              </th>
              <th className="px-3 sm:px-6 py-2 sm:py-3 text-right text-[10px] sm:text-xs font-medium text-gray-500 uppercase tracking-wider">
                Return
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {periods.map((period, index) => (
              <tr key={period.label} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                <td className="px-3 sm:px-6 py-2 sm:py-4 whitespace-nowrap">
                  <div className="flex items-center space-x-1 sm:space-x-2">
                    {period.icon}
                    <span className="text-xs sm:text-sm text-gray-900">{period.label}</span>
                    <span className="text-[10px] sm:text-xs text-gray-500 hidden sm:inline">
                      per {period.period}
                    </span>
                  </div>
                </td>
                <td className="px-3 sm:px-6 py-2 sm:py-4 whitespace-nowrap text-right">
                  <span className="text-xs sm:text-sm font-medium text-blue-600">
                    {period.rewards.netRewardsAfterWithdrawal.toFixed(3)}
                  </span>
                </td>
                <td className="px-3 sm:px-6 py-2 sm:py-4 whitespace-nowrap text-right">
                  <span className="text-xs sm:text-sm font-medium text-green-600">
                    ${period.rewards.rewardsUsdValue.toFixed(2)}
                  </span>
                </td>
                <td className="px-3 sm:px-6 py-2 sm:py-4 whitespace-nowrap text-right">
                  <span className="text-xs sm:text-sm font-medium text-indigo-600">
                    {period.rewards.netAPY.toFixed(2)}%
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};