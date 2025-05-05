export const useEmiCalculator = (loanAmount, interestRate, termYears) => {
  if (!loanAmount || !interestRate || !termYears) return {};

  const principal = loanAmount;
  const rate = interestRate / 12 / 100;
  const n = termYears * 12;

  const emi =
    (principal * rate * Math.pow(1 + rate, n)) / (Math.pow(1 + rate, n) - 1);

  let balance = principal;
  const amortizationSchedule = [];

  for (let i = 1; i <= n; i++) {
    const interest = balance * rate;
    const principalPaid = emi - interest;
    balance -= principalPaid;
    amortizationSchedule.push({
      month: i,
      principal: principalPaid,
      interest: interest,
      balance: Math.max(balance, 0),
    });
  }

  return { emi: emi.toFixed(2), schedule: amortizationSchedule };
};
