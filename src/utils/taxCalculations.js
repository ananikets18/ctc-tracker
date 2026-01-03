/**
 * CTC Tracker - Tax Calculation Utilities
 * Handles Indian Tax calculations, PF, HRA, Professional Tax
 */

// Tax Slabs for FY 2024-25
export const TAX_SLABS_OLD_2024 = [
  { min: 0, max: 250000, rate: 0 },
  { min: 250000, max: 500000, rate: 5 },
  { min: 500000, max: 1000000, rate: 20 },
  { min: 1000000, max: Infinity, rate: 30 }
];

export const TAX_SLABS_NEW_2024 = [
  { min: 0, max: 300000, rate: 0 },
  { min: 300000, max: 700000, rate: 5 },
  { min: 700000, max: 1000000, rate: 10 },
  { min: 1000000, max: 1200000, rate: 15 },
  { min: 1200000, max: 1500000, rate: 20 },
  { min: 1500000, max: Infinity, rate: 30 }
];

// Tax Slabs for FY 2025-26 (Finance Act 2025 - REVISED)
export const TAX_SLABS_OLD_2025 = [
  { min: 0, max: 250000, rate: 0 },
  { min: 250000, max: 500000, rate: 5 },
  { min: 500000, max: 1000000, rate: 20 },
  { min: 1000000, max: Infinity, rate: 30 }
];

export const TAX_SLABS_NEW_2025 = [
  { min: 0, max: 400000, rate: 0 },        // Increased from 3L to 4L
  { min: 400000, max: 800000, rate: 5 },   // 4-8L bracket
  { min: 800000, max: 1200000, rate: 10 }, // 8-12L bracket
  { min: 1200000, max: 1600000, rate: 15 }, // 12-16L bracket
  { min: 1600000, max: 2000000, rate: 20 }, // 16-20L bracket
  { min: 2000000, max: 2400000, rate: 25 }, // NEW 20-24L bracket
  { min: 2400000, max: Infinity, rate: 30 }
];

// Tax Slabs for FY 2026-27 (same as 2025-26 until Budget 2026)
export const TAX_SLABS_OLD_2026 = [
  { min: 0, max: 250000, rate: 0 },
  { min: 250000, max: 500000, rate: 5 },
  { min: 500000, max: 1000000, rate: 20 },
  { min: 1000000, max: Infinity, rate: 30 }
];

export const TAX_SLABS_NEW_2026 = [
  { min: 0, max: 400000, rate: 0 },
  { min: 400000, max: 800000, rate: 5 },
  { min: 800000, max: 1200000, rate: 10 },
  { min: 1200000, max: 1600000, rate: 15 },
  { min: 1600000, max: 2000000, rate: 20 },
  { min: 2000000, max: 2400000, rate: 25 },
  { min: 2400000, max: Infinity, rate: 30 }
];

// Professional Tax by State (Annual)
export const PROFESSIONAL_TAX = {
  'Maharashtra': 2400,
  'Karnataka': 2400,
  'Tamil Nadu': 2400,
  'West Bengal': 2400,
  'Andhra Pradesh': 2400,
  'Telangana': 2400,
  'Gujarat': 2400,
  'Madhya Pradesh': 2400,
  'Delhi': 0,
  'Punjab': 0,
  'Haryana': 0,
  'Other': 0
};

// Financial Year Constants (Official Income Tax Dept data)
export const FINANCIAL_YEAR_CONFIG = {
  '2024-25': {
    standardDeduction: 50000,
    rebateLimit: 700000, // Old: ₹5L, New: ₹7L
    maxRebateAmount: 25000 // New regime max rebate
  },
  '2025-26': {
    standardDeduction: 75000,
    rebateLimit: 700000, // Rebate if income ≤ ₹7L (NOT ₹12L!)
    maxRebateAmount: 60000 // Increased from ₹25K
  },
  '2026-27': {
    standardDeduction: 75000, // Same as 2025-26 until Budget 2026
    rebateLimit: 700000,
    maxRebateAmount: 60000
  }
};

// Constants
export const PF_EMPLOYEE_RATE = 0.12;
export const PF_EMPLOYER_RATE = 0.12;
export const PF_CEILING_MONTHLY = 15000; // Monthly ceiling for PF calculation
export const PF_CEILING_ANNUAL = 180000; // Annual ceiling
export const GRATUITY_RATE = 0.0481; // ~4.81% of CTC
export const CESS_RATE = 0.04; // 4% Health and Education Cess

// Senior Citizen Age
export const SENIOR_CITIZEN_AGE = 60;
export const SUPER_SENIOR_CITIZEN_AGE = 80;

/**
 * Get tax slabs based on regime and financial year
 */
export const getTaxSlabs = (isOldRegime, financialYear = '2025-26') => {
  const yearMap = {
    '2024-25': '2024',
    '2025-26': '2025',
    '2026-27': '2026'
  };
  
  const year = yearMap[financialYear] || '2025';
  
  const slabsMap = {
    '2024': { old: TAX_SLABS_OLD_2024, new: TAX_SLABS_NEW_2024 },
    '2025': { old: TAX_SLABS_OLD_2025, new: TAX_SLABS_NEW_2025 },
    '2026': { old: TAX_SLABS_OLD_2026, new: TAX_SLABS_NEW_2026 }
  };
  
  return isOldRegime ? slabsMap[year].old : slabsMap[year].new;
};

/**
 * Calculate monthly PF contribution
 */
export const calculatePF = (monthlyBasic) => {
  const pfBase = Math.min(monthlyBasic, PF_CEILING_MONTHLY);
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
export const calculateIncomeTax = (taxableIncome, isOldRegime = true, financialYear = '2025-26') => {
  const slabs = getTaxSlabs(isOldRegime, financialYear);
  let tax = 0;
  
  // Calculate base tax
  for (const slab of slabs) {
    if (taxableIncome > slab.min) {
      const taxableAmount = Math.min(taxableIncome, slab.max) - slab.min;
      tax += (taxableAmount * slab.rate) / 100;
    }
  }
  
  // Apply rebate under Section 87A (if applicable)
  const fyConfig = FINANCIAL_YEAR_CONFIG[financialYear];
  if (taxableIncome <= fyConfig.rebateLimit) {
    tax = Math.max(0, tax - Math.min(tax, fyConfig.maxRebateAmount));
  }
  
  return Math.round(tax);
};

/**
 * Main CTC breakdown calculator with enhanced parameters
 */
export const calculateCTCBreakdown = (ctc, options = {}) => {
  const {
    isOldRegime = true,
    state = 'Other',
    rentPaid = 0,
    isMetro = false,
    financialYear = '2025-26',
    customComponents = null,
    performanceBonus = 0,
    medicalAllowance = 0,
    conveyanceAllowance = 0,
    daAllowance = 0,
    ltaAllowance = 0,
    employerNPS = 0,
    healthInsurance = 0
  } = options;
  
  // Get FY-specific configurations
  const fyConfig = FINANCIAL_YEAR_CONFIG[financialYear];
  
  // Default salary components (if not provided)
  let basic, hra, specialAllowance, otherAllowances;
  
  if (customComponents) {
    ({ basic, hra, specialAllowance, otherAllowances } = customComponents);
  } else {
    // Industry Standard breakdown (48% basic, 40% of basic as HRA)
    basic = Math.round(ctc * 0.48);
    hra = Math.round(basic * 0.40);
    
    // Employer Contributions (not part of gross salary but part of CTC)
    const employerPFContribution = Math.round(basic * PF_EMPLOYER_RATE);
    const gratuityContribution = Math.round(basic * GRATUITY_RATE);
    
    // Special Allowance = CTC - Basic - HRA - Employer Contributions - Other components
    const remaining = ctc - basic - hra - employerPFContribution - gratuityContribution
                      - performanceBonus - medicalAllowance - conveyanceAllowance 
                      - daAllowance - ltaAllowance - employerNPS - healthInsurance;
    
    specialAllowance = Math.max(0, remaining);
    otherAllowances = 0; // Consolidated into special allowance
  }
  
  const monthlyBasic = Math.round(basic / 12);
  const monthlyHRA = Math.round(hra / 12);
  
  // PF Calculation (on full basic as per industry standard for CTC calculations)
  // Note: Statutory limit is ₹15K/month but for CTC breakdown, calculated on full basic
  const annualPF = Math.round(basic * PF_EMPLOYEE_RATE);
  
  // Employer Contributions (not in gross salary but part of CTC)
  const employerPF = Math.round(basic * PF_EMPLOYER_RATE);
  const gratuity = Math.round(basic * GRATUITY_RATE);
  
  // Professional Tax (only if salary > 5L)
  const annualProfessionalTax = ctc > 500000 ? (PROFESSIONAL_TAX[state] || 0) : 0;
  
  // Gross Salary (actual cash in hand = Basic + HRA + Special Allowance + Other cash components)
  const grossSalary = basic + hra + specialAllowance + performanceBonus + medicalAllowance 
                      + conveyanceAllowance + daAllowance + ltaAllowance;
  
  // HRA Exemption (monthly calculation)
  const monthlyRentPaid = rentPaid;
  const hraExemption = calculateHRAExemption(monthlyBasic, monthlyHRA, monthlyRentPaid, isMetro);
  const annualHRAExemption = hraExemption * 12;
  
  // Taxable Income Calculation
  let taxableIncome = grossSalary - annualPF - fyConfig.standardDeduction;
  
  // Old Regime: Allow HRA exemption and other deductions
  if (isOldRegime) {
    taxableIncome -= annualHRAExemption;
  }
  
  // Income Tax (with rebate applied inside)
  const incomeTax = calculateIncomeTax(Math.max(0, taxableIncome), isOldRegime, financialYear);
  
  // Cess (4% on income tax)
  const cess = Math.round(incomeTax * CESS_RATE);
  const totalTax = incomeTax + cess;
  
  // In-Hand Salary Calculation
  const annualInHand = grossSalary - annualPF - annualProfessionalTax - totalTax;
  const monthlyInHand = Math.round(annualInHand / 12);
  const dailyInHand = Math.round(annualInHand / 365);
  
  // Calculate comparison with other regime
  const otherRegimeTax = calculateIncomeTax(
    Math.max(0, isOldRegime 
      ? grossSalary - annualPF - fyConfig.standardDeduction  // New regime (no HRA exemption)
      : grossSalary - annualPF - fyConfig.standardDeduction - annualHRAExemption), // Old regime
    !isOldRegime,
    financialYear
  );
  const otherRegimeCess = Math.round(otherRegimeTax * CESS_RATE);
  const otherRegimeTotalTax = otherRegimeTax + otherRegimeCess;
  const otherRegimeInHand = grossSalary - annualPF - annualProfessionalTax - otherRegimeTotalTax;
  
  return {
    ctc,
    financialYear,
    components: {
      basic,
      hra,
      specialAllowance,
      otherAllowances,
      performanceBonus,
      medicalAllowance,
      conveyanceAllowance,
      daAllowance,
      ltaAllowance,
      employerPF,
      employerNPS,
      gratuity,
      healthInsurance
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
      standardDeduction: fyConfig.standardDeduction
    },
    results: {
      grossSalary,
      taxableIncome,
      annualInHand,
      monthlyInHand,
      dailyInHand
    },
    comparison: {
      currentRegime: isOldRegime ? 'Old' : 'New',
      currentRegimeInHand: annualInHand,
      otherRegime: isOldRegime ? 'New' : 'Old',
      otherRegimeInHand,
      difference: annualInHand - otherRegimeInHand,
      recommendation: annualInHand > otherRegimeInHand ? (isOldRegime ? 'Old' : 'New') : (isOldRegime ? 'New' : 'Old')
    }
  };
};
