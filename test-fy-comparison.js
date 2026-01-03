// Test calculation across different financial years
import { calculateCTCBreakdown } from './src/utils/taxCalculations.js';

const testCTC = 1000000; // ₹10L
const testOptions = {
  isOldRegime: false,
  state: 'Maharashtra',
  rentPaid: 0,
  isMetro: true
};

console.log('\n=== FINANCIAL YEAR COMPARISON TEST ===\n');

// Test FY 2024-25
const result2024 = calculateCTCBreakdown(testCTC, {
  ...testOptions,
  financialYear: '2024-25'
});

console.log('FY 2024-25:');
console.log(`  Standard Deduction: ₹${result2024.exemptions.standardDeduction.toLocaleString('en-IN')}`);
console.log(`  Taxable Income: ₹${result2024.results.taxableIncome.toLocaleString('en-IN')}`);
console.log(`  Income Tax: ₹${result2024.deductions.incomeTax.toLocaleString('en-IN')}`);
console.log(`  Monthly In-Hand: ₹${result2024.results.monthlyInHand.toLocaleString('en-IN')}`);

// Test FY 2025-26
const result2025 = calculateCTCBreakdown(testCTC, {
  ...testOptions,
  financialYear: '2025-26'
});

console.log('\nFY 2025-26:');
console.log(`  Standard Deduction: ₹${result2025.exemptions.standardDeduction.toLocaleString('en-IN')}`);
console.log(`  Taxable Income: ₹${result2025.results.taxableIncome.toLocaleString('en-IN')}`);
console.log(`  Income Tax: ₹${result2025.deductions.incomeTax.toLocaleString('en-IN')}`);
console.log(`  Monthly In-Hand: ₹${result2025.results.monthlyInHand.toLocaleString('en-IN')}`);

// Test FY 2026-27
const result2026 = calculateCTCBreakdown(testCTC, {
  ...testOptions,
  financialYear: '2026-27'
});

console.log('\nFY 2026-27:');
console.log(`  Standard Deduction: ₹${result2026.exemptions.standardDeduction.toLocaleString('en-IN')}`);
console.log(`  Taxable Income: ₹${result2026.results.taxableIncome.toLocaleString('en-IN')}`);
console.log(`  Income Tax: ₹${result2026.deductions.incomeTax.toLocaleString('en-IN')}`);
console.log(`  Monthly In-Hand: ₹${result2026.results.monthlyInHand.toLocaleString('en-IN')}`);

console.log('\n=== KEY DIFFERENCES ===');
console.log(`Standard Deduction increased from ₹50K (2024-25) to ₹75K (2025-26+)`);
console.log(`Rebate Limit increased from ₹7L (2024-25) to ₹12L (2025-26+)`);
console.log(`\nIn-Hand difference: ₹${(result2025.results.monthlyInHand - result2024.results.monthlyInHand).toLocaleString('en-IN')}/month more in 2025-26`);
