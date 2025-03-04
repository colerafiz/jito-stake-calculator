import React from 'react';

export const DisclaimerBox: React.FC = () => {
  return (
    <div className="bg-gray-50 p-4 rounded-lg text-sm text-gray-600">
      <p className="font-medium mb-2">Important Notes:</p>
      <ul className="list-disc list-inside space-y-1">
        <li>Calculations include Jito's 4% management fee and 0.1% withdrawal fee</li>
        <li>Returns are based on current network conditions and may vary</li>
        <li>Past performance does not guarantee future returns</li>
        <li>SOL price updates every minute from CoinGecko</li>
      </ul>
    </div>
  );
};