import React from 'react';
import numeral from 'numeral';

const ResultsPanel = ({ results }) => {
  const formatCurrency = (amount) => {
    return numeral(amount).format('0,0');
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Salary Breakdown</h2>
      
      {/* In-Hand Salary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {/* Annual */}
        <div className="bg-linear-to-br from-green-500 to-green-600 rounded-lg p-4 text-white">
          <p className="text-sm opacity-90 mb-1">Annual In-Hand</p>
          <p className="text-3xl font-bold">₹{formatCurrency(results.results.annualInHand)}</p>
        </div>
        
        {/* Monthly */}
        <div className="bg-linear-to-br from-blue-500 to-blue-600 rounded-lg p-4 text-white">
          <p className="text-sm opacity-90 mb-1">Monthly In-Hand</p>
          <p className="text-3xl font-bold">₹{formatCurrency(results.results.monthlyInHand)}</p>
        </div>
        
        {/* Daily */}
        <div className="bg-linear-to-br from-purple-500 to-purple-600 rounded-lg p-4 text-white">
          <p className="text-sm opacity-90 mb-1">Daily In-Hand</p>
          <p className="text-3xl font-bold">₹{formatCurrency(results.results.dailyInHand)}</p>
        </div>
      </div>

      {/* Salary Components */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-700 mb-3">Salary Components</h3>
        <div className="space-y-2">
          <div className="flex justify-between py-2 border-b">
            <span className="text-gray-600">Basic Salary</span>
            <span className="font-semibold">₹{formatCurrency(results.components.basic)}</span>
          </div>
          <div className="flex justify-between py-2 border-b">
            <span className="text-gray-600">HRA</span>
            <span className="font-semibold">₹{formatCurrency(results.components.hra)}</span>
          </div>
          <div className="flex justify-between py-2 border-b">
            <span className="text-gray-600">Special Allowance</span>
            <span className="font-semibold">₹{formatCurrency(results.components.specialAllowance)}</span>
          </div>
          <div className="flex justify-between py-2 border-b">
            <span className="text-gray-600">Other Allowances</span>
            <span className="font-semibold">₹{formatCurrency(results.components.otherAllowances)}</span>
          </div>
          <div className="flex justify-between py-2 border-b">
            <span className="text-gray-600">Employer PF</span>
            <span className="font-semibold text-green-600">₹{formatCurrency(results.components.employerPF)}</span>
          </div>
        </div>
      </div>

      {/* Deductions */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-700 mb-3">Deductions</h3>
        <div className="space-y-2">
          <div className="flex justify-between py-2 border-b">
            <span className="text-gray-600">Employee PF</span>
            <span className="font-semibold text-red-600">-₹{formatCurrency(results.deductions.employeePF)}</span>
          </div>
          <div className="flex justify-between py-2 border-b">
            <span className="text-gray-600">Professional Tax</span>
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
      <div className="bg-gray-50 rounded-lg p-4">
        <div className="flex justify-between py-2 text-lg font-bold">
          <span>Total CTC</span>
          <span className="text-blue-600">₹{formatCurrency(results.ctc)}</span>
        </div>
        <div className="flex justify-between py-2 text-lg font-bold">
          <span>Total Deductions</span>
          <span className="text-red-600">
            -₹{formatCurrency(results.deductions.employeePF + results.deductions.professionalTax + results.deductions.totalTax)}
          </span>
        </div>
        <div className="flex justify-between py-2 text-xl font-bold border-t-2 border-gray-300 mt-2 pt-2">
          <span>Net In-Hand (Annual)</span>
          <span className="text-green-600">₹{formatCurrency(results.results.annualInHand)}</span>
        </div>
      </div>
    </div>
  );
};

export default ResultsPanel;
