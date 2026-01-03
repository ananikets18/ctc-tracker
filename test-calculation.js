// Test calculation for ₹10L CTC
import { calculateCTCBreakdown } from './src/utils/taxCalculations.js';

const result = calculateCTCBreakdown(1000000, {
  isOldRegime: false, // New Regime
  state: 'Maharashtra',
  rentPaid: 0,
  isMetro: true,
  financialYear: '2025-26'
});

console.log('\n=== CTC BREAKDOWN TEST (₹10L) ===\n');
console.log('Components:');
console.log(`Basic Salary: ₹${result.components.basic.toLocaleString('en-IN')}`);
console.log(`HRA: ₹${result.components.hra.toLocaleString('en-IN')}`);
console.log(`Special Allowance: ₹${result.components.specialAllowance.toLocaleString('en-IN')}`);
console.log(`Employer PF: ₹${result.components.employerPF.toLocaleString('en-IN')}`);
console.log(`Gratuity: ₹${result.components.gratuity.toLocaleString('en-IN')}`);

console.log('\nGross Salary (Cash): ₹' + result.results.grossSalary.toLocaleString('en-IN'));
console.log('Standard Deduction: ₹' + result.exemptions.standardDeduction.toLocaleString('en-IN'));
console.log('Taxable Income: ₹' + result.results.taxableIncome.toLocaleString('en-IN'));

console.log('\nDeductions:');
console.log(`Employee PF: ₹${result.deductions.employeePF.toLocaleString('en-IN')}`);
console.log(`Income Tax: ₹${result.deductions.incomeTax.toLocaleString('en-IN')}`);
console.log(`Cess (4%): ₹${result.deductions.cess.toLocaleString('en-IN')}`);
console.log(`Total Tax: ₹${result.deductions.totalTax.toLocaleString('en-IN')}`);
console.log(`Professional Tax: ₹${result.deductions.professionalTax.toLocaleString('en-IN')}`);

console.log('\n=== FINAL RESULTS ===');
console.log(`Annual In-Hand: ₹${result.results.annualInHand.toLocaleString('en-IN')}`);
console.log(`Monthly In-Hand: ₹${result.results.monthlyInHand.toLocaleString('en-IN')}`);

console.log('\n=== EXPECTED ===');
console.log('Monthly In-Hand: ₹68,842 (approximately)');
console.log('Annual In-Hand: ₹8,26,104');

// Verify components
const totalCTC = result.components.basic + result.components.hra + result.components.specialAllowance 
                 + result.components.employerPF + result.components.gratuity;
console.log('\n=== VERIFICATION ===');
console.log(`Total reconstructed CTC: ₹${totalCTC.toLocaleString('en-IN')}`);
console.log(`Match: ${totalCTC === 1000000 ? '✓' : '✗'}`);
