import React from 'react';
import { InfoTooltip } from './InfoTooltip';

interface ApyDisplayProps {
  apy: number;
  isLoading: boolean;
  error?: Error;
}

export const ApyDisplay: React.FC<ApyDisplayProps> = ({ apy, isLoading, error }) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
        Current APY
        <InfoTooltip content="Current Jito staking APY" />
      </label>
      <div className="relative">
        <input
          type="number"
          value={apy}
          readOnly
          className={`w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 ${
            isLoading ? 'animate-pulse' : ''
          }`}
        />
        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
          <span className="text-gray-500">%</span>
        </div>
      </div>
      {error && (
        <p className="mt-1 text-sm text-red-600">
          Error loading APY. Using default rate.
        </p>
      )}
    </div>
  );
};