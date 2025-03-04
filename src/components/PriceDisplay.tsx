import React from 'react';
import { DollarSign, TrendingUp } from 'lucide-react';
import { PriceDisplayProps } from '../types/api';

export const PriceDisplay: React.FC<PriceDisplayProps> = ({ price, isLoading, error }) => {
  if (error) {
    return (
      <div className="text-red-500 text-sm flex items-center">
        <DollarSign className="w-4 h-4 mr-1" />
        Error loading price
      </div>
    );
  }

  return (
    <div className="bg-green-50 px-4 py-2 rounded-lg border border-green-100">
      <div className="flex items-center space-x-2">
        <TrendingUp className="w-5 h-5 text-green-600" />
        <div>
          <div className="text-xs text-green-700">SOL Price</div>
          <div className="text-lg font-semibold text-green-800">
            {isLoading ? (
              <span className="text-green-400">Loading...</span>
            ) : (
              `$${price.toFixed(2)}`
            )}
          </div>
        </div>
      </div>
    </div>
  );
};