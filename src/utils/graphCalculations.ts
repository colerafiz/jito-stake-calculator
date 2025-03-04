export interface MonthlyDataPoint {
  month: number;
  totalValue: number;
  principal: number;
  earnings: number;
}

export const generateMonthlyData = (
  principal: number,
  grossAPY: number,
  solPrice: number,
  months: number = 12
): MonthlyDataPoint[] => {
  const managementFee = 0.04; // 4%
  const effectiveMonthlyRate = (grossAPY * (1 - managementFee)) / 12;
  const principalUsd = principal * solPrice;
  
  // Generate more data points for smoother curve
  const pointsPerMonth = 4; // 4 points per month for smoother curve
  const totalPoints = months * pointsPerMonth + 1;
  
  return Array.from({ length: totalPoints }, (_, i) => {
    const monthDecimal = i / pointsPerMonth;
    // Calculate compound interest for the current time point
    const totalSol = principal * Math.pow(1 + effectiveMonthlyRate / pointsPerMonth, i);
    const monthlyEarnings = totalSol - principal;
    
    return {
      month: Math.floor(monthDecimal), // Keep month as integer for display
      monthDecimal: monthDecimal, // Use for calculations
      totalValue: totalSol * solPrice,
      principal: principalUsd, // Constant principal value in USD
      earnings: monthlyEarnings * solPrice,
    };
  });
};