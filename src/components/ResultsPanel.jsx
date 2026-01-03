import React from 'react';
import numeral from 'numeral';
import Tooltip from './Tooltip';

const ResultsPanel = ({ results }) => {
  const formatCurrency = (amount) => {
    return numeral(amount).format('0,0');
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 animate-fade-in-up">
      <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6">Salary Breakdown</h2>
      
      {/* Regime Comparison Banner */}
      {results.comparison && results.comparison.difference !== 0 && (
        <div className={`mb-4 p-3 rounded-lg border-2 ${
          results.comparison.difference > 0 ? 'bg-green-50 border-green-200' : 'bg-blue-50 border-blue-200'
        }`}>
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <p className="text-sm font-semibold text-gray-700 mb-1">
                {results.comparison.difference > 0 ? '✅ Best Choice' : '💡 Alternative Available'}
              </p>
              <p className="text-xs text-gray-600">
                {results.comparison.difference > 0 
                  ? `You save ₹${formatCurrency(Math.abs(results.comparison.difference))} with ${results.comparison.currentRegime} Regime`
                  : `${results.comparison.otherRegime} Regime saves ₹${formatCurrency(Math.abs(results.comparison.difference))} more`
                }
              </p>
            </div>
            <div className="text-right">
              <p className="text-xs text-gray-500">Other Regime</p>
              <p className="text-sm font-bold text-gray-700">₹{formatCurrency(results.comparison.otherRegimeInHand)}</p>
            </div>
          </div>
        </div>
      )}

      {/* In-Hand Salary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 mb-6 sm:mb-8 stagger-children">
        {/* Annual */}
        <div className="bg-linear-to-br from-green-500 to-green-600 rounded-lg p-3 sm:p-4 text-white">
          <p className="text-xs sm:text-sm opacity-90 mb-1">Annual In-Hand</p>
          <p className="text-xl sm:text-2xl md:text-3xl font-bold">₹{formatCurrency(results.results.annualInHand)}</p>
        </div>
        
        {/* Monthly */}
        <div className="bg-linear-to-br from-blue-500 to-blue-600 rounded-lg p-3 sm:p-4 text-white">
          <p className="text-xs sm:text-sm opacity-90 mb-1">Monthly In-Hand</p>
          <p className="text-xl sm:text-2xl md:text-3xl font-bold">₹{formatCurrency(results.results.monthlyInHand)}</p>
        </div>
        
        {/* Daily */}
        <div className="bg-linear-to-br from-purple-500 to-purple-600 rounded-lg p-3 sm:p-4 text-white sm:col-span-2 md:col-span-1">
          <p className="text-xs sm:text-sm opacity-90 mb-1">Daily In-Hand</p>
          <p className="text-xl sm:text-2xl md:text-3xl font-bold">₹{formatCurrency(results.results.dailyInHand)}</p>
        </div>
      </div>

      {/* Salary Components */}
      <div className="mb-4 sm:mb-6">
        <h3 className="text-base sm:text-lg font-semibold text-gray-700 mb-2 sm:mb-3">Salary Components</h3>
        <div className="space-y-2">
          <div className="flex justify-between py-2 border-b">
            <span className="text-gray-600 flex items-center">
              Basic Salary
              <Tooltip content="Typically 40-50% of CTC. Used as base for calculating PF, HRA, and gratuity." position="top">
                <svg className="w-3.5 h-3.5 ml-1.5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                </svg>
              </Tooltip>
            </span>
            <span className="font-semibold">₹{formatCurrency(results.components.basic)}</span>
          </div>
          <div className="flex justify-between py-2 border-b">
            <span className="text-gray-600 flex items-center">
              HRA
              <Tooltip content="House Rent Allowance. Tax exemption available in Old Regime if you pay rent (minimum of actual HRA, 50%/40% of basic, or rent minus 10% of basic)." position="top">
                <svg className="w-3.5 h-3.5 ml-1.5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                </svg>
              </Tooltip>
            </span>
            <span className="font-semibold">₹{formatCurrency(results.components.hra)}</span>
          </div>
          <div className="flex justify-between py-2 border-b">
            <span className="text-gray-600 flex items-center">
              Special Allowance
              <Tooltip content="Remainder of salary after basic, HRA, and statutory contributions. Fully taxable in both regimes." position="top">
                <svg className="w-3.5 h-3.5 ml-1.5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                </svg>
              </Tooltip>
            </span>
            <span className="font-semibold">₹{formatCurrency(results.components.specialAllowance)}</span>
          </div>
          <div className="flex justify-between py-2 border-b">
            <span className="text-gray-600">Other Allowances</span>
            <span className="font-semibold">₹{formatCurrency(results.components.otherAllowances)}</span>
          </div>
          <div className="flex justify-between py-2 border-b">
            <span className="text-gray-600 flex items-center">
              Employer PF
              <Tooltip content="12% of basic salary contributed by employer to your Provident Fund. Not part of your in-hand salary but adds to retirement corpus." position="top">
                <svg className="w-3.5 h-3.5 ml-1.5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                </svg>
              </Tooltip>
            </span>
            <span className="font-semibold text-green-600">₹{formatCurrency(results.components.employerPF)}</span>
          </div>
        </div>
      </div>

      {/* Deductions */}
      <div className="mb-4 sm:mb-6">
        <h3 className="text-base sm:text-lg font-semibold text-gray-700 mb-2 sm:mb-3">Deductions</h3>
        <div className="space-y-2">
          <div className="flex justify-between py-2 border-b">
            <span className="text-gray-600 flex items-center">
              Employee PF
              <Tooltip content="12% of your basic salary deducted monthly for Provident Fund. Tax-free and earns ~8% annual interest." position="top">
                <svg className="w-3.5 h-3.5 ml-1.5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                </svg>
              </Tooltip>
            </span>
            <span className="font-semibold text-red-600">-₹{formatCurrency(results.deductions.employeePF)}</span>
          </div>
          <div className="flex justify-between py-2 border-b">
            <span className="text-gray-600 flex items-center">
              Professional Tax
              <Tooltip content="State-level tax on salaried professionals. Varies by state (₹0-2,400/year). Deducted monthly by employer." position="top">
                <svg className="w-3.5 h-3.5 ml-1.5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                </svg>
              </Tooltip>
            </span>
            <span className="font-semibold text-red-600">-₹{formatCurrency(results.deductions.professionalTax)}</span>
          </div>
          <div className="flex justify-between py-2 border-b">
            <span className="text-gray-600">Income Tax</span>
            <span className="font-semibold text-red-600">-₹{formatCurrency(results.deductions.incomeTax)}</span>
          </div>
          <div className="flex justify-between py-2 border-b">
            <span className="text-gray-600">Health & Education Cess</span>
            <span className="font-semibold text-red-600">-₹{formatCurrency(results.deductions.cess)}</span>
          </div>
        </div>
      </div>

      {/* Summary */}
      <div className="bg-gray-50 rounded-lg p-3 sm:p-4">
        <div className="flex justify-between py-2 text-sm sm:text-base md:text-lg font-bold">
          <span>Total CTC</span>
          <span className="text-blue-600">₹{formatCurrency(results.ctc)}</span>
        </div>
        <div className="flex justify-between py-2 text-sm sm:text-base md:text-lg font-bold">
          <span>Total Deductions</span>
          <span className="text-red-600">
            -₹{formatCurrency(results.deductions.employeePF + results.deductions.professionalTax + results.deductions.totalTax)}
          </span>
        </div>
        <div className="flex justify-between py-2 text-base sm:text-lg md:text-xl font-bold border-t-2 border-gray-300 mt-2 pt-2">
          <span>Net In-Hand (Annual)</span>
          <span className="text-green-600">₹{formatCurrency(results.results.annualInHand)}</span>
        </div>
      </div>
    </div>
  );
};

export default ResultsPanel;
