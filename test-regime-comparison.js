// Test both Old and New regime for ₹10L CTC in FY 2025-26
import { calculateCTCBreakdown } from './src/utils/taxCalculations.js';

const testCTC = 1000000; // ₹10L

console.log('\n=== FY 2025-26 REGIME COMPARISON (₹10L CTC) ===\n');

// Test New Regime
const newRegime = calculateCTCBreakdown(testCTC, {
  isOldRegime: false,
  state: 'Maharashtra',
  rentPaid: 0,
  isMetro: true,
  financialYear: '2025-26'
});

console.log('NEW TAX REGIME:');
console.log(`  Gross Salary: ₹${newRegime.results.grossSalary.toLocaleString('en-IN')}`);
console.log(`  Employee PF: ₹${newRegime.deductions.employeePF.toLocaleString('en-IN')}`);
console.log(`  Standard Deduction: ₹${newRegime.exemptions.standardDeduction.toLocaleString('en-IN')}`);
console.log(`  HRA Exemption: ₹${newRegime.exemptions.hraExemption.toLocaleString('en-IN')} (Not allowed in new regime)`);
console.log(`  Taxable Income: ₹${newRegime.results.taxableIncome.toLocaleString('en-IN')}`);
console.log(`  Income Tax: ₹${newRegime.deductions.incomeTax.toLocaleString('en-IN')}`);
console.log(`  Cess (4%): ₹${newRegime.deductions.cess.toLocaleString('en-IN')}`);
console.log(`  Professional Tax: ₹${newRegime.deductions.professionalTax.toLocaleString('en-IN')}`);
console.log(`  Annual In-Hand: ₹${newRegime.results.annualInHand.toLocaleString('en-IN')}`);
console.log(`  Monthly In-Hand: ₹${newRegime.results.monthlyInHand.toLocaleString('en-IN')}`);

// Test Old Regime
const oldRegime = calculateCTCBreakdown(testCTC, {
  isOldRegime: true,
  state: 'Maharashtra',
  rentPaid: 0, // No rent paid, so no HRA exemption
  isMetro: true,
  financialYear: '2025-26'
});

console.log('\nOLD TAX REGIME:');
console.log(`  Gross Salary: ₹${oldRegime.results.grossSalary.toLocaleString('en-IN')}`);
console.log(`  Employee PF: ₹${oldRegime.deductions.employeePF.toLocaleString('en-IN')}`);
console.log(`  Standard Deduction: ₹${oldRegime.exemptions.standardDeduction.toLocaleString('en-IN')}`);
console.log(`  HRA Exemption: ₹${oldRegime.exemptions.hraExemption.toLocaleString('en-IN')} (Allowed if rent paid)`);
console.log(`  Taxable Income: ₹${oldRegime.results.taxableIncome.toLocaleString('en-IN')}`);
console.log(`  Income Tax: ₹${oldRegime.deductions.incomeTax.toLocaleString('en-IN')}`);
console.log(`  Cess (4%): ₹${oldRegime.deductions.cess.toLocaleString('en-IN')}`);
console.log(`  Professional Tax: ₹${oldRegime.deductions.professionalTax.toLocaleString('en-IN')}`);
console.log(`  Annual In-Hand: ₹${oldRegime.results.annualInHand.toLocaleString('en-IN')}`);
console.log(`  Monthly In-Hand: ₹${oldRegime.results.monthlyInHand.toLocaleString('en-IN')}`);

console.log('\n=== YOUR EXPECTED VALUES ===');
console.log('New Regime: Annual ₹8,39,203 | Monthly ₹69,934');
console.log('Old Regime: Annual ₹7,86,676 | Monthly ₹65,556');

console.log('\n=== MATCH CHECK ===');
console.log(`New Regime Annual: ${newRegime.results.annualInHand === 839203 ? '✓' : '✗'} (Expected: ₹8,39,203, Got: ₹${newRegime.results.annualInHand.toLocaleString('en-IN')})`);
console.log(`New Regime Monthly: ${newRegime.results.monthlyInHand === 69934 ? '✓' : '✗'} (Expected: ₹69,934, Got: ₹${newRegime.results.monthlyInHand.toLocaleString('en-IN')})`);
console.log(`Old Regime Annual: ${oldRegime.results.annualInHand === 786676 ? '✓' : '✗'} (Expected: ₹7,86,676, Got: ₹${oldRegime.results.annualInHand.toLocaleString('en-IN')})`);
console.log(`Old Regime Monthly: ${oldRegime.results.monthlyInHand === 65556 ? '✓' : '✗'} (Expected: ₹65,556, Got: ₹${oldRegime.results.monthlyInHand.toLocaleString('en-IN')})`);

console.log('\n=== REGIME COMPARISON ===');
const difference = newRegime.results.annualInHand - oldRegime.results.annualInHand;
console.log(`Benefit of New Regime: ₹${difference.toLocaleString('en-IN')}/year or ₹${Math.round(difference/12).toLocaleString('en-IN')}/month`);
console.log(`Recommendation: ${difference > 0 ? 'NEW REGIME' : 'OLD REGIME'}`);
