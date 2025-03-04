import React from 'react';
import { Coins, DollarSign } from 'lucide-react';
import { InfoTooltip } from './InfoTooltip';

interface StakeInputProps {
  amount: string;
  setAmount: (value: string) => void;
  usdValue: number;
}

export const StakeInput: React.FC<StakeInputProps> = ({ amount, setAmount, usdValue }) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
        Amount to Stake
        <InfoTooltip content="Enter the amount of SOL you wish to stake" />
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Coins className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          min="0"
          step="0.1"
          className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
          placeholder="Enter SOL amount"
        />
      </div>
      {usdValue > 0 && (
        <div className="text-sm text-gray-500 mt-2 flex items-center">
          <DollarSign className="w-4 h-4 mr-1" />
          ${usdValue.toFixed(2)} USD
        </div>
      )}
    </div>
  );
};