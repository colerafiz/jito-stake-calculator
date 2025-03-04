import React from 'react';
import { Calendar, Clock, Coins, TrendingUp } from 'lucide-react';
import { JitoRewardMetrics } from '../utils/jitoCalculations';

interface RewardCardProps {
  label: string;
  rewards: JitoRewardMetrics;
  period: string;
  variant: 'weekly' | 'monthly' | 'sixMonth' | 'yearly';
}

export const RewardCard: React.FC<RewardCardProps> = ({ label, rewards, period, variant }) => {
  const getIcon = () => {
    switch (variant) {
      case 'weekly':
        return <Clock className="w-4 h-4 text-blue-500" />;
      case 'monthly':
        return <Calendar className="w-4 h-4 text-purple-500" />;
      case 'sixMonth':
        return <TrendingUp className="w-4 h-4 text-green-500" />;
      case 'yearly':
        return <Coins className="w-4 h-4 text-amber-500" />;
    }
  };

  const getColorClass = () => {
    switch (variant) {
      case 'weekly':
        return 'text-blue-600';
      case 'monthly':
        return 'text-purple-600';
      case 'sixMonth':
        return 'text-green-600';
      case 'yearly':
        return 'text-amber-600';
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center space-x-2">
          {getIcon()}
          <h3 className="text-sm font-medium text-gray-700">{label}</h3>
        </div>
        <span className="text-xs text-gray-500">per {period}</span>
      </div>
      
      <div className="grid grid-cols-3 gap-2 text-center">
        <div>
          <p className={`text-sm font-semibold ${getColorClass()}`}>
            {rewards.netRewardsAfterWithdrawal.toFixed(3)}
          </p>
          <p className="text-xs text-gray-500">SOL</p>
        </div>
        <div>
          <p className="text-sm font-semibold text-green-600">
            ${rewards.rewardsUsdValue.toFixed(2)}
          </p>
          <p className="text-xs text-gray-500">USD</p>
        </div>
        <div>
          <p className="text-sm font-semibold text-indigo-600">
            {rewards.netAPY.toFixed(2)}%
          </p>
          <p className="text-xs text-gray-500">Return</p>
        </div>
      </div>
    </div>
  );
};