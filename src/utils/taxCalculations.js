/**
 * CTC Tracker - Tax Calculation Utilities
 * Handles Indian Tax calculations, PF, HRA, Professional Tax
 */

// Tax Slabs for FY 2025-26
export const TAX_SLABS_OLD = {
  2025: [
    { min: 0, max: 250000, rate: 0 },
    { min: 250000, max: 500000, rate: 5 },
    { min: 500000, max: 1000000, rate: 20 },
    { min: 1000000, max: Infinity, rate: 30 }
  ]
};

export const TAX_SLABS_NEW = {
  2025: [
    { min: 0, max: 300000, rate: 0 },
    { min: 300000, max: 700000, rate: 5 },
    { min: 700000, max: 1000000, rate: 10 },
    { min: 1000000, max: 1200000, rate: 15 },
    { min: 1200000, max: 1500000, rate: 20 },
    { min: 1500000, max: Infinity, rate: 30 }
  ]
};

// Professional Tax by State
export const PROFESSIONAL_TAX = {
  'Maharashtra': 2500,
  'Karnataka': 2400,
  'Tamil Nadu': 2400,
  'West Bengal': 2500,
  'Andhra Pradesh': 2400,
  'Telangana': 2400,
  'Gujarat': 2400,
  'Other': 0
};

// Constants
export const STANDARD_DEDUCTION = 50000;
export const PF_EMPLOYEE_RATE = 0.12;
export const PF_EMPLOYER_RATE = 0.12;
export const PF_CEILING = 15000; // Monthly ceiling for PF calculation
export const CESS_RATE = 0.04; // 4% Health and Education Cess

/**
 * Calculate monthly PF contribution
 */
export const calculatePF = (basicSalary) => {
  const pfBase = Math.min(basicSalary, PF_CEILING);
  return Math.round(pfBase * PF_EMPLOYEE_RATE);
};

/**
 * Calculate HRA exemption (minimum of three conditions)
 */
export const calculateHRAExemption = (basicSalary, hra, rentPaid, isMetro) => {
  if (rentPaid === 0) return 0;
  
  const metroPercentage = isMetro ? 0.5 : 0.4;
  
  const condition1 = hra;
  const condition2 = basicSalary * metroPercentage;
  const condition3 = rentPaid - (basicSalary * 0.1);
  
  return Math.max(0, Math.min(condition1, condition2, condition3));
};

/**
 * Calculate income tax based on regime and slabs
 */
export const calculateIncomeTax = (taxableIncome, isOldRegime = true) => {
  const slabs = isOldRegime ? TAX_SLABS_OLD[2025] : TAX_SLABS_NEW[2025];
  let tax = 0;
  
  for (const slab of slabs) {
    if (taxableIncome > slab.min) {
      const taxableAmount = Math.min(taxableIncome, slab.max) - slab.min;
      tax += (taxableAmount * slab.rate) / 100;
    }
  }
  
  return Math.round(tax);
};

/**
 * Main CTC breakdown calculator
 */
export const calculateCTCBreakdown = (ctc, options = {}) => {
  const {
    isOldRegime = true,
    state = 'Other',
    rentPaid = 0,
    isMetro = false,
    customComponents = null
  } = options;
  
  // Default salary components (if not provided)
  let basic, hra, specialAllowance, otherAllowances;
  
  if (customComponents) {
    ({ basic, hra, specialAllowance, otherAllowances } = customComponents);
  } else {
    // Standard breakdown
    basic = Math.round(ctc * 0.4);
    hra = Math.round(ctc * 0.2);
    specialAllowance = Math.round(ctc * 0.25);
    otherAllowances = Math.round(ctc * 0.03);
  }
  
  const monthlyBasic = Math.round(basic / 12);
  const monthlyHRA = Math.round(hra / 12);
  
  // PF Calculation
  const monthlyPF = calculatePF(monthlyBasic);
  const annualPF = monthlyPF * 12;
  
  // Professional Tax
  const annualProfessionalTax = PROFESSIONAL_TAX[state] || 0;
  
  // Gross Salary
  const grossSalary = ctc - (basic * PF_EMPLOYER_RATE); // Employer PF contribution
  
  // HRA Exemption
  const hraExemption = calculateHRAExemption(monthlyBasic, monthlyHRA, rentPaid, isMetro);
  const annualHRAExemption = hraExemption * 12;
  
  // Taxable Income
  let taxableIncome = grossSalary - annualPF - STANDARD_DEDUCTION;
  
  if (isOldRegime) {
    taxableIncome -= annualHRAExemption;
  }
  
  // Income Tax
  const incomeTax = calculateIncomeTax(Math.max(0, taxableIncome), isOldRegime);
  
  // Cess
  const cess = Math.round(incomeTax * CESS_RATE);
  const totalTax = incomeTax + cess;
  
  // In-Hand Salary
  const annualInHand = grossSalary - annualPF - annualProfessionalTax - totalTax;
  const monthlyInHand = Math.round(annualInHand / 12);
  const dailyInHand = Math.round(annualInHand / 365);
  
  return {
    ctc,
    components: {
      basic,
      hra,
      specialAllowance,
      otherAllowances,
      employerPF: Math.round(basic * PF_EMPLOYER_RATE)
    },
    deductions: {
      employeePF: annualPF,
      professionalTax: annualProfessionalTax,
      incomeTax,
      cess,
      totalTax
    },
    exemptions: {
      hraExemption: annualHRAExemption,
      standardDeduction: STANDARD_DEDUCTION
    },
    results: {
      grossSalary,
      taxableIncome,
      annualInHand,
      monthlyInHand,
      dailyInHand
    }
  };
};
