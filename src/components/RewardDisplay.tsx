import React from 'react';
import { TrendingUp, Coins, DollarSign } from 'lucide-react';

interface RewardDisplayProps {
  label: string;
  rewards: {
    sol: number;
    usd: number;
    percentage: number;
  };
  period: string;
}

export const RewardDisplay: React.FC<RewardDisplayProps> = ({ label, rewards, period }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2">
          {label === 'Weekly Rewards' && <TrendingUp className="w-5 h-5 text-blue-500" />}
          {label === 'Monthly Rewards' && <Coins className="w-5 h-5 text-purple-500" />}
          {label === 'Six-Month Rewards' && <DollarSign className="w-5 h-5 text-green-500" />}
          <span className="font-medium text-gray-700">{label}</span>
        </div>
        <span className="text-sm text-gray-500">per {period}</span>
      </div>
      
      <div className="grid grid-cols-3 gap-4">
        <div className="text-center">
          <div className="text-sm text-gray-500 mb-1">SOL</div>
          <div className="font-semibold text-blue-600">
            {rewards.sol.toFixed(4)}
          </div>
        </div>
        
        <div className="text-center">
          <div className="text-sm text-gray-500 mb-1">USD</div>
          <div className="font-semibold text-green-600">
            ${rewards.usd.toFixed(2)}
          </div>
        </div>
        
        <div className="text-center">
          <div className="text-sm text-gray-500 mb-1">Gain</div>
          <div className="font-semibold text-purple-600">
            {rewards.percentage.toFixed(2)}%
          </div>
        </div>
      </div>
    </div>
  );
};