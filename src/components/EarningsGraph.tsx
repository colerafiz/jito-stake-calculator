import React, { useMemo } from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { DollarSign, Coins } from 'lucide-react';

interface EarningsGraphProps {
  data: Array<{
    month: number;
    monthDecimal: number;
    totalValue: number;
    principal: number;
    earnings: number;
  }>;
  principalSol: number;
  principalUsd: number;
}

export const EarningsGraph: React.FC<EarningsGraphProps> = ({
  data,
  principalSol,
  principalUsd,
}) => {
  const yAxisDomain = useMemo(() => {
    const minValue = principalUsd * 0.95;
    const maxValue = Math.max(...data.map(d => d.totalValue));
    const padding = (maxValue - minValue) * 0.1;
    return [minValue - padding, maxValue + padding];
  }, [data, principalUsd]);

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const monthData = payload[0].payload;
      return (
        <div className="bg-white p-2 sm:p-3 rounded-lg shadow-lg border border-gray-100 text-xs sm:text-sm">
          <p className="font-medium text-gray-900">Month {monthData.month}</p>
          <div className="space-y-1 mt-1">
            <p className="text-gray-600">
              Total: <span className="font-medium">${monthData.totalValue.toFixed(2)}</span>
            </p>
            <p className="text-gray-600">
              Principal: <span className="font-medium text-indigo-600">
                ${monthData.principal.toFixed(2)}
              </span>
            </p>
            <p className="text-gray-600">
              Rewards: <span className="font-medium text-green-600">
                ${monthData.earnings.toFixed(2)}
              </span>
            </p>
          </div>
        </div>
      );
    }
    return null;
  };

  const CustomLegend = () => (
    <div className="flex justify-center space-x-4 text-xs sm:text-sm mt-2">
      <div className="flex items-center">
        <span className="w-2 h-2 sm:w-3 sm:h-3 bg-indigo-600 rounded-full mr-1 sm:mr-2" />
        <span className="text-gray-600">Principal</span>
      </div>
      <div className="flex items-center">
        <span className="w-2 h-2 sm:w-3 sm:h-3 bg-green-500 rounded-full mr-1 sm:mr-2" />
        <span className="text-gray-600">Rewards</span>
      </div>
    </div>
  );

  const monthTicks = data
    .filter(d => Number.isInteger(d.monthDecimal))
    .map(d => d.monthDecimal);

  return (
    <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start space-y-3 sm:space-y-0 mb-4 sm:mb-6">
        <div className="space-y-1">
          <h2 className="text-base sm:text-lg font-semibold text-gray-900">Projected Earnings</h2>
          <p className="text-xs sm:text-sm text-gray-500">12-month projection with compound interest</p>
        </div>
        <div className="flex flex-row sm:space-x-4 justify-between sm:justify-start">
          <div className="text-right">
            <div className="flex items-center justify-end space-x-1">
              <Coins className="w-3 h-3 sm:w-4 sm:h-4 text-indigo-600" />
              <span className="text-sm sm:text-lg font-semibold text-indigo-600">
                {principalSol.toFixed(2)} SOL
              </span>
            </div>
            <p className="text-[10px] sm:text-xs text-gray-500">Initial Stake</p>
          </div>
          <div className="text-right ml-4">
            <div className="flex items-center justify-end space-x-1">
              <DollarSign className="w-3 h-3 sm:w-4 sm:h-4 text-green-600" />
              <span className="text-sm sm:text-lg font-semibold text-green-600">
                ${principalUsd.toFixed(2)}
              </span>
            </div>
            <p className="text-[10px] sm:text-xs text-gray-500">USD Value</p>
          </div>
        </div>
      </div>

      <div className="h-[250px] sm:h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 5, left: -20, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
            <XAxis
              dataKey="monthDecimal"
              ticks={monthTicks}
              tickFormatter={(value) => `M${value}`}
              stroke="#6B7280"
              fontSize={10}
              type="number"
              domain={[0, 12]}
            />
            <YAxis
              stroke="#6B7280"
              fontSize={10}
              tickFormatter={(value) => `$${value.toFixed(0)}`}
              domain={yAxisDomain}
              allowDataOverflow={true}
            />
            <Tooltip content={<CustomTooltip />} />
            <defs>
              <linearGradient id="principalGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#4F46E5" stopOpacity={0.2} />
                <stop offset="95%" stopColor="#4F46E5" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="rewardsGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#22C55E" stopOpacity={0.2} />
                <stop offset="95%" stopColor="#22C55E" stopOpacity={0} />
              </linearGradient>
            </defs>
            <Area
              type="basis"
              dataKey="principal"
              stackId="1"
              stroke="#4F46E5"
              fill="url(#principalGradient)"
              strokeWidth={2}
              isAnimationActive={false}
            />
            <Area
              type="basis"
              dataKey="earnings"
              stackId="1"
              stroke="#22C55E"
              fill="url(#rewardsGradient)"
              strokeWidth={2}
            />
            <Legend content={<CustomLegend />} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};