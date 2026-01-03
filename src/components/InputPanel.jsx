import React from 'react';

const InputPanel = ({ register, values, setValue, onCalculate }) => {
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
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Input Details</h2>
      
      {/* CTC Amount */}
      <div className="mb-6">
        <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
          <span className="text-2xl mr-2">₹</span>
          CTC Amount (Annual)
        </label>
        <input
          type="number"
          {...register('ctc')}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Enter CTC"
        />
      </div>

      {/* Financial Year */}
      <div className="mb-6">
        <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
          <span className="text-2xl mr-2">📅</span>
          Financial Year
        </label>
        <select
          {...register('financialYear')}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="2026-27">FY 2026-27</option>
          <option value="2025-26">FY 2025-26</option>
          <option value="2024-25">FY 2024-25</option>
        </select>
      </div>

      {/* Tax Regime Toggle */}
      <div className="mb-6">
        <label className="flex items-center text-sm font-medium text-gray-700 mb-3">
          <span className="text-2xl mr-2">💰</span>
          Tax Regime
        </label>
        <div className="flex items-center space-x-4">
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
      <div className="mb-6">
        <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
          <span className="text-2xl mr-2">📍</span>
          State
        </label>
        <select
          {...register('state')}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          {states.map(state => (
            <option key={state} value={state}>{state}</option>
          ))}
        </select>
      </div>

      {/* Metro City Toggle */}
      <div className="mb-6">
        <label className="flex items-center cursor-pointer">
          <input
            type="checkbox"
            {...register('isMetro')}
            className="mr-3 h-5 w-5 text-blue-600"
          />
          <span className="text-sm font-medium text-gray-700">
            Metro City (for HRA calculation)
          </span>
        </label>
      </div>

      {/* Rent Paid (Optional) */}
      {values.isOldRegime && (
        <div className="mb-6">
          <label className="text-sm font-medium text-gray-700 mb-2 block">
            Monthly Rent Paid (Optional)
          </label>
          <input
            type="number"
            {...register('rentPaid')}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter monthly rent"
          />
          <p className="text-xs text-gray-500 mt-1">For HRA exemption calculation</p>
        </div>
      )}

      {/* Calculate Button */}
      <button
        onClick={onCalculate}
        className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
      >
        Calculate
      </button>
    </div>
  );
};

export default InputPanel;
