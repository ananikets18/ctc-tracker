import React from 'react';
import Tooltip from './Tooltip';

const InputPanel = ({ register, values, setValue, onCalculate, isCalculating, error }) => {
  const states = [
    'Maharashtra',
    'Karnataka',
    'Tamil Nadu',
    'West Bengal',
    'Andhra Pradesh',
    'Telangana',
    'Gujarat',
    'Other'
  ];

  return (
    <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6">
      <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6">Input Details</h2>
      
      {/* CTC Amount */}
      <div className="mb-4 sm:mb-6">
        <label htmlFor="ctc-input" className="flex items-center text-sm font-medium text-gray-700 mb-2">
          <span className="text-xl sm:text-2xl mr-2" aria-hidden="true">₹</span>
          CTC Amount (Annual)
          <Tooltip content="Cost to Company (CTC) is your total annual salary package including all benefits, allowances, and employer contributions like PF and gratuity." position="right">
            <svg className="w-4 h-4 ml-2 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
            </svg>
          </Tooltip>
        </label>
        <input
          id="ctc-input"
          type="number"
          min="100000"
          max="100000000"
          step="10000"
          {...register('ctc')}
          className="w-full px-3 sm:px-4 py-3 sm:py-2 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Enter CTC (e.g., 1000000)"
          aria-label="Annual CTC Amount in Rupees"
          aria-describedby={error ? "ctc-error" : undefined}
        />
      </div>

      {/* Financial Year */}
      <div className="mb-4 sm:mb-6">
        <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
          <span className="text-xl sm:text-2xl mr-2">📅</span>
          Financial Year
          <Tooltip content="Indian Financial Year runs from April 1 to March 31. Tax slabs and deductions vary by FY. Select the year for which you want to calculate." position="right">
            <svg className="w-4 h-4 ml-2 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
            </svg>
          </Tooltip>
        </label>
        <select
          {...register('financialYear')}
          className="w-full px-3 sm:px-4 py-3 sm:py-2 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="2026-27">FY 2026-27</option>
          <option value="2025-26">FY 2025-26</option>
          <option value="2024-25">FY 2024-25</option>
        </select>
      </div>

      {/* Tax Regime Toggle */}
      <div className="mb-4 sm:mb-6">
        <label className="flex items-center text-sm font-medium text-gray-700 mb-3">
          <span className="text-xl sm:text-2xl mr-2">💰</span>
          Tax Regime
          <Tooltip content="Old Regime: Higher tax rates but allows deductions (80C, HRA, etc.). New Regime: Lower tax rates but no deductions. We'll show you which saves more money after calculation." position="right">
            <svg className="w-4 h-4 ml-2 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
            </svg>
          </Tooltip>
        </label>
        <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
          <label className="flex items-center cursor-pointer">
            <input
              type="radio"
              name="taxRegime"
              value="old"
              checked={values.isOldRegime === true}
              onChange={() => setValue('isOldRegime', true)}
              className="mr-2"
            />
            <span className="text-sm">Old Regime</span>
          </label>
          <label className="flex items-center cursor-pointer">
            <input
              type="radio"
              name="taxRegime"
              value="new"
              checked={values.isOldRegime === false}
              onChange={() => setValue('isOldRegime', false)}
              className="mr-2"
            />
            <span className="text-sm">New Regime</span>
          </label>
        </div>
      </div>

      {/* State Selection */}
      <div className="mb-4 sm:mb-6">
        <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
          <span className="text-xl sm:text-2xl mr-2">📍</span>
          State
          <Tooltip content="Professional Tax varies by state. Most states charge ₹2,400/year, while some states like Delhi and Punjab have no professional tax." position="right">
            <svg className="w-4 h-4 ml-2 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
            </svg>
          </Tooltip>
        </label>
        <select
          {...register('state')}
          className="w-full px-3 sm:px-4 py-3 sm:py-2 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          {states.map(state => (
            <option key={state} value={state}>{state}</option>
          ))}
        </select>
      </div>

      {/* Metro City Toggle */}
      <div className="mb-4 sm:mb-6">
        <label className="flex items-center cursor-pointer">
          <input
            type="checkbox"
            {...register('isMetro')}
            className="mr-3 h-5 w-5 text-blue-600"
          />
          <span className="text-sm font-medium text-gray-700">
            Metro City (for HRA calculation)
          </span>
          <Tooltip content="Metro cities (Mumbai, Delhi, Kolkata, Chennai) have 50% HRA exemption vs 40% for non-metro cities. This affects your tax calculation in Old Regime." position="right">
            <svg className="w-4 h-4 ml-2 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
            </svg>
          </Tooltip>
        </label>
      </div>

      {/* Rent Paid (Optional) */}
      {values.isOldRegime && (
        <div className="mb-4 sm:mb-6 animate-fade-in">
          <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
            Monthly Rent Paid (Optional)
            <Tooltip content="Enter your monthly rent to calculate HRA (House Rent Allowance) exemption. This reduces your taxable income in Old Regime only." position="right">
              <svg className="w-4 h-4 ml-2 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
              </svg>
            </Tooltip>
          </label>
          <input
            type="number"
            {...register('rentPaid')}
            className="w-full px-3 sm:px-4 py-3 sm:py-2 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter monthly rent"
          />
          <p className="text-xs text-gray-500 mt-1">For HRA exemption calculation</p>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div id="ctc-error" role="alert" className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
          <div className="flex items-start">
            <svg className="w-5 h-5 text-red-500 mr-2 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
            <p className="text-sm text-red-700">{error}</p>
          </div>
        </div>
      )}

      {/* Calculate Button */}
      <button
        onClick={onCalculate}
        disabled={isCalculating}
        className="w-full bg-blue-600 text-white py-3 sm:py-3 rounded-lg font-semibold hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed transition-colors text-base sm:text-base touch-manipulation flex items-center justify-center"
        aria-label={isCalculating ? 'Calculating salary breakdown' : 'Calculate salary breakdown'}
      >
        {isCalculating ? (
          <>
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Calculating...
          </>
        ) : (
          'Calculate'
        )}
      </button>
    </div>
  );
};

export default InputPanel;
